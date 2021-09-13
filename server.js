const inquirer = require("inquirer");
const util = require("util");
const db = require("./db/connection");


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('We are connected to the DB!!!');
    promptUser();
  });

const userOptions = ['See all employees', 'See all roles', 'See all departments', 'Add dept', 'Add employee', 'Add new role', 'Update employee role']


