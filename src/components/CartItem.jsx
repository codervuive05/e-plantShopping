// Calculates the complete cart amount from the current item prices and quantities.
export function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
}

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleIncrement = () => onUpdateQuantity(item.id, item.quantity + 1);
  const handleDecrement = () => onUpdateQuantity(item.id, item.quantity - 1);
  const handleRemove = () => onRemove(item.id);
  return (
    <article className="cart-item" data-cart-container>
      <img src={item.image} alt="" />
      <div className="cart-item-copy"><h3>{item.name}</h3><p>${item.price} each</p>
        <div className="quantity" aria-label={`Quantity for ${item.name}`}>
          <button aria-label={`Decrease ${item.name} quantity`} onClick={handleDecrement}>−</button>
          <span>{item.quantity}</span>
          <button aria-label={`Increase ${item.name} quantity`} onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div className="cart-item-total"><strong>${(item.price * item.quantity).toFixed(2)}</strong><button className="remove" onClick={handleRemove}>Delete</button></div>
    </article>
  );
}
