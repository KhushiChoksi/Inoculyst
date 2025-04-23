-- Owner: Alice Jones
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A001', 'Alice', 'Jones', 'alicejones@inoculyst.com', '1234567890');

INSERT INTO OWNER (Owner_ID)
VALUES ('A001');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password, Owner_ID)
VALUES ('A001', 'owner', 'alicejones', 'pass1234', 'A001');

-- Pharmacist: Bob Smith
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A002', 'Bob', 'Smith', 'bobsmith@inoculyst.com', '3124445555');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password, Owner_ID)
VALUES ('A002', 'pharmacist', 'bobsmith', 'bob123', 'A001');

INSERT INTO PHARMACIST (Pharmacist_ID, Specialty)
VALUES ('A002', 'Diabetes');

-- Technician: Evan Peters
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E001', 'Evan', 'Peters', 'evanpeters@inoculyst.com', '2345678901');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password, Owner_ID)
VALUES ('E001', 'technician', 'evanpeters', 'canada1234', 'A001');

INSERT INTO TECHNICIAN (Technician_ID, Certification_number)
VALUES ('E001', 'CERT123456');

-- Assistant1: Julie Red
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E002', 'Julie', 'Red', 'juliered@inoculyst.com', '1234443333');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password, Owner_ID)
VALUES ('E002', 'assistant', 'juliered', 'barbie123', 'A001');

INSERT INTO ASSISTANT (Assistant_ID)
VALUES ('E002');

-- Assistant2: Jerry Wilson
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E003', 'Jerry', 'Wilson', 'jerrywilson@inoculyst.com', '1235558888');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password, Owner_ID)
VALUES ('E003', 'assistant', 'jerrywilson', 'tennis10', 'A001');

INSERT INTO ASSISTANT (Assistant_ID)
VALUES ('E003');