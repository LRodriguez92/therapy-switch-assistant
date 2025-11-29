CREATE INDEX IF NOT EXISTS idx_users_therapist_id ON users(therapist_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON session_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_therapist_id ON session_feedback(therapist_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON session_feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_therapist_id ON favorites(therapist_id);