# Database Schema

## Overview

Minimal, clean, and scalable database design for the Therapy Switch Assistant MVP.

## Tables

### `users`

Stores user accounts and their current therapist assignments.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `int` | Primary Key |
| `name` | `varchar` | User's full name |
| `therapist_id` | `int` | Foreign Key → `therapists.id` (current assigned therapist) |
| `preferences` | `json` | Optional preferences object (e.g., preferred modality, preferred gender) |

**Example `preferences` JSON:**
```json
{
  "specialty": ["Anxiety", "Depression"],
  "modality": ["CBT", "EMDR"],
  "gender": "Female",
  "lgbtqia_affirming": true,
  "time": ["Evenings", "Weekends"]
}
```

**Gender Options:**
- `"Male"`
- `"Female"`
- `"Non-binary"` or `"Gender-neutral"`
- `"Transfeminine"`
- `"Transmasculine"`
- `"Trans / Transgender"`
- `"Prefer not to say"` or `"No preference"`
- `"Other: [custom text]"` - User-defined gender identity

**LGBTQIA+ Affirming:**
- `lgbtqia_affirming` (boolean, optional) - User preference for LGBTQIA+-affirming therapists

### `therapists`

Stores therapist profiles, specialties, and availability.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `int` | Primary Key |
| `name` | `varchar` | Therapist's full name |
| `specialties` | `json` | Array of specialties (e.g., `["Anxiety", "Trauma"]`) |
| `modalities` | `json` | Array of therapy modalities (e.g., `["CBT", "EMDR"]`) |
| `gender` | `varchar(255)` | Optional gender field (supports custom entries like "Other: [text]") |
| `lgbtqia_affirming` | `boolean` | Whether therapist is LGBTQIA+-affirming (default: false) |
| `availability` | `json` | Array of availability options (e.g., `["Evenings", "Weekends"]`) |
| `image_url` | `varchar` | Optional profile image URL |
| `rating` | `float` | For demo sorting purposes |

**Example `specialties` JSON:**
```json
["Anxiety", "Depression", "Trauma", "PTSD"]
```

**Example `modalities` JSON:**
```json
["CBT", "EMDR", "DBT", "Psychodynamic"]
```

**Example `availability` JSON:**
```json
["Mornings", "Afternoons", "Evenings", "Weekends"]
```

### `session_feedback`

Stores user feedback for therapy sessions.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `int` | Primary Key |
| `user_id` | `int` | Foreign Key → `users.id` |
| `therapist_id` | `int` | Foreign Key → `therapists.id` |
| `rating` | `int` | Rating value (1-5) |
| `comment` | `text` | Optional comment text |
| `created_at` | `datetime` | Timestamp of feedback submission |

### `favorites` (Optional)

Stores user's favorited therapists for future reference.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `int` | Primary Key |
| `user_id` | `int` | Foreign Key → `users.id` |
| `therapist_id` | `int` | Foreign Key → `therapists.id` |
| `created_at` | `datetime` | Timestamp when favorited |

## Relationships

```
users (1) ──→ (many) session_feedback
users (1) ──→ (1) therapists (current assignment)
therapists (1) ──→ (many) session_feedback
users (1) ──→ (many) favorites ──→ (1) therapists
```

## Sample Queries

### Get user's current therapist
```sql
SELECT t.* 
FROM users u
JOIN therapists t ON u.therapist_id = t.id
WHERE u.id = ?
```

### Get all therapists except current one
```sql
SELECT * 
FROM therapists 
WHERE id != (SELECT therapist_id FROM users WHERE id = ?)
```

### Get user's feedback history
```sql
SELECT * 
FROM session_feedback 
WHERE user_id = ? 
ORDER BY created_at DESC
```

## Indexes (Recommended)

```sql
CREATE INDEX idx_users_therapist_id ON users(therapist_id);
CREATE INDEX idx_feedback_user_id ON session_feedback(user_id);
CREATE INDEX idx_feedback_therapist_id ON session_feedback(therapist_id);
CREATE INDEX idx_feedback_created_at ON session_feedback(created_at);
```

