-- initial returns
INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A001BA002', 'A001', 'Uno Distributions', 'BA002');

INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A001BA003', 'A001', 'Uno Distributions', 'BA003');

INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A002BA004', 'A002', 'We Sell Vaccines', 'BA004');


-- delete returned batches from batch table
DELETE FROM BATCH
WHERE Batch_Number IN (
  SELECT Batch_Number
  FROM RETURNED_BATCHES
);


-- delete batches from analytics tables
DELETE FROM ANALYTICS_EXPIRED_BATCHES
WHERE A_Expired_Batches NOT IN (SELECT Batch_Number FROM BATCH);

DELETE FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES
WHERE A_Upcoming_expiring_Batches NOT IN (SELECT Batch_Number FROM BATCH);

DELETE FROM ANALYTICS_NEWLY_ADDED_BATCHES
WHERE A_Newly_Added_Batches NOT IN (SELECT Batch_Number FROM BATCH);
