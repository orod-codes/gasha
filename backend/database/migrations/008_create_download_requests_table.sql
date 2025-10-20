-- Create download_requests table
CREATE TABLE IF NOT EXISTS download_requests (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    national_id VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    platform VARCHAR(20) CHECK (platform IN ('android', 'windows', 'mac', 'linux')),
    otp VARCHAR(10),
    password VARCHAR(255),
    downloaded BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_download_requests_product_id ON download_requests(product_id);
CREATE INDEX IF NOT EXISTS idx_download_requests_downloaded ON download_requests(downloaded);
CREATE INDEX IF NOT EXISTS idx_download_requests_created_at ON download_requests(created_at);
