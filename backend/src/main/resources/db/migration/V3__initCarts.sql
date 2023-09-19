CREATE TABLE carts (
                        id                  BIGSERIAL PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
                        total_price         INT DEFAULT 0,
                        created_at          TIMESTAMP DEFAULT current_timestamp,
                        updated_at          TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE cart_items (
                        id                  BIGSERIAL PRIMARY KEY,
                        product_id          BIGSERIAL REFERENCES products (id),
                        cart_id             BIGSERIAL REFERENCES carts (id) ON DELETE CASCADE,
                        price_per_product   INT NOT NULL,
                        quantity            INT NOT NULL,
                        price               INT NOT NULL,
                        created_at          TIMESTAMP DEFAULT current_timestamp,
                        updated_at          TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO carts (id)
VALUES (1), (2)