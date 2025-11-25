import { render, screen } from '@testing-library/react';
import PromotionCard from '../PromotionCard';

const mockPromotion = {
  id: '1',
  title: 'Test Promotion',
  merchant: 'Test Merchant',
  rewardAmount: 10,
  rewardCurrency: 'USD',
  description: 'Test description',
  thumbnailUrl: 'test.jpg',
  expiresAt: '2025-12-31',
  isFavorite: false,
  daysUntilExpiry: 30,
};

describe('PromotionCard', () => {
  it('renders promotion information', () => {
    render(<PromotionCard promotion={mockPromotion} />);
    
    expect(screen.getByText('Test Promotion')).toBeInTheDocument();
    expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('10 USD')).toBeInTheDocument();
  });
});