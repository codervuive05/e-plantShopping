import { useMemo, useState } from 'react';
import { products } from '../data/products';

const categories = ['All plants', ...new Set(products.map((product) => product.category))];

export default function ProductList({ onAddToCart }) {
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
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-copy">
                <div><p className="product-category">{product.category}</p><h3>{product.name}</h3><p>{product.note}</p></div>
                <div className="product-footer"><strong>${product.price}</strong><button onClick={() => onAddToCart(product)}>Add to cart</button></div>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="empty">No plants match that search. Try another name or category.</p>}
    </section>
  );
}
