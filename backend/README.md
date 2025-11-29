# Therapy Switch Assistant - Backend

Backend API for the Therapy Switch Assistant MVP built with Node.js, Express, and Supabase.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Supabase project URL and API key:
     ```env
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_SECRET_KEY=your_secret_key
     PORT=3000
     NODE_ENV=development
     ```

3. **Set up Supabase database:**
   - Create tables as defined in `../docs/DATABASE.md`
   - Add recommended indexes
   - Insert sample data for testing

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

- `POST /api/feedback` - Submit session feedback
- `GET /api/matches?userId=1` - Get top 3 therapist matches
- `POST /api/switch` - Switch user's therapist
- `GET /health` - Health check endpoint

See `../docs/API.md` for detailed API documentation.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Supabase connection
│   ├── controllers/
│   │   ├── feedbackController.js
│   │   ├── matchesController.js
│   │   └── switchController.js
│   ├── services/
│   │   ├── matchingService.js    # Matching algorithm
│   │   └── userService.js
│   ├── routes/
│   │   └── api.js                # API routes
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   └── app.js                    # Express app setup
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js                      # Entry point
```

## Testing

Test the API endpoints using tools like:
- Postman
- curl
- HTTPie

Example curl commands:

```bash
# Submit feedback
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "rating": 2, "comment": "Not a good match"}'

# Get matches
curl http://localhost:3000/api/matches?userId=1

# Switch therapist
curl -X POST http://localhost:3000/api/switch \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "therapistId": 3}'
```

