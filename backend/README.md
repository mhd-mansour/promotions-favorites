# Backend - Promotions Favorites API

NestJS backend with TypeORM and SQLite for the Promotions Favorites application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Seed database
npm run seed

# Start development server
npm run start:dev
```

Server runs on `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # API route handlers
│   │   ├── promotions.controller.ts
│   │   └── favorites.controller.ts
│   ├── services/            # Business logic
│   │   ├── promotions.service.ts
│   │   └── favorites.service.ts
│   ├── entities/            # Database models
│   │   ├── promotion.entity.ts
│   │   ├── favorite.entity.ts
│   │   └── audit-event.entity.ts
│   ├── dto/                 # Data transfer objects
│   │   ├── pagination-query.dto.ts
│   │   ├── promotion-response.dto.ts
│   │   └── api-response.dto.ts
│   ├── guards/              # Authentication
│   │   └── auth.guard.ts
│   ├── app.module.ts        # Main application module
│   ├── main.ts             # Application entry point
│   ├── seed.ts             # Database seeding
│   └── verify-db.ts        # Database verification
├── test/                   # E2E tests
├── promotions.db          # SQLite database file
└── package.json
```

## 🛠️ Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debugging enabled
- `npm run build` - Build for production
- `npm run seed` - Seed database with test data
- `npm run verify-db` - Check database status
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## 🗄️ Database

### Configuration

The application uses SQLite for development with TypeORM:

```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'promotions.db',
  entities: [Promotion, Favorite, AuditEvent],
  synchronize: true,
  logging: true,
})
```

### Seeding

The database comes with 12 sample promotions:

```bash
npm run seed
```

This creates:
- Various merchants (TechMart, CoffeePlus, FreshMart, etc.)
- Different currencies (USD, EUR, GBP)
- Mix of active and expired promotions
- Realistic reward amounts and descriptions

### Verification

Check database status:

```bash
npm run verify-db
```

## 🔐 Authentication

Currently uses simulated authentication with a hard-coded user (`user-123`). The `AuthGuard` automatically injects this user into all requests.

**Production Implementation:**
```typescript
// Replace with JWT validation
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const user = this.jwtService.verify(token);
    request.user = user;
    return true;
  }
}
```

## 📡 API Endpoints

### Promotions
- `GET /promotions` - List with search/filters
- `POST /promotions/:id/favorite` - Add favorite
- `DELETE /promotions/:id/favorite` - Remove favorite
- `GET /promotions/favorites` - User favorites

See [API.md](../API.md) for complete documentation.

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Manual API Testing
```bash
node test-api.js
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=./promotions.db
```

### TypeORM Configuration

Database configuration in `app.module.ts`:
- **Development**: SQLite with synchronize enabled
- **Production**: PostgreSQL with migrations

## 📊 Performance

### Database Indexes
- `promotions.merchant` - Merchant filtering
- `promotions.expiresAt` - Expiry filtering  
- `favorites.userId` - User favorites lookup
- `favorites.promotionId` - Promotion favorites

### Query Optimization
- Pagination with LIMIT/OFFSET
- Selective field loading
- Efficient JOIN queries for favorites
- Proper WHERE clause indexing

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

### Environment Setup
- Use PostgreSQL instead of SQLite
- Enable proper authentication with JWT
- Configure CORS for production domains
- Set up proper logging and monitoring

## 🔍 Monitoring

### Logging
All requests logged with:
- HTTP method and URL
- Response status and timing
- Trace ID for correlation
- Error details and stack traces

### Health Check
```bash
curl http://localhost:3001/
```

### Database Status
```bash
npm run verify-db
```

## 🐛 Troubleshooting

### Common Issues

**SQLite Installation Failed:**
```bash
# Install build tools or use better-sqlite3
npm install better-sqlite3
```

**Port Already in Use:**
```bash
npx kill-port 3001
```

**Database Corruption:**
```bash
rm promotions.db
npm run seed
```

**TypeORM Sync Issues:**
```bash
# Reset database schema
rm promotions.db
npm run start:dev  # Will recreate tables
npm run seed
```

## 📈 Future Improvements

### Authentication
- JWT token validation
- Role-based access control
- OAuth integration
- Session management

### Database
- PostgreSQL for production
- Database migrations
- Connection pooling
- Read replicas for scaling

### Performance
- Redis caching layer
- Query result caching
- Database query optimization
- API response compression

### Monitoring
- Application metrics
- Error tracking (Sentry)
- Performance monitoring
- Health check endpoints

### Security
- Rate limiting
- Input sanitization
- SQL injection prevention
- CORS configuration
- Helmet.js security headers