CREATE TABLE products (
                            id          BIGSERIAL PRIMARY KEY,
                            title       VARCHAR(255) NOT NULL UNIQUE,
                            price       INT,
                            created_at  TIMESTAMP DEFAULT current_timestamp,
                            updated_at  TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO products (title, price)
VALUES ('Дрель', 3200),
       ('Саморез', 15),
       ('Болт', 10),
       ('Молоток', 150),
       ('Отбивной молоток', 1390)
