import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from '../services/promotions.service';
import { AuthGuard } from '../guards/auth.guard';

describe('PromotionsController', () => {
  let controller: PromotionsController;
  let service: PromotionsService;

  const mockPromotionsService = {
    findAll: jest.fn(),
  };

  const mockRequest = {
    user: { id: 'user-123', email: 'test@example.com' }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionsController],
      providers: [
        {
          provide: PromotionsService,
          useValue: mockPromotionsService,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<PromotionsController>(PromotionsController);
    service = module.get<PromotionsService>(PromotionsService);
  });

  describe('getPromotions', () => {
    it('should return promotions successfully', async () => {
      const mockResult = {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
      };

      mockPromotionsService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getPromotions(
        { page: 1, limit: 10 },
        mockRequest as any
      );

      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Promotions retrieved successfully');
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 }, 'user-123');
    });

    it('should handle service errors', async () => {
      mockPromotionsService.findAll.mockRejectedValue(new Error('Database error'));

      const result = await controller.getPromotions(
        { page: 1, limit: 10 },
        mockRequest as any
      );

      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Failed to retrieve promotions');
    });
  });
});