# Routing Links - Inoculyst Server

## Retrieving tables (GET requests)
### Role/user tables
- http://localhost:8080/account
- http://localhost:8080/admin
- http://localhost:8080/assistant
- http://localhost:8080/employee
- http://localhost:8080/owner
- http://localhost:8080/pharmacist
- http://localhost:8080/technician

### Inventory related tables
- http://localhost:8080/inventory
- http://localhost:8080/batches

### General/other tables
- http://localhost:8080/vaccine
  - http://localhost:8080/vaccines/ingredients
- http://localhost:8080/analytics (this will just get you the update date)
  - http://localhost:8080/analytics/expired-batches
  - http://localhost:8080/analytics/expiring-batches
  - http://localhost:8080/analytics/newly-added-batches

## Inserting data in tables (PUT requests)
### Role/user tables
- http://localhost:8080/account/:id/account-type
  - :id = user's account id
  - account-type: the account type you want to change it to
- http://localhost:8080/admin/:id/first-name
- http://localhost:8080/admin/:id/last-name
- http://localhost:8080/admin/:id/email
- http://localhost:8080/admin/:id/phone
- http://localhost:8080/employee/:id/first-name
- http://localhost:8080/employee/:id/last-name
- http://localhost:8080/employee/:id/email
- http://localhost:8080/employee/:id/phone

### Inventory related tables

### General/other tables


## Updating data in tables (POST requests)
### Role/user tables

### Inventory related tables

### General/other tables
- http://localhost:8080/analytics/update/expired
- http://localhost:8080/analytics/update/upcoming
- http://localhost:8080/analytics/update/new