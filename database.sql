CREATE DATABASE loginauth;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE employees(
    s_no SERIAL,
    user_id UUID,
    employ_name VARCHAR(255) ,
    gender VARCHAR(255) ,
    designation VARCHAR(255) ,
    city VARCHAR(255),
    PRIMARY KEY (s_no),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- fake users

insert into users (user_name, user_email, user_password) values ('alexcia', 'girl@gmail.com', 'secret');

-- fake employees

insert into employees (user_id, employ_name, gender, designation, city) values ('e924cc7e-6a18-4bdd-88dd-a11c37c21647', 'albert', 'male','developer','chennai');