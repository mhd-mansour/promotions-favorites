import { DataSource } from 'typeorm';
import { Promotion, Favorite, AuditEvent } from './entities';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'promotions.db',
  entities: [Promotion, Favorite, AuditEvent],
  synchronize: true,
});

const seedPromotions = [
  {
    title: '50% Off Electronics',
    titleAr: 'خصم 50% على الإلكترونيات',
    merchant: 'TechMart',
    merchantAr: 'تك مارت',
    rewardAmount: 25.00,
    rewardCurrency: 'USD',
    description: 'Get 50% off on all electronics including smartphones, laptops, and accessories.',
    descriptionAr: 'احصل على خصم 50% على جميع الإلكترونيات بما في ذلك الهواتف الذكية والحاسوب المحمول والإكسسوارات.',
    terms: 'Valid until end of month. Cannot be combined with other offers.',
    termsAr: 'صالح حتى نهاية الشهر. لا يمكن دمجه مع عروض أخرى.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzYjgyZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZDRlZDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVsZWN0cm9uaWNzPC90ZXh0Pjwvc3ZnPg==',
    expiresAt: new Date('2025-12-31'),
  },
  {
    title: 'Buy 2 Get 1 Free Coffee',
    titleAr: 'اشتري 2 واحصل على 1 مجاناً - قهوة',
    merchant: 'CoffeePlus',
    merchantAr: 'كوفي بلس',
    rewardAmount: 5.99,
    rewardCurrency: 'USD',
    description: 'Purchase any two coffee drinks and get the third one absolutely free.',
    descriptionAr: 'اشتري أي مشروبين من القهوة واحصل على الثالث مجاناً تماماً.',
    terms: 'Valid on all coffee sizes. Dine-in only.',
    termsAr: 'صالح على جميع أحجام القهوة. للتناول في المطعم فقط.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNTk3MzEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYTU4MGMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvZmZlZTwvdGV4dD48L3N2Zz4=',
    expiresAt: new Date('2025-11-30'),
  },
  {
    title: '30% Cashback on Groceries',
    titleAr: 'استرداد نقدي 30% على البقالة',
    merchant: 'FreshMart',
    merchantAr: 'فريش مارت',
    rewardAmount: 15.00,
    rewardCurrency: 'USD',
    description: 'Earn 30% cashback on your grocery shopping up to $50.',
    descriptionAr: 'احصل على استرداد نقدي 30% على مشترياتك من البقالة حتى 50 دولار.',
    terms: 'Minimum purchase $50. Valid on fresh produce only.',
    termsAr: 'حد أدنى للشراء 50 دولار. صالح على المنتجات الطازجة فقط.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MWY2NmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxMGI5ODEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyb2NlcmllczwvdGV4dD48L3N2Zz4=',
    expiresAt: new Date('2025-12-15'),
  },
  {
    title: 'Free Delivery on Orders',
    titleAr: 'توصيل مجاني للطلبات',
    merchant: 'QuickEats',
    merchantAr: 'كويك إيتس',
    rewardAmount: 3.99,
    rewardCurrency: 'USD',
    description: 'Free delivery on all food orders above $20.',
    descriptionAr: 'توصيل مجاني على جميع طلبات الطعام أكثر من 20 دولار.',
    terms: 'Valid for first-time users only. Limited time offer.',
    termsAr: 'صالح للمستخدمين الجدد فقط. عرض لفترة محدودة.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNDY4NjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlZjQ0NDQiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvb2Q8L3RleHQ+PC9zdmc+',
    expiresAt: new Date('2025-11-20'),
  },
  {
    title: '20% Off Fashion Items',
    titleAr: 'خصم 20% على الأزياء',
    merchant: 'StyleHub',
    merchantAr: 'ستايل هب',
    rewardAmount: 12.50,
    rewardCurrency: 'USD',
    description: 'Get 20% discount on all fashion clothing and accessories.',
    descriptionAr: 'احصل على خصم 20% على جميع الملابس والإكسسوارات.',
    terms: 'Valid on regular priced items only. Excludes sale items.',
    termsAr: 'صالح على العناصر بالسعر العادي فقط. لا يشمل عناصر التخفيض.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmY0MmMxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZhc2hpb248L3RleHQ+PC9zdmc+',
    expiresAt: new Date('2025-01-15'),
  },
  {
    title: 'Double Points Weekend',
    titleAr: 'نقاط مضاعفة في نهاية الأسبوع',
    merchant: 'GameZone',
    merchantAr: 'جيم زون',
    rewardAmount: 10.00,
    rewardCurrency: 'USD',
    description: 'Earn double reward points on all gaming purchases this weekend.',
    descriptionAr: 'احصل على نقاط مكافآت مضاعفة على جميع مشتريات الألعاب في نهاية الأسبوع.',
    terms: 'Valid Saturday and Sunday only. Points expire in 6 months.',
    termsAr: 'صالح يومي السبت والأحد فقط. النقاط تنتهي خلال 6 أشهر.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTdhMmI4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdhbWluZzwvdGV4dD48L3N2Zz4=',
    expiresAt: new Date('2025-11-17'),
  },
  {
    title: '€15 Off Travel Bookings',
    titleAr: 'خصم 15 يورو على حجوزات السفر',
    merchant: 'TravelDeals',
    merchantAr: 'ترافل ديلز',
    rewardAmount: 15.00,
    rewardCurrency: 'EUR',
    description: 'Save €15 on your next travel booking for flights or hotels.',
    descriptionAr: 'وفر 15 يورو على حجز السفر التالي للطيران أو الفنادق.',
    terms: 'Minimum booking value €100. Valid for new bookings only.',
    termsAr: 'قيمة الحجز الأدنى 100 يورو. صالح للحجوزات الجديدة فقط.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmQ3ZTE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRyYXZlbDwvdGV4dD48L3N2Zz4=',
    expiresAt: new Date('2025-03-01'),
  },
  {
    title: 'Free Gym Trial Week',
    titleAr: 'أسبوع تجريبي مجاني في الجيم',
    merchant: 'FitLife',
    merchantAr: 'فيت لايف',
    rewardAmount: 25.00,
    rewardCurrency: 'USD',
    description: 'Get a free one-week trial membership to our premium gym facilities.',
    descriptionAr: 'احصل على عضوية تجريبية مجانية لمدة أسبوع في مرافق الجيم المميزة.',
    terms: 'Valid for new members only. Must provide valid ID.',
    termsAr: 'صالح للأعضاء الجدد فقط. يجب تقديم هوية صالحة.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjBjOTk3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZpdG5lc3M8L3RleHQ+PC9zdmc+',
    expiresAt: new Date('2025-12-31'),
  },
  {
    title: '£10 Cashback on Books',
    titleAr: 'استرداد نقدي 10 جنيه على الكتب',
    merchant: 'BookWorld',
    merchantAr: 'بوك وورلد',
    rewardAmount: 10.00,
    rewardCurrency: 'GBP',
    description: 'Earn £10 cashback when you spend £50 or more on books.',
    descriptionAr: 'احصل على استرداد نقدي 10 جنيه عند إنفاق 50 جنيه أو أكثر على الكتب.',
    terms: 'Valid on physical books only. Excludes digital purchases.',
    termsAr: 'صالح على الكتب المطبوعة فقط. لا يشمل المشتريات الرقمية.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjYxMGYyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJvb2tzPC90ZXh0Pjwvc3ZnPg==',
    expiresAt: new Date('2025-11-25'),
  },
  {
    title: 'EXPIRED: 40% Off Pizza',
    titleAr: 'منتهي الصلاحية: خصم 40% على البيتزا',
    merchant: 'PizzaCorner',
    merchantAr: 'بيتزا كورنر',
    rewardAmount: 8.00,
    rewardCurrency: 'USD',
    description: 'Get 40% off on all pizza orders. Large selection available.',
    descriptionAr: 'احصل على خصم 40% على جميع طلبات البيتزا. تشكيلة كبيرة متاحة.',
    terms: 'Valid for pickup orders only. Cannot combine with other offers.',
    termsAr: 'صالح لطلبات الاستلام فقط. لا يمكن دمجه مع عروض أخرى.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTgzZThjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBpenphPC90ZXh0Pjwvc3ZnPg==',
    expiresAt: new Date('2024-10-31'),
  },
  {
    title: '25% Off Home Decor',
    titleAr: 'خصم 25% على ديكور المنزل',
    merchant: 'HomeStyle',
    merchantAr: 'هوم ستايل',
    rewardAmount: 18.75,
    rewardCurrency: 'USD',
    description: 'Transform your home with 25% off on all home decor items.',
    descriptionAr: 'حول منزلك مع خصم 25% على جميع عناصر ديكور المنزل.',
    terms: 'Valid on furniture, lighting, and accessories. Free shipping included.',
    termsAr: 'صالح على الأثاث والإضاءة والإكسسوارات. الشحن المجاني مشمول.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTk4NzU0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvbWU8L3RleHQ+PC9zdmc+',
    expiresAt: new Date('2025-02-14'),
  },
  {
    title: 'EXPIRED: Student Discount',
    titleAr: 'منتهي الصلاحية: خصم الطلاب',
    merchant: 'EduSupplies',
    merchantAr: 'إيدو سبلايز',
    rewardAmount: 7.50,
    rewardCurrency: 'USD',
    description: 'Special student discount on educational supplies and materials.',
    descriptionAr: 'خصم خاص للطلاب على اللوازم والمواد التعليمية.',
    terms: 'Valid student ID required. Cannot be used with other promotions.',
    termsAr: 'مطلوب هوية طالب صالحة. لا يمكن استخدامه مع عروض أخرى.',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGQ2ZWZkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVkdWNhdGlvbjwvdGV4dD48L3N2Zz4=',
    expiresAt: new Date('2024-09-30'),
  }
];

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const promotionRepository = AppDataSource.getRepository(Promotion);
    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const auditRepository = AppDataSource.getRepository(AuditEvent);
    
    // Clear existing data in correct order (child tables first)
    await auditRepository.clear();
    await favoriteRepository.clear();
    await promotionRepository.clear();
    console.log('Cleared existing data');

    // Insert seed data
    const promotions = promotionRepository.create(seedPromotions);
    await promotionRepository.save(promotions);
    
    console.log(`✅ Seeded ${promotions.length} promotions successfully`);
    
    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();