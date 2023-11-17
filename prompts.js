// const inquirer = require('inquirer');

// const start = async (db) => {
//     inquirer.prompt({
//         type: 'list',
//         name: 'action',
//         message: 'What would you like to do?',
//         choices: [
//             'view all departments',
//             'view all roles',
//             'view all employees',
//             'add a department',
//             'add a role',
//             'add an employee',
//             'update an employee role',
//             'exit'
//         ]
//     })
//         // ... Inside your start function
//         .then((answer) => {
//             switch (answer.action) {
//                 case 'view all departments':
//                     viewDepartments(db);
//                     break;
//                 case 'view all roles':
//                     viewRoles(db);
//                     break;
//                 case 'view all employees':
//                     viewEmployees(db);
//                     break;
//                 case 'add a department':
//                     addDepartment(db);
//                     break;
//                 case 'add a role':
//                     addRole(db);
//                     break;
//                 case 'add an employee':
//                     addEmployee(db);
//                     break;
//                 case 'update an employee role':
//                     updateEmployee(db);
//                     break;
//                 case 'exit':
//                     exit(db);
//                     break;
//             }
//         });

// };


// const viewDepartments = (db) => {
//     const sql = `SELECT * FROM department`;
//     db.query(sql, (err, rows) => {
//         if (err) throw err;
//         console.table(rows);
//         start(db); // return to main menu
//     });
// }

// const viewRoles = (db) => {
//     const sql = `SELECT role.id, role.title, role.salary, department.name AS department
//                  FROM role
//                  LEFT JOIN department ON role.department_id = department.id`;
//     db.query(sql, (err, rows) => {
//         if (err) throw err;
//         console.table(rows);
//         start(db); // return to main menu
//     });
// };


// const viewEmployees = (db) => {
//     const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
//                     CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//                     FROM employee
//                     LEFT JOIN role ON employee.role_id = role.id
//                     LEFT JOIN department ON role.department_id = department.id
//                     LEFT JOIN employee manager ON manager.id = employee.manager_id`;
//     db.query(sql, (err, rows) => {
//         if (err) throw err;
//         console.table(rows);
//         start(db); // return to main menu
//     });
// };

// const addDepartment = (db) => {
//     inquirer.prompt({
//         type: 'input',
//         name: 'name',
//         message: 'Enter the department name:'
//     })
//         .then((answer) => {
//             const sql = 'INSERT INTO department (name) VALUES (?)';
//             db.query(sql, answer.name, (err, result) => {
//                 if (err) throw err;
//                 console.log('Department added successfully!');
//                 start(db); // return to main menu
//             });
//         });
// };

// const addRole = (db) => {
//     const sql = `SELECT * FROM department`;
//     db.query(sql, (err, rows) => {
//         if (err) throw err;
//         const departments = rows.map((department) => {
//             return {
//                 name: department.name,
//                 value: department.id
//             };
//         });
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'title',
//                 message: 'Enter the role title:'
//             },
//             {
//                 type: 'input',
//                 name: 'salary',
//                 message: 'Enter the role salary:'
//             },
//             {
//                 type: 'list',
//                 name: 'department_id',
//                 message: 'Select the role department:',
//                 choices: departments
//             }
//         ])
//             .then((answer) => {
//                 const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
//                 const params = [answer.title, answer.salary, answer.department_id];
//                 db.query(sql, params, (err, result) => {
//                     if (err) throw err;
//                     console.log('Role added successfully!');
//                     start(db); // return to main menu
//                 });
//             });
//     }
//     );
// }

// const addEmployee = (db) => {
//     const sqlRoles = `SELECT * FROM role`;
//     const sqlEmployees = `SELECT * FROM employee`;

//     Promise.all([
//         db.promise().query(sqlRoles),
//         db.promise().query(sqlEmployees)
//     ])
//         .then(([roles, employees]) => {
//             const roleChoices = roles[0].map(role => ({ name: role.title, value: role.id }));
//             const managerChoices = employees[0].map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
//             managerChoices.unshift({ name: 'None', value: null });  // Option for no manager

//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     name: 'first_name',
//                     message: 'Enter the employee\'s first name:'
//                 },
//                 {
//                     type: 'input',
//                     name: 'last_name',
//                     message: 'Enter the employee\'s last name:'
//                 },
//                 {
//                     type: 'list',
//                     name: 'role_id',
//                     message: 'Select the employee\'s role:',
//                     choices: roleChoices
//                 },
//                 {
//                     type: 'list',
//                     name: 'manager_id',
//                     message: 'Select the employee\'s manager:',
//                     choices: managerChoices
//                 }
//             ])
//                 .then((answer) => {
//                     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
//                     const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
//                     db.query(sql, params, (err, result) => {
//                         if (err) throw err;
//                         console.log('Employee added successfully!');
//                         start(db); // return to main menu
//                     });
//                 });
//         })
//         .catch(err => {
//             if (err) throw err;
//         });
// };

// const updateEmployee = (db) => {
//     const sqlEmployees = `SELECT * FROM employee`;
//     const sqlRoles = `SELECT * FROM role`;

//     Promise.all([
//         db.promise().query(sqlEmployees),
//         db.promise().query(sqlRoles)
//     ])
//         .then(([employees, roles]) => {
//             const employeeChoices = employees[0].map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
//             const roleChoices = roles[0].map(role => ({ name: role.title, value: role.id }));

//             inquirer.prompt([
//                 {
//                     type: 'list',
//                     name: 'employee_id',
//                     message: 'Select the employee to update:',
//                     choices: employeeChoices
//                 },
//                 {
//                     type: 'list',
//                     name: 'role_id',
//                     message: 'Select the new role for the employee:',
//                     choices: roleChoices
//                 }
//             ])
//                 .then((answer) => {
//                     const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
//                     const params = [answer.role_id, answer.employee_id];
//                     db.query(sql, params, (err, result) => {
//                         if (err) throw err;
//                         console.log('Employee role updated successfully!');
//                         start(db); // return to main menu
//                     });
//                 });
//         })
//         .catch(err => {
//             if (err) throw err;
//         });
// };

// const exit = (db) => {
//     db.end(err => {
//         if (err) throw err;
//         console.log('Goodbye!');
//         process.exit();  // Exit the process to end the application
//     });
// };

// module.exports = { start };