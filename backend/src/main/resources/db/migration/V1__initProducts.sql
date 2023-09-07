create table products (id bigserial primary key, title varchar(255) unique, price int);
insert into products (title, price)
values ('Drill', 3200),
       ('Screw', 15),
       ('Bolt', 10),
       ('Hammer', 150),
       ('Jackhammer', 1390)
