const http = require('http');

const baseUrl = 'http://localhost:3001';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing Promotions Favorites API\n');

  try {
    // Test 1: Get all promotions
    console.log('1. GET /promotions');
    const promotions = await makeRequest('/promotions');
    console.log(`   Status: ${promotions.status}`);
    console.log(`   Promotions count: ${promotions.data?.data?.data?.length || 0}\n`);

    // Test 2: Get promotions with search
    console.log('2. GET /promotions?q=coffee');
    const searchResults = await makeRequest('/promotions?q=coffee');
    console.log(`   Status: ${searchResults.status}`);
    console.log(`   Search results: ${searchResults.data?.data?.data?.length || 0}\n`);

    // Test 3: Get favorites (should be empty initially)
    console.log('3. GET /promotions/favorites');
    const favorites = await makeRequest('/promotions/favorites');
    console.log(`   Status: ${favorites.status}`);
    console.log(`   Favorites count: ${favorites.data?.data?.data?.length || 0}\n`);

    if (promotions.data?.data?.data?.length > 0) {
      const firstPromotion = promotions.data.data.data[0];
      
      // Test 4: Add favorite
      console.log(`4. POST /promotions/${firstPromotion.id}/favorite`);
      const addFavorite = await makeRequest(`/promotions/${firstPromotion.id}/favorite`, 'POST');
      console.log(`   Status: ${addFavorite.status}`);
      console.log(`   Is Favorite: ${addFavorite.data?.data?.isFavorite}\n`);

      // Test 5: Remove favorite
      console.log(`5. DELETE /promotions/${firstPromotion.id}/favorite`);
      const removeFavorite = await makeRequest(`/promotions/${firstPromotion.id}/favorite`, 'DELETE');
      console.log(`   Status: ${removeFavorite.status}`);
      console.log(`   Is Favorite: ${removeFavorite.data?.data?.isFavorite}\n`);
    }

    console.log('✅ API testing completed!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();