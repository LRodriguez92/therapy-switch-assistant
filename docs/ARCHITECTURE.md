# System Architecture

## Technology Stack

### Frontend
- **React + Tailwind CSS**

### Backend
- **Node.js with Express**

### Database
- **Supabase**

## System Components

### Frontend Components

1. **Session Feedback Form**
   - Rating input (1-5 stars)
   - Comment textarea
   - Submit button

2. **Low Rating Trigger Modal**
   - Appears when rating ≤ 3
   - Offers therapist switch option

3. **Therapist Suggestions Page**
   - Displays top 3 matched therapists
   - Therapist cards with details
   - Switch action buttons

4. **Switch Confirmation Page**
   - Success message
   - Next steps (message, schedule)

5. **Optional: Compare Screen**
   - Side-by-side comparison of therapists

### Backend Components

1. **`/api/feedback`** - Save feedback and detect dissatisfaction
2. **`/api/matches`** - Return top 3 therapist matches
3. **`/api/switch`** - Update user's therapist assignment

### Database Tables

1. **`users`** - User accounts and current therapist assignments
2. **`therapists`** - Therapist profiles and specialties
3. **`session_feedback`** - Session ratings and comments
4. **`favorites`** (optional) - User's favorited therapists

## Data Flow

```
┌─────────────┐
│   Frontend  │
│  Feedback   │
│    Form     │
└──────┬──────┘
       │ POST /api/feedback
       ▼
┌─────────────┐
│   Backend   │
│  Feedback   │
│   Handler   │
└──────┬──────┘
       │ Detect low rating
       ▼
┌─────────────┐
│  Database   │
│  Feedback   │
│   Storage   │
└─────────────┘
       │
       ▼
┌─────────────┐
│   Backend   │
│   Matching  │
│   Engine    │
└──────┬──────┘
       │ GET /api/matches
       ▼
┌─────────────┐
│   Frontend  │
│ Suggestions │
│    Page     │
└──────┬──────┘
       │ POST /api/switch
       ▼
┌─────────────┐
│   Backend   │
│   Switch    │
│   Handler   │
└──────┬──────┘
       │ Update user.therapist_id
       ▼
┌─────────────┐
│   Frontend  │
│ Confirmation│
│    Page     │
└─────────────┘
```

## Design Principles

- **Simple & Focused**: MVP scope with clear, single-purpose endpoints
- **Scalable**: Database schema supports future enhancements
- **Extensible**: Matching algorithm can be enhanced with ML/AI later

