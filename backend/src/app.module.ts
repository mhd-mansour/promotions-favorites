import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Promotion, Favorite, AuditEvent } from './entities';
import { PromotionsController } from './controllers/promotions.controller';
import { FavoritesController } from './controllers/favorites.controller';
import { PromotionsService } from './services/promotions.service';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'promotions.db',
      entities: [Promotion, Favorite, AuditEvent],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Promotion, Favorite, AuditEvent]),
  ],
  controllers: [AppController, PromotionsController, FavoritesController],
  providers: [AppService, PromotionsService, FavoritesService],
})
export class AppModule {}
