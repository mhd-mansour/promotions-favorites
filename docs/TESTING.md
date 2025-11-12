# Testing Documentation

Comprehensive testing guide for the Promotions Favorites application.

## 🧪 Test Coverage

### Backend Tests

**Unit Tests:**
- Entity validation and relationships
- Service business logic
- Controller request/response handling
- DTO validation and transformation

**Integration Tests:**
- Database operations with TypeORM
- API endpoint functionality
- Authentication guard behavior
- Error handling scenarios

**E2E Tests:**
- Complete user workflows
- API contract validation
- Database state verification

### Frontend Tests

**Component Tests:**
- PromotionCard rendering and interactions
- SearchBar filtering and debouncing
- FavoriteToggle optimistic updates
- Toast notifications and error states

**Hook Tests:**
- usePromotions data fetching
- useFavorites mutation handling
- useDebounce timing behavior

**Integration Tests:**
- Page routing and navigation
- API integration with React Query
- Error boundary functionality
- Accessibility compliance

## 🚀 Running Tests

### Backend Testing

```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Frontend Testing

```bash
cd frontend

# Component tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Type checking
npm run type-check
```

### Full Test Suite

```bash
# From root directory
npm run test:all
```

## 📋 Manual Testing Checklist

### Core User Flows

#### 1. Browse Promotions Flow
- [ ] Load promotions page
- [ ] Verify 12 promotions display in grid
- [ ] Check responsive layout (360px, 768px, 1024px+)
- [ ] Verify promotion cards show all required information
- [ ] Test loading skeleton during API calls
- [ ] Verify error handling for failed API calls

#### 2. Search and Filter Flow
- [ ] Enter search term in search bar
- [ ] Verify debounced search (300ms delay)
- [ ] Test merchant filter dropdown
- [ ] Test expiry date filter
- [ ] Verify "Clear Filters" functionality
- [ ] Test empty state when no results found
- [ ] Verify URL parameters update with filters

#### 3. Favorites Management Flow
- [ ] Click heart icon to add favorite
- [ ] Verify optimistic UI update (heart fills immediately)
- [ ] Check toast notification appears
- [ ] Navigate to favorites page
- [ ] Verify promotion appears in favorites list
- [ ] Click heart icon to remove favorite
- [ ] Verify optimistic UI update (heart empties)
- [ ] Check toast notification for removal
- [ ] Verify promotion removed from favorites list

#### 4. Favorites Page Flow
- [ ] Navigate to favorites page
- [ ] Verify statistics header displays correctly
- [ ] Test "Active" and "Expired" tabs
- [ ] Verify correct promotions show in each tab
- [ ] Test empty state when no favorites
- [ ] Verify "Browse Promotions" button works

#### 5. Language Switching Flow
- [ ] Click language switcher in header
- [ ] Verify UI switches to Arabic
- [ ] Check RTL layout (text alignment, grid direction)
- [ ] Verify Arabic translations display
- [ ] Test all functionality in Arabic mode
- [ ] Switch back to English
- [ ] Verify LTR layout restored

### Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test Enter key on buttons and links
- [ ] Test Space key on buttons
- [ ] Verify skip links work
- [ ] Test escape key closes modals/dropdowns

#### Screen Reader Testing
- [ ] Test with NVDA/JAWS/VoiceOver
- [ ] Verify all images have alt text
- [ ] Check ARIA labels are announced
- [ ] Test live regions for dynamic content
- [ ] Verify form labels are associated
- [ ] Check heading hierarchy is logical

#### Color and Contrast
- [ ] Verify 4.5:1 contrast ratio minimum
- [ ] Test with high contrast mode
- [ ] Verify color is not the only indicator
- [ ] Test with color blindness simulation

### Mobile Testing

#### Responsive Design
- [ ] Test at 360px width (minimum)
- [ ] Verify touch targets ≥44px
- [ ] Check horizontal scrolling doesn't occur
- [ ] Test portrait and landscape orientations
- [ ] Verify text remains readable at all sizes

#### Touch Interactions
- [ ] Test tap gestures on all buttons
- [ ] Verify swipe gestures work (if implemented)
- [ ] Test form input with virtual keyboard
- [ ] Check for accidental touch activation
- [ ] Verify hover states work on touch devices

### Performance Testing

#### Load Times
- [ ] Measure initial page load time
- [ ] Test API response times
- [ ] Verify image loading performance
- [ ] Check bundle size optimization

#### User Experience
- [ ] Test with slow 3G connection
- [ ] Verify loading states are appropriate
- [ ] Check for layout shift during loading
- [ ] Test offline behavior (if implemented)

## 🔧 Test Configuration

### Jest Configuration (Backend)

```javascript
// jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
```

### React Testing Library (Frontend)

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

## 🌐 Browser Compatibility

### Supported Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | 90+ | ✅ Fully Supported |

### Testing Matrix

#### Desktop Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile Testing
- [ ] iOS Safari (iPhone)
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Feature Support

#### CSS Features
- [ ] CSS Grid Layout
- [ ] Flexbox
- [ ] CSS Custom Properties
- [ ] CSS Transforms
- [ ] CSS Animations

#### JavaScript Features
- [ ] ES2020 features
- [ ] Async/Await
- [ ] Fetch API
- [ ] IntersectionObserver
- [ ] ResizeObserver

## 🚨 Error Scenarios

### API Error Testing

#### Network Errors
- [ ] Test with network disconnected
- [ ] Simulate timeout errors
- [ ] Test with slow network (3G)
- [ ] Verify error messages are user-friendly

#### Server Errors
- [ ] Test 404 responses
- [ ] Test 500 server errors
- [ ] Test malformed JSON responses
- [ ] Verify error boundaries catch errors

#### Validation Errors
- [ ] Test invalid search parameters
- [ ] Test expired promotion favoriting
- [ ] Test non-existent promotion access
- [ ] Verify validation error messages

### Frontend Error Testing

#### Component Errors
- [ ] Test with missing props
- [ ] Test with invalid data types
- [ ] Simulate component crashes
- [ ] Verify error boundaries work

#### State Management Errors
- [ ] Test optimistic update failures
- [ ] Test cache invalidation
- [ ] Test concurrent mutations
- [ ] Verify rollback mechanisms

## 📊 Performance Benchmarks

### Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| First Input Delay | < 100ms | TBD |
| Time to Interactive | < 3.5s | TBD |

### API Performance

| Endpoint | Target Response Time | Current |
|----------|---------------------|---------|
| GET /promotions | < 200ms | TBD |
| POST /promotions/:id/favorite | < 100ms | TBD |
| GET /promotions/favorites | < 200ms | TBD |

## 🔍 Debugging

### Common Issues

#### Backend Debugging
```bash
# Enable debug logging
DEBUG=* npm run start:dev

