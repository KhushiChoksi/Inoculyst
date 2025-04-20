-- Create Vaccines
INSERT INTO VACCINE (Vaccine_Name, Brand_Name, Diseases)
VALUES ('[Pneu-C-7] Prevnar', 'Pfizer Canada Inc.', 'Pneumococcal disease'); -- https://nvc-cnv.canada.ca/en/tradename/7651000087105
INSERT INTO VACCINE_ACTIVE_INGREDIENTS (Vaccine_Name, V_Active_Ingredients)
VALUES ('[Pneu-C-7] Prevnar', '[Pneu-C-7] Pneumococcal conjugate 7-valent vaccine, Pneumococcal conjugate antigen');

INSERT INTO VACCINE (Vaccine_Name, Brand_Name, Diseases)
VALUES ('[Inf] Vaxigrip', 'Sanofi Pasteur SA', 'Influenza'); -- https://nvc-cnv.canada.ca/en/tradename/7561000087109
INSERT INTO VACCINE_ACTIVE_INGREDIENTS (Vaccine_Name, V_Active_Ingredients)
VALUES ('[Inf] Vaxigrip', 'Influenza A virus subtype H1N1 antigen, Influenza virus antigen');

INSERT INTO VACCINE (Vaccine_Name, Brand_Name, Diseases)
VALUES ('[COVID-19] VAXZEVRIA', 'ASTRAZENECA CANADA INC.', 'COVID-19'); -- https://nvc-cnv.canada.ca/en/tradename/28761000087108
INSERT INTO VACCINE_ACTIVE_INGREDIENTS (Vaccine_Name, V_Active_Ingredients)
VALUES ('[COVID-19] VAXZEVRIA', 'Recombinant non-replicating viral vector encoding severe acute respiratory syndrome coronavirus 2 spike protein');

INSERT INTO VACCINE (Vaccine_Name, Brand_Name, Diseases)
VALUES ('[COVID-19] JCOVDEN', 'JANSSEN INC.', 'COVID-19'); -- https://nvc-cnv.canada.ca/en/tradename/28951000087107
INSERT INTO VACCINE_ACTIVE_INGREDIENTS (Vaccine_Name, V_Active_Ingredients)
VALUES ('[COVID-19] JCOVDEN', 'Recombinant non-replicating viral vector encoding severe acute respiratory syndrome coronavirus 2 spike protein');

INSERT INTO VACCINE (Vaccine_Name, Brand_Name, Diseases)
VALUES ('[Batx] BAT (Cang)', 'Cangene Corporation', 'Poisoning caused by Clostridium botulinum toxin'); -- https://nvc-cnv.canada.ca/en/tradename/21941000087104
INSERT INTO VACCINE_ACTIVE_INGREDIENTS (Vaccine_Name, V_Active_Ingredients)
VALUES ('[Batx] BAT (Cang)', 'Botulism antitoxin');

-- Create Inventory
INSERT INTO INVENTORY (Pharmacy_Name)
VALUES ('PharmaPlus');

-- Insert Batches 
INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA001', 'Arrived', '2025-03-31', 6, '2026-03-04', '[Pneu-C-7] Prevnar', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA002', 'Arrived', '2025-03-31', 3, '2025-04-25', '[Inf] Vaxigrip', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA003', 'Arrived', '2025-03-31', 20, '2025-04-26', '[COVID-19] VAXZEVRIA', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA004', 'Arrived', '2025-03-31', 4, '2030-04-30', '[Pneu-C-7] Prevnar', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA005', 'Arrived', '2025-03-31', 10, '2027-11-02', '[COVID-19] JCOVDEN', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA006', 'Arrived', '2025-03-31', 12, '2025-06-01', '[Pneu-C-7] Prevnar', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA007', 'Arrived', '2025-03-31', 6, '2028-08-09', '[COVID-19] JCOVDEN', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA008', 'Arrived', '2025-03-31', 10, '2025-04-02', '[Inf] Vaxigrip', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA009', 'Arrived', '2025-03-31', 11, '2025-04-20', '[COVID-19] JCOVDEN', 'PharmaPlus');

INSERT INTO BATCH (Batch_number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
VALUES ('BA010', 'Arrived', '2025-03-31', 3, '2025-04-19', '[COVID-19] VAXZEVRIA', 'PharmaPlus');