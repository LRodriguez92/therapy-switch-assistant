# Frontend Screens

## Overview

User interface flow for the Therapy Switch Assistant MVP. Built with React + Tailwind CSS.

## User Flow

```
Feedback Screen → Low Rating Modal → Therapist Suggestions → Switch Confirmation
```

## Screen 1: Feedback Screen

**Route:** `/feedback`

**Purpose:** Collect user's session rating and optional comments.

### Elements

- **Heading:** "How was your session?"
- **Rating Input:** 1-5 star rating system
  - Interactive stars that fill on hover/click
  - Visual feedback for selected rating
- **Comment Textbox:**
  - Multi-line textarea
  - Placeholder: "Tell us about your experience (optional)"
  - Character limit: 500 characters
- **Submit Button:**
  - Primary CTA button
  - Text: "Submit Feedback"
  - Disabled state until rating is selected

### Behavior

- On submit, POST to `/api/feedback`
- If rating ≤ 3: Show modal (see Screen 2)
- If rating > 3: Show success message, stay on page

### Design Notes

- Clean, minimal design
- Focus on the rating input
- Mobile-responsive
- Accessible (keyboard navigation, screen reader support)

---

## Screen 2: Low Rating Modal

**Trigger:** Appears when user submits rating ≤ 3

**Purpose:** Acknowledge dissatisfaction and offer therapist switch option.

### Copy

**Heading:** "Sorry this session didn't feel like a good fit."

**Body Text:** "You deserve a therapist who feels right. Want to try a better match?"

### Buttons

1. **Primary CTA:** "Yes, show matches"
   - Navigates to `therapists/suggestions`
   - Triggers GET `/api/matches?userId={userId}`

2. **Secondary Button:** "No, keep current therapist"
   - Closes modal
   - Returns to feedback screen
   - Shows "Thank you for your feedback" message

### Design Notes

- Modal overlay with backdrop
- Centered modal card
- Clear visual hierarchy
- Escape key to close
- Click outside to close

---

## Screen 3: Therapist Suggestions Page

**Route:** `therapists/suggestions`

**Purpose:** Display top 3 matched therapists with details and switch options.

### Layout

Grid or list of 3 therapist cards.

### Therapist Card Elements

Each card includes:

1. **Profile Image** (optional)
   - Circular or rounded square
   - Placeholder if no image

2. **Name**
   - Therapist's full name
   - Font: Larger, bold

3. **Specialties**
   - Badge/tag display
   - Example: `Anxiety` `Depression`
   - Color-coded or styled tags

4. **Modalities**
   - Badge/tag display
   - Example: `CBT` `EMDR`
   - Different style from specialties

5. **Availability**
   - Icon + text
   - Example: "🕐 Evenings, Weekends"

6. **Mini Bio** (optional)
   - 1-2 sentence description
   - Truncated with "Read more" if long

7. **Actions:**
   - **"View Details"** button (secondary)
     - Expands card or navigates to detail page
   - **"Switch to This Therapist"** button (primary CTA)
     - POST to `/api/switch`
     - Navigates to confirmation screen

### Design Notes

- Cards should be visually distinct
- Match score can be shown subtly (e.g., "95% match")
- Responsive: Stack on mobile, grid on desktop
- Loading state while fetching matches
- Empty state if no matches found

### Example Card Layout

```
┌─────────────────────────────┐
│  [Profile Image]            │
│                             │
│  Dr. Smith                  │
│                             │
│  [Anxiety] [Depression]     │
│  [CBT] [EMDR]               │
│                             │
│  🕐 Evenings, Weekends      │
│                             │
│  Experienced therapist...   │
│                             │
│  [View Details] [Switch]    │
└─────────────────────────────┘
```

---

## Screen 4: Switch Confirmation Screen

**Route:** `/switch/confirmation`

**Purpose:** Confirm successful therapist switch and provide next steps.

### Copy

**Heading:** "Your therapist has been switched successfully."

**Body Text:** 
- "Your new therapist usually replies within X hours."
- "You can start messaging them right away."

### Buttons

1. **Primary CTA:** "Send first message"
   - Navigates to messaging interface
   - Pre-fills message template (optional)

2. **Secondary Button:** "Schedule a session"
   - Navigates to scheduling interface
   - Shows available time slots

### Additional Elements

- **New Therapist Card** (optional)
  - Mini card showing new therapist
  - Name, image, specialties
- **Success Icon/Animation**
  - Checkmark or success animation
- **Back to Dashboard** link (optional)

### Design Notes

- Celebration feel (subtle animation)
- Clear success messaging
- Prominent CTAs for next actions
- Mobile-responsive

---

## Optional: Compare Screen

**Route:** `/therapists/compare`

**Purpose:** Side-by-side comparison of multiple therapists.

### Layout

- Two or three columns
- Each column = one therapist
- Compare key attributes:
  - Name & Image
  - Specialties
  - Modalities
  - Availability
  - Rating
  - Match Score

### Actions

- "Select This Therapist" button per column
- "Back to Suggestions" link

### Design Notes

- Table-like structure for easy comparison
- Highlight differences
- Mobile: Stack vertically or use tabs

---

## Component Structure (React Example)

```jsx
// FeedbackForm.jsx
<FeedbackForm onSubmit={handleSubmit} />

// LowRatingModal.jsx
<LowRatingModal 
  isOpen={showModal}
  onClose={handleClose}
  onShowMatches={handleShowMatches}
/>

// TherapistCard.jsx
<TherapistCard 
  therapist={therapist}
  onViewDetails={handleViewDetails}
  onSwitch={handleSwitch}
/>

// SuggestionsPage.jsx
<SuggestionsPage 
  therapists={therapists}
  loading={isLoading}
/>

// ConfirmationPage.jsx
<ConfirmationPage 
  therapist={newTherapist}
  onMessage={handleMessage}
  onSchedule={handleSchedule}
/>
```

## Styling Guidelines

- **Color Scheme:** Professional, calming colors (blues, greens)
- **Typography:** Clear, readable fonts
- **Spacing:** Generous whitespace
- **Icons:** Consistent icon library (e.g., Heroicons, Font Awesome)
- **Responsive Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Accessibility

- Semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance (WCAG AA)
- Focus indicators

## State Management

For React implementation:

```javascript
// State structure
{
  user: { id, name, therapist_id, preferences },
  currentRating: null,
  showModal: false,
  suggestedTherapists: [],
  selectedTherapist: null,
  isLoading: false,
  error: null
}
```

## Error Handling

- Network errors: Show retry button
- Validation errors: Inline error messages
- Empty states: Friendly messages
- Loading states: Skeleton screens or spinners

