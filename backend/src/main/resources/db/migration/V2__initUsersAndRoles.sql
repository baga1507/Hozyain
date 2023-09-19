CREATE TABLE users (
                       id          BIGSERIAL PRIMARY KEY,
                       email       VARCHAR(255) NOT NULL UNIQUE,
                       password    VARCHAR(255) NOT NULL,
                       created_at  TIMESTAMP DEFAULT current_timestamp,
                       updated_at  TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE roles (
                       id          BIGSERIAL PRIMARY KEY,
                       name        VARCHAR(255) NOT NULL UNIQUE,
                       created_at  TIMESTAMP DEFAULT current_timestamp,
                       updated_at  TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE users_roles (
                             user_id BIGSERIAL NOT NULL REFERENCES users (id) ON DELETE CASCADE,
                             role_id BIGSERIAL NOT NULL REFERENCES roles (id),
                             PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (name)
VALUES ('ROLE_ADMIN'),
       ('ROLE_USER');

INSERT INTO users (email, password)
VALUES ('admin@gmail.com', '$2y$10$2VbTuphgGr.Rd1TeYMF1Se5QWmJJxDvfU2CvZASuDFkHndFLKqoYu'),
       ('user@gmail.com', '$2y$10$nGsvollnkyy3ySLJlG7gtO1ZroCm.ULmN5BszOkqaMw.xYbtOPBDe');

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1),
       (2, 2)
