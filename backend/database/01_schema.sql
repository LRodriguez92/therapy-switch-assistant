-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialties JSONB,
  modalities JSONB,
  gender VARCHAR(50),
  availability JSONB,
  image_url VARCHAR(500),
  rating FLOAT
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  therapist_id INTEGER REFERENCES therapists(id),
  preferences JSONB
);

-- Create session_feedback table
CREATE TABLE IF NOT EXISTS session_feedback (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  therapist_id INTEGER NOT NULL REFERENCES therapists(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table (optional)
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  therapist_id INTEGER NOT NULL REFERENCES therapists(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, therapist_id)
);