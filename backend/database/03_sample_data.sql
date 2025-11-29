-- Insert sample therapists
INSERT INTO therapists (name, specialties, modalities, gender, availability, rating) VALUES
('Dr. Sarah Smith', '["Anxiety", "Depression"]', '["CBT", "EMDR"]', 'Female', '["Evenings", "Weekends"]', 4.8),
('Dr. Michael Johnson', '["Anxiety", "Trauma"]', '["CBT", "DBT"]', 'Male', '["Mornings", "Afternoons"]', 4.6),
('Dr. Emily Williams', '["Depression", "PTSD"]', '["EMDR", "Psychodynamic"]', 'Female', '["Evenings"]', 4.7),
('Dr. James Brown', '["Anxiety"]', '["CBT"]', 'Male', '["Weekends"]', 4.5),
('Dr. Lisa Davis', '["Depression", "Anxiety", "Trauma"]', '["CBT", "EMDR", "DBT"]', 'Female', '["Mornings", "Evenings", "Weekends"]', 4.9)
ON CONFLICT DO NOTHING;

-- Insert a sample user with preferences
INSERT INTO users (name, therapist_id, preferences) VALUES
('John Doe', 1, '{"specialty": ["Anxiety"], "modality": ["CBT"], "time": ["Evenings"], "gender": "Female"}')
ON CONFLICT DO NOTHING;