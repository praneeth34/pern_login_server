CREATE DATABASE loginauth;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE employees(
    user_id uuid DEFAULT uuid_generate_v4(),
    employ_name VARCHAR(255) ,
    gender VARCHAR(255) ,
    designation VARCHAR(255) ,
    city VARCHAR(255),
    PRIMARY KEY (user_id)
);

-- fake users

insert into users (user_name, user_email, user_password) values ('alexcia', 'girl@gmail.com', 'secret');

-- fake employees

insert into employees (employ_name, gender, designation, city) values ('Rebbeca', 'female','lead-developer','chennai');