# Database query logging
# Set logging: true in TypeORM config
```

#### Frontend Debugging
```bash
# React Query DevTools
# Automatically enabled in development

# Network debugging
# Use browser DevTools Network tab
```

### Test Debugging

#### Backend Test Debugging
```bash
# Debug specific test
npm run test:debug -- --testNamePattern="should create favorite"

# Debug with breakpoints
node --inspect-brk node_modules/.bin/jest --runInBand
```

#### Frontend Test Debugging
```bash
# Debug React components
npm run test -- --debug

# Visual debugging with testing-playground
screen.debug()
```

## 📝 Test Reports

### Coverage Reports

Generate and view coverage reports:

```bash
# Backend coverage
cd backend && npm run test:cov
open coverage/lcov-report/index.html

# Frontend coverage  
cd frontend && npm run test:coverage
open coverage/lcov-report/index.html
```

### Test Results

Example test output:
```
Test Suites: 15 passed, 15 total
Tests:       89 passed, 89 total
Snapshots:   0 total
Time:        12.345 s
Coverage:    85.2% statements, 78.9% branches, 92.1% functions, 84.7% lines
```

## 🎯 Quality Gates

### Minimum Requirements

- [ ] Test coverage > 80%
- [ ] All critical user flows pass
- [ ] No accessibility violations
- [ ] Performance metrics within targets
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness confirmed
- [ ] RTL layout working correctly

### Definition of Done

A feature is considered complete when:
- [ ] Unit tests written and passing
- [ ] Integration tests cover main scenarios
- [ ] Manual testing checklist completed
- [ ] Accessibility requirements met
- [ ] Performance impact assessed
- [ ] Documentation updated
- [ ] Code review completed