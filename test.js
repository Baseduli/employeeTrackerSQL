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
        // ... Inside your start function
        .then((answer) => {
            switch (answer.action) {
                case 'view all departments':
                    viewDepartments(db);
                    break;
                case 'view all roles':
                    viewRoles(db);
                    break;
                case 'view all employees':
                    viewEmployees(db);
                    break;
                case 'add a department':
                    addDepartment(db);
                    break;
                case 'add a role':
                    addRole(db);
                    break;
                case 'add an employee':
                    addEmployee(db);
                    break;
                case 'update an employee role':
                    updateEmployee(db);
                    break;
                case 'exit':
                    exit(db);
                    break;
            }
        });

};