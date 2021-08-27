const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

//create connection to mysql workbench
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // your username
    user: 'root',
    // your password
    password: process.env.DB_PASSWORD,
    database: 'company_db'
});

// connect to mysql and start the App
connection.connect((err) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);
    startApp();
});

console.table(
  "\n------------ EMPLOYEE TRACKER ------------\n"
)
// Gives a list of options to run
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
                process.exit();
                
        }
      });
  };
  // joining tables to display department and role info with the employees
  const employeeView = () => {
    const query = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          startApp();
        });
      };
      
  // View all departments
  const departmentView = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      startApp();
    });
  };
  // View all roles
  const roleView = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      startApp();
    });
  };
  // function to add employee when given first and last name, the role ID, and the manager ID they will be working under.
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
      name: 'managerID',
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
            console.log(`Employee ${answer.firstName} ${answer.lastName} was created successfully!`);
            console.table(res)         
            startApp();
          }) 
        });
    };

    const roleAdd = () => {
      inquirer
        .prompt([
      {
          name: 'roleName',
          type: 'input',
          message: 'What is the name of the role you would like to add?'
      },
      {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this role?'
      },
      {
        name: 'deptID',
        type: 'input',
        message: 'What is the department ID for this role?'
      }
    ])
      .then((answer) => {
          connection.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
            [answer.roleName, answer.salary, answer.deptID],
            (err, res) => {
              if (err) throw err;
              console.table(res)         
              startApp();
            }) 
          });
      };

      const departmentAdd = () => {
        inquirer
          .prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'What is the name of the department?'
        }
      ])
        .then((answer) => {
            connection.query(
              'INSERT INTO department (name) VALUES (?)', 
              [answer.deptName],
              (err, res) => {
                if (err) throw err;
                console.table(res)         
                startApp();
              }) 
            });
        };
      // function to update employees role based off their first name
      const employeeUpdate = () => {
        inquirer
          .prompt([
            {
              name: 'employeeUpdate',
              type: 'input',
              message: 'Which employee do you want to update?',
            },
            {
              name: 'roleUpdate',
              type: 'input',
              message: 'What role do you want to update to?'
            }
          ])
          .then((answer) => {
            connection.query(
              'UPDATE employee SET role_id=? WHERE first_name=?',
              [answer.roleUpdate, answer.employeeUpdate],
              (err, res) => {
                if (err) throw err;
                console.table(res)         
                startApp();  
              }
            )
          })
      }

  
  

module.exports = connection;