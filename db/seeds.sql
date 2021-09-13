INSERT INTO department(department_name)
VALUES ("Administration"), ("Pro Scouting"), ('Ama Scouting'), ("Advance Scouting"), ("International Scouting"), ("Player Development"), ("Research and Development");

INSERT INTO roles(title, salary, department_id)
VALUES ("Analyst", 45000, 7), ("Coach", 50000, 4), ("Coordinator", 70000, 1), ("Pro Scout", 80000, 2), ("Assistant Director", 100000, 5), ("Director", 150000, 3), ("Assistant GM", 350000, 6), ("GM", 350000, 1), ("President", 350000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Cody', 'Callahan', 1, 1), ('Max', 'Deric', 2, 2), ('Jean', 'Roberts', 3, 3), ('Michelle', 'Ann', 3, 3), ('Mike', 'Smith', 1, 1);