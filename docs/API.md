# API Endpoints

## Overview

Simple, focused REST API endpoints for the Therapy Switch Assistant MVP.

## Base URL

```
/api
```

## Endpoints

### POST `/api/feedback`

**Purpose:** Store session rating, detect dissatisfaction, and trigger matching flow if needed.

**Request Body:**
```json
{
  "userId": 1,
  "rating": 2,
  "comment": "Did not feel like a match"
}
```

**Request Parameters:**
- `userId` (integer, required) - User ID
- `rating` (integer, required) - Rating from 1-5
- `comment` (string, optional) - User's feedback comment

**Response (Low Rating ≤ 3):**
```json
{
  "status": "low_rating",
  "next": "/api/matches",
  "message": "We're sorry this session didn't feel like a good fit."
}
```

**Response (High Rating > 3):**
```json
{
  "status": "success",
  "message": "Thank you for your feedback!"
}
```

**Status Codes:**
- `200 OK` - Feedback saved successfully
- `400 Bad Request` - Invalid request body
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

### GET `/api/matches`

**Purpose:** Return top 3 recommended therapists (excluding user's current therapist).

**Query Parameters:**
- `userId` (integer, required) - User ID

**Example Request:**
```
GET /api/matches?userId=1
```

**Response:**
```json
{
  "therapists": [
    {
      "id": 3,
      "name": "Dr. Smith",
      "specialties": ["Anxiety", "Depression"],
      "modalities": ["CBT", "EMDR"],
      "availability": ["Evenings", "Weekends"],
      "gender": "Female",
      "lgbtqia_affirming": false,
      "image_url": "https://example.com/therapist3.jpg",
      "rating": 4.8,
      "match_score": 6
    },
    {
      "id": 5,
      "name": "Dr. Johnson",
      "specialties": ["Anxiety"],
      "modalities": ["CBT"],
      "availability": ["Evenings"],
      "gender": "Female",
      "lgbtqia_affirming": true,
      "image_url": "https://example.com/therapist5.jpg",
      "rating": 4.6,
      "match_score": 5
    },
    {
      "id": 7,
      "name": "Dr. Williams",
      "specialties": ["Depression"],
      "modalities": ["DBT"],
      "availability": ["Weekends"],
      "gender": "Female",
      "lgbtqia_affirming": false,
      "image_url": "https://example.com/therapist7.jpg",
      "rating": 4.5,
      "match_score": 3
    }
  ]
}
```

**Response Fields:**
- `therapists` (array) - Array of therapist objects
  - `id` (integer) - Therapist ID
  - `name` (string) - Therapist's name
  - `specialties` (array) - List of specialties
  - `modalities` (array) - List of therapy modalities
  - `availability` (array) - List of availability options
  - `gender` (string, optional) - Therapist's gender (see gender options in DATABASE.md)
  - `lgbtqia_affirming` (boolean, optional) - Whether therapist is LGBTQIA+-affirming
  - `image_url` (string, optional) - Profile image URL
  - `rating` (float) - Therapist's rating
  - `match_score` (integer) - Calculated match score (for debugging/display, max: 6)

**Status Codes:**
- `200 OK` - Matches returned successfully
- `400 Bad Request` - Missing or invalid userId
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

### POST `/api/switch`

**Purpose:** Assign new therapist to user and update their current assignment.

**Request Body:**
```json
{
  "userId": 1,
  "therapistId": 3
}
```

**Request Parameters:**
- `userId` (integer, required) - User ID
- `therapistId` (integer, required) - New therapist ID to assign

**Response:**
```json
{
  "status": "success",
  "message": "Your therapist has been switched successfully.",
  "therapist": {
    "id": 3,
    "name": "Dr. Smith",
    "specialties": ["Anxiety", "Depression"],
    "modalities": ["CBT", "EMDR"],
    "availability": ["Evenings", "Weekends"]
  }
}
```

**Status Codes:**
- `200 OK` - Therapist switched successfully
- `400 Bad Request` - Invalid request body
- `404 Not Found` - User or therapist not found
- `500 Internal Server Error` - Server error

---

## Error Response Format

All endpoints return errors in the following format:

```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Authentication

For MVP, authentication can be simplified:
- Use session-based auth or JWT tokens
- Include `userId` in request body/query params
- For production, implement proper authentication middleware

## Rate Limiting

Consider implementing rate limiting for production:
- `/api/feedback` - Limit to prevent spam
- `/api/matches` - Limit to prevent abuse
- `/api/switch` - Limit to prevent rapid switching

