# Therapy Switch Assistant - MVP

A lightweight application that helps users switch therapists when they're not satisfied with their current match.

## Overview

This MVP provides a simple, focused solution for detecting user dissatisfaction with therapy sessions and facilitating therapist switches through an intelligent matching system.

## Project Structure

- [**ARCHITECTURE.md**](docs/ARCHITECTURE.md) - System architecture and technology stack
- [**DATABASE.md**](docs/DATABASE.md) - Database schema and table definitions
- [**API.md**](docs/API.md) - API endpoints and request/response formats
- [**MATCHING.md**](docs/MATCHING.md) - Therapist matching algorithm and scoring logic
- [**FRONTEND.md**](docs/FRONTEND.md) - Frontend screens, components, and user flow

## Quick Start

1. Review the architecture in [ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. Set up the database schema from [DATABASE.md](docs/DATABASE.md)
3. Implement API endpoints from [API.md](docs/API.md)
4. Build frontend screens from [FRONTEND.md](docs/FRONTEND.md)
5. Integrate matching logic from [MATCHING.md](docs/MATCHING.md)

## Core Flow

```
User rates session → Backend detects low rating → 
Returns 3 new therapists → User selects → Therapist switched → 
Success screen
```

