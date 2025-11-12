# API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
Uses mock auth with hard-coded user ID. Would need real JWT in production.

## Endpoints

### GET /promotions
List promotions with optional search/filters.

Query params:
- `page` - page number (default: 1)
- `limit` - items per page (default: 10)
- `q` - search term
- `merchant` - filter by merchant

Example:
```bash
curl "http://localhost:3001/promotions?q=coffee&page=1"
```

### POST /promotions/:id/favorite
Add promotion to favorites.

```bash
curl -X POST http://localhost:3001/promotions/123/favorite
```

### DELETE /promotions/:id/favorite  
Remove from favorites.

```bash
curl -X DELETE http://localhost:3001/promotions/123/favorite
```

### GET /promotions/favorites
Get user's favorites.

```bash
curl http://localhost:3001/promotions/favorites
```

## Response Format
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... }
}
```

## Data Structure
```typescript
interface Promotion {
  id: string;
  title: string;
  merchant: string;
  rewardAmount: number;
  rewardCurrency: string;
  description: string;
  thumbnailUrl: string;
  expiresAt: Date;
  isFavorite: boolean;
  daysUntilExpiry?: number;
}
```

That's pretty much it. The API is straightforward CRUD operations.