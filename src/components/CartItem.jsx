export function calculateCartTotal(cartItems = []) {
  return cartItems.reduce((total, cartItem) => total + (cartItem.cost ?? cartItem.price) * cartItem.quantity, 0);
}

export default function CartItem({ cart = [], item, dispatch, onUpdateQuantity, onRemove, onContinueShopping = () => {}, onCheckout = () => {} }) {
  const cartItems = cart.length ? cart : (item ? [item] : []);
  const handleIncrement = (cartItem) => dispatch ? dispatch({ type: 'cart/updateQuantity', payload: { id: cartItem.id, quantity: cartItem.quantity + 1 } }) : onUpdateQuantity?.(cartItem.id, cartItem.quantity + 1);
  const handleDecrement = (cartItem) => dispatch ? dispatch({ type: 'cart/updateQuantity', payload: { id: cartItem.id, quantity: cartItem.quantity - 1 } }) : onUpdateQuantity?.(cartItem.id, cartItem.quantity - 1);
  const handleRemove = (cartItem) => dispatch ? dispatch({ type: 'cart/removeItem', payload: cartItem.id }) : onRemove?.(cartItem.id);
  return (
    <>
      <div className="cart-container">
        {cartItems.map((cartItem) => <article className="cart-item" key={cartItem.id}>
          <img src={cartItem.image} alt={cartItem.name} />
          <div className="cart-item-copy"><h3>{cartItem.name}</h3><p>${cartItem.cost ?? cartItem.price} each</p>
            <div className="quantity" aria-label={`Quantity for ${cartItem.name}`}>
              <button aria-label={`Decrease ${cartItem.name} quantity`} onClick={() => handleDecrement(cartItem)}>−</button>
              <span>{cartItem.quantity}</span>
              <button aria-label={`Increase ${cartItem.name} quantity`} onClick={() => handleIncrement(cartItem)}>+</button>
            </div>
          </div>
          <div className="cart-item-total"><strong>${((cartItem.cost ?? cartItem.price) * cartItem.quantity).toFixed(2)}</strong><button className="remove-button remove" onClick={() => handleRemove(cartItem)}>Delete</button></div>
        </article>)}
      </div>
      {cartItems.length > 0 && <div className="cart-summary"><div><span>Total Cart Amount</span><strong>${calculateCartTotal(cartItems).toFixed(2)}</strong></div><button className="primary-button checkout" onClick={onCheckout}>Checkout</button><button className="filter continue-shopping" onClick={onContinueShopping}>Continue Shopping</button></div>}
    </>
  );
}
