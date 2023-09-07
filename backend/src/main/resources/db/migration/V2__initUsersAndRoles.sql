create table users (
                       id          bigserial primary key,
                       email       varchar(255) unique not null,
                       password    varchar(255) not null,
                       created_at  timestamp default current_timestamp,
                       updated_at  timestamp default current_timestamp
);

create table roles (
                       id          bigserial primary key,
                       name        varchar(255) unique not null,
                       created_at  timestamp default current_timestamp,
                       updated_at  timestamp default current_timestamp
);

create table users_roles (
                             user_id bigserial not null references users (id),
                             role_id bigserial not null references roles (id),
                             primary key (user_id, role_id)
);

insert into roles (name)
values ('ROLE_ADMIN'),
       ('ROLE_USER');

insert into users (email, password)
values ('admin@gmail.com', '$2y$10$2VbTuphgGr.Rd1TeYMF1Se5QWmJJxDvfU2CvZASuDFkHndFLKqoYu'),
       ('user@gmail.com', '$2y$10$nGsvollnkyy3ySLJlG7gtO1ZroCm.ULmN5BszOkqaMw.xYbtOPBDe');

insert into users_roles (user_id, role_id)
values (1, 1),
       (2, 2)
