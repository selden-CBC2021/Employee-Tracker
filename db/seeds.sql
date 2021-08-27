

USE company_db;

INSERT INTO department (name)
VALUES ("Human Resources"), ("R&D"), ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("manager", 90000, 2), ("engineer", 65000, 3), ("accountant", 62500, 4), ("recruiter", 55500, 1), ("sales person", 70550, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Smith", 1, null), ("Jane", "Doe", 1, 1), ("Jack", "Chan", 3, 2), ("Steve", "Irwin", 5, 2), ("Chuck", "Norris", 4, 2);