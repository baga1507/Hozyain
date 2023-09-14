ALTER TABLE carts RENAME id TO user_id;

CREATE TABLE orders (
                        id                  BIGSERIAL PRIMARY KEY,
                        user_id             BIGSERIAL REFERENCES users (id),
                        total_price         INT NOT NULL,
                        created_at          TIMESTAMP DEFAULT current_timestamp,
                        updated_at          TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE order_items (
                        id                  BIGSERIAL PRIMARY KEY,
                        product_id          BIGSERIAL REFERENCES products (id),
                        order_id            BIGSERIAL REFERENCES orders (id),
                        price_per_product   INT NOT NULL,
                        quantity            INT NOT NULL,
                        total_price         INT NOT NULL,
                        created_at          TIMESTAMP DEFAULT current_timestamp,
                        updated_at          TIMESTAMP DEFAULT current_timestamp
);
