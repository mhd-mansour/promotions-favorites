#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Promotions Favorites Setup...\n');

const checks = [
  { name: 'Root package.json', path: './package.json' },
  { name: 'Backend NestJS', path: './backend/package.json' },
  { name: 'Frontend Next.js', path: './frontend/package.json' },
  { name: 'Shared package', path: './shared/package.json' },
  { name: 'Shared types', path: './shared/src/types.ts' },
  { name: 'Shared schemas', path: './shared/src/schemas.ts' },
  { name: 'Technical notes', path: './docs/TECHNICAL_TEST_NOTES.md' },
  { name: 'Main README', path: './README.md' }
];

let allGood = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.path);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  if (!exists) allGood = false;
});

console.log('\n📦 Checking Dependencies...');

// Check backend dependencies
try {
  const backendPkg = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  const backendDeps = { ...backendPkg.dependencies, ...backendPkg.devDependencies };
  
  const requiredBackend = ['typeorm', 'class-validator', 'class-transformer', '@nestjs/typeorm'];
  requiredBackend.forEach(dep => {
    const status = backendDeps[dep] ? '✅' : '❌';
    console.log(`${status} Backend: ${dep}`);
    if (!backendDeps[dep]) allGood = false;
  });
} catch (e) {
  console.log('❌ Backend package.json read error');
  allGood = false;
}

// Check frontend dependencies
try {
  const frontendPkg = JSON.parse(fs.readFileSync('./frontend/package.json', 'utf8'));
  const frontendDeps = { ...frontendPkg.dependencies, ...frontendPkg.devDependencies };
  
  const requiredFrontend = ['@ionic/react', '@ionic/react-router', '@tanstack/react-query', 'next-i18next'];
  requiredFrontend.forEach(dep => {
    const status = frontendDeps[dep] ? '✅' : '❌';
    console.log(`${status} Frontend: ${dep}`);
    if (!frontendDeps[dep]) allGood = false;
  });
} catch (e) {
  console.log('❌ Frontend package.json read error');
  allGood = false;
}

// Check shared dependencies
try {
  const sharedPkg = JSON.parse(fs.readFileSync('./shared/package.json', 'utf8'));
  const sharedDeps = { ...sharedPkg.dependencies, ...sharedPkg.devDependencies };
  
  const requiredShared = ['typescript', 'zod'];
  requiredShared.forEach(dep => {
    const status = sharedDeps[dep] ? '✅' : '❌';
    console.log(`${status} Shared: ${dep}`);
    if (!sharedDeps[dep]) allGood = false;
  });
} catch (e) {
  console.log('❌ Shared package.json read error');
  allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 Setup Complete! Ready for implementation.');
  console.log('\nNext steps:');
  console.log('1. npm run dev:backend (port 3001)');
  console.log('2. npm run dev:frontend (port 3000)');
  console.log('3. Start implementing the features!');
} else {
  console.log('⚠️  Setup incomplete. Please fix the issues above.');
}
console.log('='.repeat(50));