import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../../services/api';
import { useCart } from '../../hooks/useCart';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data);
    } catch (err) {
      console.error('Failed to load product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
      alert(`${quantity} item(s) added to cart!`);
      setQuantity(1);
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="text-brand-orange hover:underline mb-6 inline-block">← Back to Products</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-white/70 rounded-3xl p-8 backdrop-blur-lg">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          ) : (
            <span className="text-6xl">📦</span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <span className="text-brand-orange font-bold text-sm uppercase bg-orange-50 px-3 py-1 rounded-md w-fit mb-4">
            In Stock
          </span>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="text-sm font-bold text-gray-600">(0 reviews)</span>
          </div>

          <p className="text-3xl font-bold text-brand-orange mb-8">${product.price}</p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Premium quality product designed for excellence. Built with the finest materials to ensure durability and satisfaction.
          </p>

          {/* Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-600 hover:text-brand-orange"
              >
                −
              </button>
              <span className="mx-4 font-bold text-gray-800 text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-600 hover:text-brand-orange"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-brand-dark text-white rounded-xl font-bold py-3 hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
            >
              {isAdding ? '⏳ Adding...' : '🛒 Add to Cart'}
            </button>
          </div>

          {/* Product Details */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>SKU:</strong> {product.id}</li>
              <li><strong>Category:</strong> Electronics</li>
              <li><strong>Availability:</strong> In Stock</li>
              <li><strong>Shipping:</strong> Free worldwide shipping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
