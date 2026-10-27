import { useReducer, useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList, { Navbar } from './components/ProductList';
import CartItem, { calculateCartTotal } from './components/CartItem';
import { cartReducer, initialCart } from './store/CartSlice';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = calculateCartTotal(cart);
  const addToCart = (product) => {
    dispatch({ type: 'cart/addItem', payload: product });
    setAddedToCart((current) => ({ ...current, [product.name]: true }));
  };
  const handleCheckout = () => alert('Coming Soon');

  return (
    <main>
      <Navbar itemCount={itemCount} onOpenCart={() => setCartOpen(true)} />
      <section className="hero background-image" id="top">
        <div className="hero-copy"><p className="eyebrow">Houseplants, thoughtfully grown</p><h1>Welcome to Paradise Nursery</h1><p className="hero-text">Easy-care plants and honest guidance for brighter rooms.</p><a className="primary-button" href="#shop">Get Started</a></div>
      </section>
      <AboutUs />
      <ProductList onAddToCart={addToCart} addedToCart={addedToCart} />
      <footer>Paradise Nursery <span>Plants for ordinary days.</span></footer>
      {cartOpen && <aside className="cart-panel" aria-label="Shopping cart"><div className="cart-heading"><div><p className="eyebrow">Your selections</p><h2>Shopping cart</h2></div><button className="close" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
        {cart.length ? <><div className="cart-list">{cart.map((item) => <CartItem key={item.id} item={item} onUpdateQuantity={(id, quantity) => dispatch({ type: 'cart/updateQuantity', payload: { id, quantity } })} onRemove={(id) => dispatch({ type: 'cart/removeItem', payload: id })} />)}</div><div className="cart-summary"><div><span>Total</span><strong>${total.toFixed(2)}</strong></div><button className="primary-button checkout" onClick={handleCheckout}>Checkout</button><button className="filter continue-shopping" onClick={() => setCartOpen(false)}>Continue Shopping</button></div></> : <div className="cart-empty"><h3>Your cart is waiting.</h3><p>Add a plant you love and it will appear here.</p><button className="filter active" onClick={() => setCartOpen(false)}>Continue Shopping</button></div>}
      </aside>}
      {cartOpen && <button className="scrim" aria-label="Close shopping cart" onClick={() => setCartOpen(false)} />}
    </main>
  );
}
