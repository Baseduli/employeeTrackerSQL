const inquirer = require('inquirer');

const start = async (db) => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'exit'
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'view all departments':
                    viewDepartments();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployee();
                    break;
            }
        });
};

const viewDepartments = (db) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        start(db); // return to main menu
    });
}

const viewRoles = (db) => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        start(db); // return to main menu
    });
};


const viewEmployees = (db) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                 CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        start(db); // return to main menu
    });
};

const addDepartment = (db) => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
    })
        .then((answer) => {
            const sql = 'INSERT INTO department (name) VALUES (?)';
            db.query(sql, answer.name, (err, result) => {
                if (err) throw err;
                console.log('Department added successfully!');
                start(db); // return to main menu
            });
        });
};

const addRole = (db) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        const departments = rows.map((department) => {
            return {
                name: department.name,
                value: department.id
            };
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the role department:',
                choices: departments
            }
        ])
            .then((answer) => {
                const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                const params = [answer.title, answer.salary, answer.department_id];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    start(db); // return to main menu
                });
            });
    }
    );
}


module.exports = { start };