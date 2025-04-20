-- insert data in analytics
INSERT INTO ANALYTICS (Pharmacy_Name, Update_Date)
VALUES ('PharmaPlus', CURDATE());

-- insert expired batches into appropriate table
INSERT INTO ANALYTICS_EXPIRED_BATCHES (Pharmacy_Name, A_Expired_Batches)
SELECT b.Pharmacy_Name, b.Batch_Number 
FROM BATCH b 
WHERE b.Expiry_Date < CURDATE()
  AND NOT EXISTS (
    SELECT 1 FROM ANALYTICS_EXPIRED_BATCHES aeb
    WHERE aeb.Pharmacy_Name = b.Pharmacy_Name AND aeb.A_Expired_Batches = b.Batch_Number
  );

-- insert upcoming expiry dates (with an expiry date in 30 days or less) into appropriate table
INSERT INTO ANALYTICS_UPCOMING_EXPIRING_BATCHES (Pharmacy_Name, A_Upcoming_expiring_Batches)
SELECT b.Pharmacy_Name, b.Batch_Number
FROM BATCH b
WHERE b.Expiry_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
  AND NOT EXISTS (
    SELECT 1 FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES aueb
    WHERE aueb.Pharmacy_Name = b.Pharmacy_Name AND aueb.A_Upcoming_expiring_Batches = b.Batch_Number
  );

-- insert newly added batches (within the past 7 days) into appropriate table
INSERT INTO ANALYTICS_NEWLY_ADDED_BATCHES (Pharmacy_Name, A_Newly_Added_Batches)
SELECT b.Pharmacy_Name, b.Batch_Number
FROM BATCH b
WHERE b.Date_Added BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
    AND NOT EXISTS (
        SELECT 1 FROM ANALYTICS_NEWLY_ADDED_BATCHES anab
        WHERE anab.Pharmacy_Name = b.Pharmacy_Name AND anab.A_Newly_Added_Batches = b.Batch_Number
    );