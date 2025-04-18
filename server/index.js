const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


// routing to role/user tables
const accountRoutes = require('./routes/roles/accounts');
const adminRoutes = require('./routes/roles/admins');
const assistantRoutes = require('./routes/roles/assistants');
const employeeRoutes = require('./routes/roles/employees');
const ownerRoutes = require('./routes/roles/owners');
const pharmacistRoutes = require('./routes/roles/pharmacists');
const technicianRoutes = require('./routes/roles/technicians');

app.use('/account', accountRoutes);
app.use('/admin', adminRoutes);
app.use('/assistant', assistantRoutes);
app.use('/employee', employeeRoutes);
app.use('/owner', ownerRoutes);
app.use('/pharmacist', pharmacistRoutes);
app.use('/technician', technicianRoutes);

app.listen(8080, () => {
  console.log('server listening on port 8080');
});