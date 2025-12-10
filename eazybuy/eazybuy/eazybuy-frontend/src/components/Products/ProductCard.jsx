import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card relative group cursor-pointer">
      <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition z-10 backdrop-blur-sm">
        ❤️
      </button>

      <div className="h-40 flex items-center justify-center mb-4 bg-white/50 rounded-xl overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain transform group-hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-4xl">📦</span>
        )}
      </div>

      <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-3">Electronics</p>

      <div className="flex items-center justify-between">
        <span className="font-bold text-lg text-brand-orange">${product.price}</span>
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center text-white hover:bg-brand-orange transition disabled:opacity-50"
        >
          {isAdding ? '⏳' : '+'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
