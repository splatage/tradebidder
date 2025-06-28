-- Enhanced Database Schema with Performance Optimizations

-- USERS TABLE
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  dob DATE,
  is_verified BOOLEAN DEFAULT FALSE,
  gst_number VARCHAR(50),
  insurance_uploaded BOOLEAN DEFAULT FALSE,
  id_uploaded BOOLEAN DEFAULT FALSE,
  is_suspended BOOLEAN DEFAULT FALSE,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- REGIONS TABLE
CREATE TABLE regions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  country VARCHAR(100),
  region_name VARCHAR(100),
  region_code VARCHAR(10),
  INDEX idx_country_region (country, region_code)
) ENGINE=InnoDB;

INSERT INTO regions (country, region_name, region_code) VALUES
('New Zealand', 'Auckland', 'AKL'),
('New Zealand', 'Wellington', 'WLG'),
('New Zealand', 'Canterbury', 'CAN'),
('Australia', 'New South Wales', 'NSW'),
('Australia', 'Victoria', 'VIC');

-- JOBS TABLE
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  budget DECIMAL(10,2),
  industry VARCHAR(100),
  location_city VARCHAR(100),
  location_region VARCHAR(100),
  location_suburb VARCHAR(100),
  location_postcode VARCHAR(20),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  region_id INT,
  start_date DATE,
  end_date DATE,
  tools_provided BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (region_id) REFERENCES regions(id),
  INDEX idx_user_id (user_id),
  INDEX idx_region_id (region_id),
  INDEX idx_created_at (created_at),
  INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB;

-- BIDS TABLE
CREATE TABLE bids (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2),
  message TEXT,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_job_user_status (job_id, user_id, status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- MESSAGES TABLE
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  INDEX idx_job_participants (job_id, sender_id, recipient_id),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB;

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type VARCHAR(50),
  message TEXT,
  link VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_isread_created (user_id, is_read, created_at)
) ENGINE=InnoDB;

-- PORTFOLIO_ITEMS TABLE
CREATE TABLE portfolio_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_id INT,
  title VARCHAR(255),
  description TEXT,
  tags TEXT,
  location_city VARCHAR(100),
  image_url VARCHAR(255),
  review_excerpt TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  INDEX idx_user_public (user_id, is_public),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- FLAGS TABLE
CREATE TABLE flags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('review', 'job', 'user'),
  target_id INT,
  reporter_id INT NOT NULL,
  reason TEXT,
  admin_notes TEXT,
  status ENUM('open', 'resolved', 'dismissed') DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reporter_id) REFERENCES users(id),
  INDEX idx_type_status (type, status),
  INDEX idx_target_id (target_id)
) ENGINE=InnoDB;

-- REVIEWS TABLE
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  reviewee_id INT NOT NULL,
  rating INT,
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  visible BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_reviewee_visibility (reviewee_id, visible),
  INDEX idx_reviewer_job (reviewer_id, job_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
