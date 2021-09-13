INSERT INTO department(department_name)
VALUES ("Administration"), ("Pro Scouting"), ('Ama Scouting'), ("Advance Scouting"), ("International Scouting"), ("Player Development");

INSERT INTO roles(title, salary, department_id)
VALUES ("Analyst", 45000, 1), ("Coach", 50000, 2), ("Coordinator", 70000, 3), ("Manager", 80000, 4), ("Assistant Director", 100000, 5), ("Director", 150000, 6), ("Assistant GM", 350000, 7), ("GM", 350000, 8), ("President", 350000, 9);

INSERT INTO employee(first_name, last_name, role_id, manager)
VALUES('Cody', 'Callahan', 1, 1), ('Max', 'Deric', 2, 2), ('Jean', 'Roberts', 3, 3), ('Michelle', 'Ann', 3, 3), ('Mike', 'Smith', 1, 1);