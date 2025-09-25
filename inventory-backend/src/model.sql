CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100)
);

CREATE TABLE inventory_batches (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(20) REFERENCES products(product_id),
    quantity INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    remaining_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(20) REFERENCES products(product_id),
    quantity INT NOT NULL,
    total_cost NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
