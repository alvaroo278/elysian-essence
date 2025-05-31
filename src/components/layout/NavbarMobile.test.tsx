import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavbarMobile } from './NavbarMobile';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext';
import { CartContext, CartContextType } from '@/contexts/CartContext';
import { User } from '@/lib/types'; // Required for AuthContextType

// Default mock values
const mockAuthContextValue: AuthContextType = {
  user: null,
  loading: false,
  login: jest.fn(),
  logout: jest.fn(),
  isAdmin: false,
};

const mockCartContextValue: CartContextType = {
  items: [],
  addItem: jest.fn(),
  removeItem: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  totalItems: 0,
  totalPrice: 0,
};

describe('NavbarMobile', () => {
  it('should match snapshot when user is logged out and cart is empty', () => {
    const { asFragment } = render(
      <Router>
        <AuthContext.Provider value={mockAuthContextValue}>
          <CartContext.Provider value={mockCartContextValue}>
            <NavbarMobile />
          </CartContext.Provider>
        </AuthContext.Provider>
      </Router>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(asFragment()).toMatchSnapshot();
  });
});
