-- Insert some initial data into the department table
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Human Resources'),
    ('Marketing');

-- Insert some initial data into the role table
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 90000, 1),
    ('Senior Software Engineer', 120000, 1),
    ('Finance Manager', 80000, 2),
    ('HR Specialist', 60000, 3),
    ('Marketing Coordinator', 55000, 4);

-- Insert some initial data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Mike', 'Smith', 3, NULL),
    ('Emily', 'Johnson', 4, 3);
