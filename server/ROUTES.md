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
- http://localhost:8080/requests
  - http://localhost:8080/requests/pending
- http://localhost:8080/returns

### General/other tables
- http://localhost:8080/vaccine
  - http://localhost:8080/vaccine/ingredients
- http://localhost:8080/analytics (this will just get you the update date)
  - http://localhost:8080/analytics/expired-batches
  - http://localhost:8080/analytics/expiring-batches
  - http://localhost:8080/analytics/newly-added-batches
  - http://localhost:8080/analytics/counts

## Updating data in tables (PUT requests)
### Role/user tables
- http://localhost:8080/account/:id/account-type
  - :id = user's account id
  - account-type: the account type you want to change it to
- http://localhost:8080/account/:id/password
- http://localhost:8080/account/:id/username
- http://localhost:8080/admin/:id/first-name
- http://localhost:8080/admin/:id/last-name
- http://localhost:8080/admin/:id/email
- http://localhost:8080/admin/:id/phone
- http://localhost:8080/employee/:id/first-name
- http://localhost:8080/employee/:id/last-name
- http://localhost:8080/employee/:id/email
- http://localhost:8080/employee/:id/phone
- http://localhost:8080/requests/:id/status

### Inventory related tables
- http://localhost:8080/batches/:id/quantity (update quantity)
- http://localhost:8080/batches/:id/expiry (update expiry)
- http://localhost:8080/batches/:id/vaccine (update vaccine type)

### General/other tables


## Inserting data in tables (POST requests)
### Role/user tables

### Inventory related tables
- http://localhost:8080/batches/add-batch (add a new batch)
- http://localhost:8080/requests/add-request (add a new unique request)
- http://localhost:8080/requests/add-request
- http://localhost:8080/requests/update-batch-with-requests (this will add accepted requests to batch)
- http://localhost:8080/requests/update-pending-requests
- http://localhost:8080/requests/add-returned-batch (this will add a batch to returned batches **and** delete it everywhere else)

### General/other tables
- http://localhost:8080/analytics/update/expired
- http://localhost:8080/analytics/update/upcoming
- http://localhost:8080/analytics/update/new


## Deleting data in tables (DELETE requests)
### Role/user tables

### Inventory related tables
- http://localhost:8080/batches/:id (delete an existing batch)
- http://localhost:8080/requests/:id (delete an existing request)


### General/other tables