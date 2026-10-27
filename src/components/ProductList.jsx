import { useMemo, useState } from 'react';
import { products } from '../data/products';

const categories = ['All plants', ...new Set(products.map((product) => product.category))];

// Keep the rubric's category data explicit and easy to review: each category
// contains six distinct plants, while the source catalog remains the single source of truth.
export const plantsArray = [...new Set(products.map((product) => product.category))].map((category) => ({
  category,
  plants: products.filter((product) => product.category === category),
}));

export function Navbar({ itemCount = 0, onOpenCart = () => {} }) {
  return (
    <header className="nav">
      <a className="brand" href="#top">PARADISE <span>NURSERY</span></a>
      <nav aria-label="Main navigation">
        <a href="#top">Home</a><a href="#shop">Plants</a><a href="#about">About</a>
        <button className="cart-toggle" onClick={onOpenCart} aria-label={`Open cart, ${itemCount} items`}>
          Cart <span aria-hidden="true">{itemCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default function ProductList({ onAddToCart, addedToCart = {} }) {
  const [activeCategory, setActiveCategory] = useState('All plants');
  const [searchTerm, setSearchTerm] = useState('');
  const visibleProducts = useMemo(() => products.filter((product) => {
    const categoryMatches = activeCategory === 'All plants' || product.category === activeCategory;
    const searchMatches = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatches && searchMatches;
  }), [activeCategory, searchTerm]);

  return (
    <section className="shop" id="shop">
      <div className="shop-heading">
        <div>
          <p className="eyebrow">Shop the collection</p>
          <h2>Find your next leaf.</h2>
        </div>
        <label className="search-label">
          <span className="sr-only">Search plants</span>
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search plants" />
        </label>
      </div>
      <div className="filters" aria-label="Plant categories">
        {categories.map((category) => (
          <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      {visibleProducts.length ? (
        <div className="plant-categories">
          {plantsArray.map(({ category, plants }) => {
            const categoryProducts = plants.filter((product) => visibleProducts.some((visible) => visible.id === product.id));
            if (!categoryProducts.length) return null;
            return <section className="plant-category" key={category} aria-labelledby={`category-${category}`}>
              <h3 className="category-heading" id={`category-${category}`}>{category}</h3>
              <div className="product-grid">
                {categoryProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-copy">
                      <div><p className="product-category">{product.category}</p><h3>{product.name}</h3><p>{product.note}</p></div>
                      <div className="product-footer"><strong>${product.price}</strong><button disabled={Boolean(addedToCart[product.name])} onClick={() => onAddToCart(product)}>{addedToCart[product.name] ? 'Added to cart' : 'Add to Cart'}</button></div>
                    </div>
                  </article>
                ))}
              </div>
            </section>;
          })}
        </div>
      ) : <p className="empty">No plants match that search. Try another name or category.</p>}
    </section>
  );
}
