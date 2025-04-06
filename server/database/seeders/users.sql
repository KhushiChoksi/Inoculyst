
-- Owner: Alice Jones
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A001', 'Alice', 'Jones', 'alicejones@inoculyst.com', '1234567890');

INSERT INTO ACCOUNT (ID, Account_type, Username)
VALUES ('A001', 'owner', 'alicejohns');

INSERT INTO OWNER (Owner_ID, ID)
VALUES ('A001', 'A001');

-- Pharmacist: Bob Smith
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A002', 'Bob', 'Smith', 'bobsmith@inoculyst.com', '3124445555');

INSERT INTO ACCOUNT (ID, Account_type, Username)
VALUES ('A002', 'pharmacist', 'bobsmith');

INSERT INTO PHARMACIST (Pharmacist_ID, Specialty)
VALUES ('A002', 'Diabetes');

-- Technician: Evan Johnson
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E001', 'Evan', 'Johnson', 'evanjohnson@inoculyst.com', '2345678901');

INSERT INTO ACCOUNT (ID, Account_type, Username)
VALUES ('E001', 'technician', 'evanjohnson');

INSERT INTO TECHNICIAN (Technician_ID, Certification_number)
VALUES ('E001', 'CERT123456');

-- Assistant: Julie Red
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E002', 'Julie', 'Red', 'juliered@inoculyst.com', '1234443333');

INSERT INTO ACCOUNT (ID, Account_type, Username)
VALUES ('E002', 'assistant', 'juliered');

INSERT INTO ASSISTANT (Assistant_ID)
VALUES ('E002');