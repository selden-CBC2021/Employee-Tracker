const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // your username
    user: 'root',
    // your password
    password: 'ryanrico1',
    database: 'company_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    startApp();
});
const startApp = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employees',
            'Add Departments',
            'Add Roles',
            'Update Employee',
            'Exit'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                departmentAdd();
                break

            case 'Add Roles':
                roleAdd();
                break

            case 'Update Employee':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break;

            default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  
  const employeeView = () => {
    const query = 'SELECT * FROM employee';
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          });
          startApp();
        };
      
  
  const departmentView = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      startApp();
    });
  };
  
  const roleView = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      startApp();
    });
  };
  
  const employeeAdd = () => {
    inquirer
      .prompt([
    {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of this employee?'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of this employee?'
    },
    {
      name: 'roleID',
      type: 'input',
      message: 'What is the role ID number of this employee?'
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'What is the manager ID number of this employee?'
    }
    ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
          [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
          (err, res) => {
            if (err) throw err;
            console.table(res)         
            startApp();
          }) 
        });
    };
  
  

module.exports = connection;