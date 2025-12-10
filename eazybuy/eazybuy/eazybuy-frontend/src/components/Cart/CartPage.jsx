import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

function CartPage() {
  const { cart, updateCartItem, removeFromCart, loading } = useCart();

  if (loading) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link 
          to="/" 
          className="inline-block bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => (
            <div key={item.id} className="bg-white/70 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-white/40">
              <div className="w-24 h-24 bg-white/50 rounded-xl flex items-center justify-center shrink-0 border border-white/30">
                {item.product.image ? (
                  <img src={item.product.image} alt={item.product.name} className="w-16 object-contain" />
                ) : (
                  <span className="text-2xl">📦</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">${item.product.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    🗑️
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-brand-orange">${item.total.toFixed(2)}</span>
                  <div className="flex items-center bg-gray-50/50 rounded-lg p-1 border border-white/30">
                    <button 
                      onClick={() => updateCartItem(item.product.id, Math.max(1, item.quantity - 1))}
                      className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center text-xs hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-brand-orange text-white shadow-sm flex items-center justify-center text-xs hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-glass border border-white/50 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200/50 pt-3 flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-brand-orange text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition mb-3">
              Proceed to Checkout
            </button>
            <Link 
              to="/"
              className="block text-center w-full bg-white/50 text-gray-700 py-3 rounded-xl font-semibold hover:bg-white transition border border-white/40"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
