-- Add unique constraints to support idempotent seeds and ensure data integrity

-- Products: ensure unique product names
ALTER TABLE products
  ADD CONSTRAINT uq_products_name UNIQUE (name);

-- Content: ensure unique title per type
ALTER TABLE content
  ADD CONSTRAINT uq_content_title_type UNIQUE (title, type);




