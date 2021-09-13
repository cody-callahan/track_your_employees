const db = require("./db/connection");
const inquirer = require("inquirer");

const util = require("util");

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('We are connected to the DB!!!');
    promptUser();
});

// const userOptions = ['See all employees', 'See all roles', 'See all departments',
//     'Add employee', 'Add dept', 'Add new role', 'Update employee role']


const promptUser = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select an option below:',
            choices: ['See all employees', 'See all roles', 'See all departments',
            'Add employee', 'Add dept', 'Add new role', 'Update employee role'],
            default: 0
        },
    ]).then(selectionData => {
        if (selectionData.selection === 'See all employees') {
            db.query(`SELECT * FROM employee`, (err, row) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.table(row);
                }
                promptUser();

            });
        } if (selectionData.selection === 'See all roles') {
            db.query(`SELECT * FROM roles`, (err, row) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.table(row);
                }
                promptUser();

            });
        } if (selectionData.selection === 'See all departments') {
            db.query(`SELECT * FROM department`, (err, row) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.table(row);
                }
                promptUser();

            });
        } if (selectionData.selection === 'Add employee') {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_selection',
                    message: 'What is the employees role?',
                    choices: employeeRole => new Promise((resolve, reject) => {
                        db.query(
                            `SELECT id, title 
                            FROM roles`
                            , (err, res) => {
                            if (err) reject(err);
                            resolve(res);
                        });
                    }).then(roles => roles.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    }))
                        .catch(err => {
                            console.log(err);
                        })
                },
                {
                    type: 'list',
                    name: 'boss_selection',
                    message: 'Who is their boss?',
                    choices: managers => new Promise((resolve, reject) => {
                        db.query(`
                        SELECT 
                            first_name, last_name, id 
                        FROM 
                            employee`, (err, res) => {
                            if (err) reject(err);
                            resolve(res);
                        });

                    }).then(employee => employee.map(mgr => {
                        return {
                            name: mgr.first_name + " " + mgr.last_name,
                            value: mgr.id
                            // value: mgr.first_name + " " + mgr.last_name,
                        }
                    }))
                        .catch(err => {
                            console.log(err);
                        })
                },

                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is their first name?',
                    validate: firstName => {
                        if (firstName) {
                            return true;
                        } else {
                            console.log('Need to enter a value!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is their last name?',
                    validate: lastName => {
                        if (lastName) {
                            return true;
                        } else {
                            console.log('Need to enter a value!');
                            return false;
                        }
                    }
                },
            ])
                .then(newEmployee => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployee.first_name}', '${newEmployee.last_name}', '${newEmployee.role_selection}', '${newEmployee.boss_selection}');`, (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success! Employee is in the DB");
                        promptUser();
                    });
                });
        } if (selectionData.selection === 'Add dept') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'new_dept',
                    message: 'What is the department name?',
                    validate: dept => {
                        if (dept) {
                            return true;
                        } else {
                            console.log('Please a value for the new dept name');
                            return false;
                        }
                    }
                },
            ])
                .then(newDeptName => {
                    db.query(`INSERT INTO department (department_name) VALUES ('${newDeptName.new_dept}');`, (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success! New dept is in the DB");
                        promptUser();
                    });
                });
        }
        if (selectionData.selection === 'Add new role') {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_dept',
                    message: 'Which dept is this role in?',
                    choices: department => new Promise((resolve, reject) => {
                        db.query(`SELECT id, department_name FROM department`, (err, res) => {
                            if (err) reject(err);
                            resolve(res);
                        });
                    }).then(departments => departments.map(dept => {
                        return {
                            name: dept.department_name,
                            value: dept.id
                        }
                    }))
                        .catch(err => {
                            console.log(err);
                        })
                },
                {
                    type: 'input',
                    name: 'role_title',
                    message: 'What is the name of this new role?',
                    validate: role => {
                        if (role) {
                            return true;
                        } else {
                            console.log('Enter value for role');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'role_salary',
                    message: 'What is the salary of this role',
                    validate: salary => {
                        if (salary) {
                            return true;
                        } else {
                            console.log('Need a numeric salary value plz');
                            return false;
                        }
                    },
                },

            ])
                .then(newRole => {
                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.role_title}', '${newRole.role_salary}', '${newRole.role_dept}');`, (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success! A new role has been added to the DB.");
                        promptUser();
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
}