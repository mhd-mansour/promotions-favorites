import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionsService } from './promotions.service';
import { Promotion, Favorite } from '../entities';

describe('PromotionsService', () => {
  let service: PromotionsService;
  let promotionRepository: Repository<Promotion>;
  let favoriteRepository: Repository<Favorite>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionsService,
        {
          provide: getRepositoryToken(Promotion),
          useValue: {
            createQueryBuilder: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Favorite),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PromotionsService>(PromotionsService);
    promotionRepository = module.get<Repository<Promotion>>(getRepositoryToken(Promotion));
    favoriteRepository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find promotion by id', async () => {
    const mockPromotion = {
      id: '1',
      title: 'Test Promotion',
      merchant: 'Test Merchant',
      expiresAt: new Date('2025-12-31'),
    };

    jest.spyOn(promotionRepository, 'findOne').mockResolvedValue(mockPromotion as Promotion);
    jest.spyOn(favoriteRepository, 'find').mockResolvedValue([]);

    const result = await service.findById('1', 'user-123');
    
    expect(result).toBeDefined();
    expect(result?.title).toBe('Test Promotion');
    expect(result?.isFavorite).toBe(false);
  });
});