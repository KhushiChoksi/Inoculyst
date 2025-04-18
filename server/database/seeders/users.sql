
-- Owner: Alice Jones
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A001', 'Alice', 'Jones', 'alicejones@inoculyst.com', '1234567890');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password)
VALUES ('A001', 'owner', 'alicejohns', 'pass1234');

INSERT INTO OWNER (Owner_ID, ID)
VALUES ('A001', NULL);              -- null for ID, as we do not know whose account they are configuring

-- Pharmacist: Bob Smith
INSERT INTO ADMIN (ID, First_name, Last_name, Email, Phone_number)
VALUES ('A002', 'Bob', 'Smith', 'bobsmith@inoculyst.com', '3124445555');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password)
VALUES ('A002', 'pharmacist', 'bobsmith', 'bob123');

INSERT INTO PHARMACIST (Pharmacist_ID, Specialty)
VALUES ('A002', 'Diabetes');

-- Technician: Evan Peters
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E001', 'Evan', 'Peters', 'evanpeters@inoculyst.com', '2345678901');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password)
VALUES ('E001', 'technician', 'evanpeters', 'canada1234');

INSERT INTO TECHNICIAN (Technician_ID, Certification_number)
VALUES ('E001', 'CERT123456');

-- Assistant: Julie Red
INSERT INTO EMPLOYEE (ID, First_name, Last_name, Email, Phone_number)
VALUES ('E002', 'Julie', 'Red', 'juliered@inoculyst.com', '1234443333');

INSERT INTO ACCOUNT (ID, Account_type, Username, Password)
VALUES ('E002', 'assistant', 'juliered', 'barbie123');

INSERT INTO ASSISTANT (Assistant_ID)
VALUES ('E002');