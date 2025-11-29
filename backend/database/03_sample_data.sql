-- Insert sample therapists
INSERT INTO therapists (name, specialties, modalities, gender, lgbtqia_affirming, availability, rating) VALUES
('Dr. Sarah Smith', '["Anxiety", "Depression"]', '["CBT", "EMDR"]', 'Female', false, '["Evenings", "Weekends"]', 4.8),
('Dr. Michael Johnson', '["Anxiety", "Trauma"]', '["CBT", "DBT"]', 'Male', false, '["Mornings", "Afternoons"]', 4.6),
('Dr. Emily Williams', '["Depression", "PTSD"]', '["EMDR", "Psychodynamic"]', 'Female', false, '["Evenings"]', 4.7),
('Dr. James Brown', '["Anxiety"]', '["CBT"]', 'Male', false, '["Weekends"]', 4.5),
('Dr. Lisa Davis', '["Depression", "Anxiety", "Trauma"]', '["CBT", "EMDR", "DBT"]', 'Female', false, '["Mornings", "Evenings", "Weekends"]', 4.9),
('Dr. Alex Taylor', '["Anxiety", "LGBTQ+ Issues", "Depression"]', '["CBT", "Affirmative Therapy"]', 'Non-binary', true, '["Evenings", "Weekends"]', 4.9),
('Dr. Jordan Martinez', '["Trauma", "LGBTQ+ Issues"]', '["EMDR", "DBT", "Affirmative Therapy"]', 'Transfeminine', true, '["Mornings", "Afternoons", "Evenings"]', 4.8),
('Dr. Sam Chen', '["Anxiety", "Depression"]', '["CBT", "Mindfulness"]', 'Transmasculine', true, '["Weekends"]', 4.7)
ON CONFLICT DO NOTHING;

-- Insert a sample user with preferences
INSERT INTO users (name, therapist_id, preferences) VALUES
('John Doe', 1, '{"specialty": ["Anxiety"], "modality": ["CBT"], "time": ["Evenings"], "gender": "Female"}')
ON CONFLICT DO NOTHING;