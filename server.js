const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'rootroot',
    database: 'company_DB',
});

const start = () => {

    inquirer
        .prompt({
            name: 'menu',
            type:'rawlist',
            message:'What would you like to do?',
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
            switch(val.menu) {
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
                    addRole();
                    break;
            }
        }) 
}

const viewDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type:'list',
            message: 'Please select a department',
            choices:[
                'sales',
                'engineering',
                'finance',
                'legal',
            ]
        }) .then((val) =>{
            const query = 'SELECT * FROM company_db.departments'
            connection.query(query, {departments: val.department}, (err, res) => {
                if(err) throw err;
                console.table(res);
                start();
            })
        }); 
}

const viewEmployees = () => {

            const query = 'SELECT * FROM company_db.employees'
            connection.query(query, (err, res) => {
                if(err) throw err;
                console.table(res);
                // start();
            })
        };

    const viewRoles = () => {

        const query = 'SELECT * FROM company_db.roles'
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.table(res);
            // start();
        })
    };

start();