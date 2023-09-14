CREATE TABLE products (
                            id          BIGSERIAL PRIMARY KEY,
                            title       VARCHAR(255) NOT NULL UNIQUE,
                            price       INT,
                            created_at  TIMESTAMP DEFAULT current_timestamp,
                            updated_at  TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO products (title, price)
VALUES ('Drill', 3200),
       ('Screw', 15),
       ('Bolt', 10),
       ('Hammer', 150),
       ('Jackhammer', 1390)
