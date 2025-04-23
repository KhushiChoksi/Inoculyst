-- initial returns
INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A001BA002', 'A001', 'Uno Distributions', 'BA002');

INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A001BA003', 'A001', 'Uno Distributions', 'BA003');

INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
VALUES ('A002BA004', 'A002', 'We Sell Vaccines', 'BA004');


-- delete returned batches from batch table (due to cascade property, the batch should get deleted from other child tables)
DELETE FROM BATCH
WHERE Batch_Number IN (
  SELECT Batch_Number
  FROM RETURNED_BATCHES
);
