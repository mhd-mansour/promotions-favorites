const http = require('http');

async function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path,
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function debugFavorites() {
  console.log('🔍 Debug Favorites Flow\n');

  try {
    // 1. Get active promotions
    console.log('1. Getting active promotions...');
    const promotions = await makeRequest('/promotions');
    const activePromotions = promotions.data?.data?.data?.filter(p => 
      new Date(p.expiresAt) > new Date()
    ) || [];
    
    console.log(`   Found ${activePromotions.length} active promotions`);
    if (activePromotions.length === 0) {
      console.log('❌ No active promotions to test with!');
      return;
    }

    const testPromotion = activePromotions[0];
    console.log(`   Testing with: "${testPromotion.title}"`);
    console.log(`   ID: ${testPromotion.id}`);
    console.log(`   Currently favorite: ${testPromotion.isFavorite}\n`);

    // 2. Add to favorites
    console.log('2. Adding to favorites...');
    const addResult = await makeRequest(`/promotions/${testPromotion.id}/favorite`, 'POST');
    console.log(`   Status: ${addResult.status}`);
    console.log(`   Response:`, JSON.stringify(addResult.data, null, 2));
    console.log();

    // 3. Check favorites list immediately
    console.log('3. Checking favorites list...');
    const favoritesResult = await makeRequest('/promotions/favorites');
    console.log(`   Status: ${favoritesResult.status}`);
    console.log(`   Favorites count: ${favoritesResult.data?.data?.data?.length || 0}`);
    console.log(`   Response:`, JSON.stringify(favoritesResult.data, null, 2));
    console.log();

    // 4. Check if promotion shows as favorite in main list
    console.log('4. Checking main promotions list...');
    const updatedPromotions = await makeRequest('/promotions');
    const updatedPromotion = updatedPromotions.data?.data?.data?.find(p => p.id === testPromotion.id);
    console.log(`   Promotion isFavorite: ${updatedPromotion?.isFavorite}`);

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugFavorites();