INSERT INTO department (id, name_department)
VALUES (1, "Produccion"),
       (2, "Development"),
       (3, "purchasing"),
       (4, "accounting");

INSERT INTO roles (id,title,salary,department_id)
VALUES (20,"Manager", 50.000, 1),
       (21,"Junior developer", 90.000, 2),
       (22,"Buyer", 70.000, 3),
       (23,"Acounter", 90.000, 4);
       
INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES (61,"John","Denver",21,61),
       (62,"Fran","wilson",22,NULL),
       (63,"Mark","Chen",23,NULL),
       (64,"Peter","Parker",22,63),
       (65,"Ivan","Rodriguez",20,65);
