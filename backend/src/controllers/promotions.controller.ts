import { Controller, Get, Query, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { PromotionsService } from '../services/promotions.service';
import { AuthGuard } from '../guards/auth.guard';
import { PaginationQueryDto, ApiResponseDto } from '../dto';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

@Controller('promotions')
@UseGuards(AuthGuard)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async getPromotions(
    @Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const result = await this.promotionsService.findAll(query, req.user.id);
      return new ApiResponseDto(200, 'Promotions retrieved successfully', result);
    } catch (error) {
      return new ApiResponseDto(500, 'Failed to retrieve promotions', null, error.code);
    }
  }
}