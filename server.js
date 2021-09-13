const db = require("./db/connection");
const inquirer = require("inquirer");

const util = require("util");

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('We are connected to the DB!!!');
    promptUser();
  });

const userOptions = ['See all employees', 'See all roles', 'See all departments', 
'Add employee', 'Add dept', 'Add new role', 'Update employee role']


const promptUser = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Please select an option below:',
            choices: userOptions,
            default: 0
        },
    ])
        .then(selectionData => {
            if (selectionData.action === 'See all employees') {
                db.query(`SELECT * FROM employee`, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.table(row);
                    }
                    promptUser();

                });
            } if (selectionData.action === 'See all roles') {
                db.query(`SELECT * FROM roles`, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.table(row);
                    }
                    promptUser();

                });
            } if (selectionData.action === 'See all departments') {
                db.query(`SELECT * FROM department`, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.table(row);
                    }
                    promptUser();

                });
            } 
        })        
}