import { useReducer, useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import { cartReducer, initialCart } from './store/CartSlice';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addToCart = (product) => { dispatch({ type: 'cart/addItem', payload: product }); setCartOpen(true); };

  return (
    <main>
      <header className="nav"><a className="brand" href="#top">PARADISE <span>NURSERY</span></a><nav><a href="#shop">Shop</a><a href="#about">About</a><button className="cart-toggle" onClick={() => setCartOpen(true)}>Cart <span>{itemCount}</span></button></nav></header>
      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">Houseplants, thoughtfully grown</p><h1>Bring a little wildness <em>home.</em></h1><p className="hero-text">Easy-care plants and honest guidance for brighter rooms.</p><a className="primary-button" href="#shop">Get started</a></div>
        <img className="hero-image" src="/hero-plants.png" alt="Monstera and pothos plants in a sunlit room" />
      </section>
      <AboutUs />
      <ProductList onAddToCart={addToCart} />
      <footer>Paradise Nursery <span>Plants for ordinary days.</span></footer>
      {cartOpen && <aside className="cart-panel" aria-label="Shopping cart"><div className="cart-heading"><div><p className="eyebrow">Your selections</p><h2>Shopping cart</h2></div><button className="close" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
        {cart.length ? <><div className="cart-list">{cart.map((item) => <CartItem key={item.id} item={item} onUpdateQuantity={(id, quantity) => dispatch({ type: 'cart/updateQuantity', payload: { id, quantity } })} onRemove={(id) => dispatch({ type: 'cart/removeItem', payload: id })} />)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><button className="primary-button checkout" onClick={() => alert('Thank you. Your order is ready for checkout.')}>Checkout</button></div></> : <div className="cart-empty"><h3>Your cart is waiting.</h3><p>Add a plant you love and it will appear here.</p><button className="filter active" onClick={() => setCartOpen(false)}>Continue shopping</button></div>}
      </aside>}
      {cartOpen && <button className="scrim" aria-label="Close shopping cart" onClick={() => setCartOpen(false)} />}
    </main>
  );
}
