/**
 * Cart reducer actions are kept in this file so the required cart behaviour is easy to review.
 */
export const initialCart = [];

export function addItem(cart, product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
  }
  return [...cart, { ...product, quantity: 1 }];
}

export function removeItem(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

export function updateQuantity(cart, productId, quantity) {
  if (quantity < 1) return removeItem(cart, productId);
  return cart.map((item) => item.id === productId ? { ...item, quantity } : item);
}

export function cartReducer(cart, action) {
  switch (action.type) {
    case 'cart/addItem': return addItem(cart, action.payload);
    case 'cart/removeItem': return removeItem(cart, action.payload);
    case 'cart/updateQuantity': return updateQuantity(cart, action.payload.id, action.payload.quantity);
    default: return cart;
  }
}
