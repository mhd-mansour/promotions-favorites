import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from './favorites.service';
import { Favorite, Promotion, AuditEvent } from '../entities';
import { HttpException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let favoriteRepo: Repository<Favorite>;
  let promotionRepo: Repository<Promotion>;
  let auditRepo: Repository<AuditEvent>;

  const mockPromotion = {
    id: 'promo-1',
    title: 'Test Promo',
    merchant: 'Test Merchant',
    expiresAt: new Date('2025-12-31'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Promotion),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AuditEvent),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoriteRepo = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
    promotionRepo = module.get<Repository<Promotion>>(getRepositoryToken(Promotion));
    auditRepo = module.get<Repository<AuditEvent>>(getRepositoryToken(AuditEvent));
  });

  describe('addFavorite', () => {
    it('should add favorite successfully', async () => {
      jest.spyOn(promotionRepo, 'findOne').mockResolvedValue(mockPromotion as Promotion);
      jest.spyOn(favoriteRepo, 'findOne').mockResolvedValue(null);
      jest.spyOn(favoriteRepo, 'create').mockReturnValue({} as Favorite);
      jest.spyOn(favoriteRepo, 'save').mockResolvedValue({} as Favorite);
      jest.spyOn(auditRepo, 'create').mockReturnValue({} as AuditEvent);
      jest.spyOn(auditRepo, 'save').mockResolvedValue({} as AuditEvent);

      const result = await service.addFavorite('promo-1', 'user-1');
      expect(result).toBeDefined();
    });

    it('should throw error for expired promotion', async () => {
      const expiredPromo = { ...mockPromotion, expiresAt: new Date('2020-01-01') };
      jest.spyOn(promotionRepo, 'findOne').mockResolvedValue(expiredPromo as Promotion);

      await expect(service.addFavorite('promo-1', 'user-1')).rejects.toThrow(HttpException);
    });
  });
});