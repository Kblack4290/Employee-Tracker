const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk')
const figlet = require('figlet')

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: process.env.PORT || 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'rootroot',
    database: 'company_DB',
});

// designed text for header 
const figletText = () => {

    console.log(chalk.bold.blueBright(figlet.textSync('Employee Tracker!!\n', {
        font: 'speed',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
}

figletText();

// start function and switch statement to start the menu
const start = () => {

    inquirer
        .prompt({
            name: 'menu',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View department',
                'View employees',
                'View roles',
                'Add department',
                'Add employee',
                'Add role',
                'Update employee'
            ]
        })
        .then((val) => {
            switch (val.menu) {
                case 'View department':
                    viewDepartment();
                    break;

                case 'View employees':
                    viewEmployees();
                    break;

                case 'View roles':
                    viewRoles();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Update employee':
                    updateEmployee();
                    break;
                default:
                    connection.end();
                    break;
            }
        })
}

// View the departments that already exist
const viewDepartment = () => {

    console.log('Viewing all departments . . .\n');
    const query = 'SELECT * FROM departments'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// View current employees
const viewEmployees = () => {
    console.log('Viewing all employees . . .\n');
    const query = 'SELECT * FROM company_db.employees'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

//view current roles and their salaries
const viewRoles = () => {
    console.log('Viewing employee roles . . .\n');
    const query = 'SELECT * FROM company_db.roles'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// to add a new department
const addDepartment = () => {
    console.log('Adding a new department. . .\n');

    inquirer
        .prompt([{
            name: 'addDepartment',
            type: 'input',
            message: 'Please enter the department name',
        }])
        .then((val) => {
            const query = 'INSERT INTO departments SET?'
            connection.query(query, { name: val.addDepartment }, (err, res) => {
                if (err) throw err;
                console.table(res);
                viewDepartment();
            })
        })
}

// to add a new employee
const addEmployee = () => {
    console.log('Adding a new employee. . .\n');

    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Please enter the new employees first name',
            },

            {
                name: 'lastName',
                type: 'input',
                message: 'Please enter the new employees last name',
            },

            {
                name: 'roleId',
                type: 'input',
                message: 'What is the new employees role is?',
            },

            {
                name: 'managerId',
                type: 'input',
                message: 'What is the Manager Id?',
            },


        ])
        .then((val) => {
            const query = 'INSERT INTO employees SET?'
            connection.query(query, { first_name: val.firstName, last_name: val.lastName, role_id: val.roleId, manager_id: val.managerId }, (err, res) => {
                if (err) throw err;
                console.table(res);
                viewEmployees();
            })
        })
}

// to add a new role
const addRole = () => {
    console.log('Adding an employee role. . .\n');

    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Please enter the employee title',
            },

            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this title?',
            },

            {
                name: 'departmentId',
                type: 'input',
                message: 'What is the department Id of this title?',
            },

        ])
        .then((val) => {
            const query = 'INSERT INTO roles SET?'
            connection.query(query, { title: val.title, salary: val.salary, department_id: val.departmentId }, (err, res) => {
                if (err) throw err;
                console.table(res);
                viewRoles();
            })
        })
}
//to update an employees role
const updateEmployee = () => {
    console.log('Updating employee role . . . \n');

    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the employees first name?'
            },

            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employees last name?'
            },

            {
                name: 'id',
                type: 'input',
                message: 'What is the new role id number?'
            }
        ]) 
        .then((val) => {
        const query = 'UPDATE employees SET role_id=? WHERE first_name=? && last_name=?'
            connection.query(query,[val.id, val.firstName, val.lastName], (err,res) => {
                if (err) throw err;
                console.table(res);
                viewEmployees();
            })



})
};

start();