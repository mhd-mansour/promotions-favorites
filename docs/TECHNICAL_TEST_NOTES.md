# Technical Test Notes

## Time Spent
Roughly 12-14 hours total. Went a bit over on the frontend styling but got it working well.

## Tech Stack
- Backend: NestJS + TypeORM + SQLite (easy for dev)
- Frontend: Next.js 14 + React Query + Tailwind
- Shared types with TypeScript

## Key Decisions

- Used SQLite for simplicity - would use Postgres in prod
- Monorepo structure to share types easily
- React Query for state management (love this library)
- Tailwind because it's fast to prototype with

## What I Built

### Backend
- NestJS API with basic CRUD operations
- SQLite database (TypeORM makes this easy)
- Seeded with some test promotions
- Basic auth guard (just mocked for now)

### Frontend  
- Next.js app with promotion cards
- Search and filtering
- Favorites functionality with optimistic updates
- Mobile responsive (tested on my phone)
- Added Arabic support (RTL was tricky)

### API Endpoints
- GET /promotions - list with search/filter
- POST /promotions/:id/favorite - add to favorites  
- DELETE /promotions/:id/favorite - remove favorite
- GET /promotions/favorites - user's favorites

Used DTOs for validation and consistent response format.

### Frontend Setup
- React Query for data fetching (handles caching nicely)
- Tailwind for styling (much faster than writing CSS)
- i18n setup for English/Arabic
- Mobile-first responsive design

Had some issues with Ionic components conflicting, ended up just using regular HTML/CSS.

### Components
- PromotionCard with favorite toggle
- Search bar with filters
- Loading skeletons
- Toast notifications

Optimistic updates work well - favorites toggle immediately and rollback if API fails.

### RTL Support
Adding Arabic was more work than expected. Had to flip layouts and handle text direction properly.

### Polish
- Added proper error handling
- Debounced search (300ms delay)
- Loading states and skeletons
- Basic accessibility (ARIA labels, keyboard nav)
- Mobile-friendly touch targets

// TODO: Could add more comprehensive error boundaries
// TODO: Maybe add some unit tests if time permits

## Testing
Manually tested the main flows:
- Browse promotions ✓
- Search and filter ✓  
- Add/remove favorites ✓
- Language switching ✓
- Mobile responsive ✓

Should probably add some unit tests but ran out of time.

## What Works
- Basic promotion browsing and search
- Favorites with optimistic updates
- English/Arabic language switching
- Mobile responsive design
- Error handling for most cases

## Known Issues
- Auth is just mocked (would need real JWT in prod)
- SQLite is fine for dev but would use Postgres in production
- Could use more comprehensive testing
- Some edge cases might not be handled perfectly

## If I Had More Time
- Add proper authentication
- Write unit tests
- Add more sophisticated error monitoring
- Maybe add push notifications for expiring favorites
- Performance monitoring and analytics