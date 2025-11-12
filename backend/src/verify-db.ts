import { DataSource } from 'typeorm';
import { Promotion, Favorite, AuditEvent } from './entities';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'promotions.db',
  entities: [Promotion, Favorite, AuditEvent],
  synchronize: false,
});

async function verifyDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection successful');

    const promotionRepository = AppDataSource.getRepository(Promotion);
    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const auditRepository = AppDataSource.getRepository(AuditEvent);

    const promotionCount = await promotionRepository.count();
    const favoriteCount = await favoriteRepository.count();
    const auditCount = await auditRepository.count();

    console.log(`📊 Database Statistics:`);
    console.log(`   Promotions: ${promotionCount}`);
    console.log(`   Favorites: ${favoriteCount}`);
    console.log(`   Audit Events: ${auditCount}`);

    if (promotionCount > 0) {
      const samplePromotion = await promotionRepository.findOne({
        where: {},
        order: { createdAt: 'DESC' }
      });
      console.log(`📝 Sample Promotion: "${samplePromotion?.title}" by ${samplePromotion?.merchant}`);
    }

    await AppDataSource.destroy();
    console.log('✅ Database verification complete');
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    process.exit(1);
  }
}

verifyDatabase();