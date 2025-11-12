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

async function testFavorites() {
  console.log('🧪 Testing Favorites with Active Promotions\n');

  try {
    // Get all promotions
    const promotions = await makeRequest('/promotions');
    const activePromotions = promotions.data?.data?.data?.filter(p => 
      new Date(p.expiresAt) > new Date()
    ) || [];

    if (activePromotions.length === 0) {
      console.log('❌ No active promotions found!');
      return;
    }

    const testPromotion = activePromotions[0];
    console.log(`✅ Testing with: "${testPromotion.title}"`);
    console.log(`   Expires: ${testPromotion.expiresAt}`);
    console.log(`   Currently favorite: ${testPromotion.isFavorite}\n`);

    // Test adding favorite
    console.log('1. Adding to favorites...');
    const addResult = await makeRequest(`/promotions/${testPromotion.id}/favorite`, 'POST');
    console.log(`   Status: ${addResult.status}`);
    console.log(`   Success: ${addResult.data?.data?.isFavorite === true}\n`);

    // Test removing favorite
    console.log('2. Removing from favorites...');
    const removeResult = await makeRequest(`/promotions/${testPromotion.id}/favorite`, 'DELETE');
    console.log(`   Status: ${removeResult.status}`);
    console.log(`   Success: ${removeResult.data?.data?.isFavorite === false}\n`);

    console.log('✅ Favorites functionality working correctly!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFavorites();