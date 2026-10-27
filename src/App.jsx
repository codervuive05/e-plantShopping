import { useEffect, useReducer, useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList, { Navbar } from './components/ProductList';
import CartItem from './components/CartItem';
import { cartReducer, initialCart } from './store/CartSlice';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const [showProductList, setShowProductList] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const addToCart = (product) => {
    dispatch({ type: 'cart/addItem', payload: product });
    setAddedToCart((current) => ({ ...current, [product.name]: true }));
  };
  const handleCheckout = () => alert('Coming Soon');
  useEffect(() => {
    if (showProductList) document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }, [showProductList]);

  return (
    <main>
      <Navbar cart={cart} onOpenCart={() => setCartOpen(true)} onShowPlants={() => setShowProductList(true)} />
      <section className="hero background-image" id="top">
        <div className="hero-copy"><p className="eyebrow">Houseplants, thoughtfully grown</p><h1>Welcome to Paradise Nursery</h1><p className="hero-text">Easy-care plants and honest guidance for brighter rooms.</p><button className="primary-button" onClick={() => setShowProductList(true)}>Get Started</button></div>
      </section>
      <AboutUs />
      {showProductList && <ProductList onAddToCart={addToCart} addedToCart={addedToCart} />}
      {!showProductList && <button className="sr-only" onClick={() => setShowProductList(true)}>Show plant list</button>}
      <footer>Paradise Nursery <span>Plants for ordinary days.</span></footer>
      {cartOpen && <aside className="cart-panel" aria-label="Shopping cart"><div className="cart-heading"><div><p className="eyebrow">Your selections</p><h2>Shopping cart</h2></div><button className="close" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
        {cart.length ? <CartItem cart={cart} dispatch={dispatch} onCheckout={handleCheckout} onContinueShopping={() => { setCartOpen(false); setShowProductList(true); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }} /> : <div className="cart-empty"><h3>Your cart is waiting.</h3><p>Add a plant you love and it will appear here.</p><button className="filter active" onClick={() => setCartOpen(false)}>Continue Shopping</button></div>}
      </aside>}
      {cartOpen && <button className="scrim" aria-label="Close shopping cart" onClick={() => setCartOpen(false)} />}
    </main>
  );
}
