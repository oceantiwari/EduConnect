import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, ShoppingCart, Package, Filter, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import CheckoutPage from './CheckoutPage';
import OrderSuccessPage from './OrderSuccessPage';

const SchoolStore: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState<'store' | 'checkout' | 'success'>('store');
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Items', count: 24 },
    { id: 'uniforms', label: 'Uniforms', count: 8 },
    { id: 'books', label: 'Books & Stationery', count: 10 },
    { id: 'bags', label: 'Bags & Accessories', count: 4 },
    { id: 'sports', label: 'Sports Items', count: 2 }
  ];

  const storeItems = [
    {
      id: '1',
      title: 'School Uniform Shirt (White)',
      description: 'Premium cotton school shirt with school logo',
      price: 450,
      category: 'uniforms',
      stock: 25,
      imageUrl: 'https://images.pexels.com/photos/8471919/pexels-photo-8471919.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Mathematics Textbook - Grade 5',
      description: 'NCERT Mathematics textbook for Grade 5 students',
      price: 280,
      category: 'books',
      stock: 40,
      imageUrl: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'School Backpack',
      description: 'Durable school backpack with multiple compartments',
      price: 1200,
      category: 'bags',
      stock: 15,
      imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Geometry Box Set',
      description: 'Complete geometry set with compass, protractor, and rulers',
      price: 150,
      category: 'books',
      stock: 30,
      imageUrl: 'https://images.pexels.com/photos/8500/balloons-party-design-balloon.jpg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'School Tie (Navy Blue)',
      description: 'Official school tie with school colors',
      price: 220,
      category: 'uniforms',
      stock: 20,
      imageUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Art Supplies Kit',
      description: 'Complete art kit with paints, brushes, and drawing materials',
      price: 650,
      category: 'books',
      stock: 12,
      imageUrl: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const orders = [
    { id: '1', items: ['School Uniform Shirt', 'Mathematics Textbook'], total: 730, status: 'PENDING', date: '2025-01-14' },
    { id: '2', items: ['School Backpack'], total: 1200, status: 'FULFILLED', date: '2025-01-10' }
  ];

  const filteredItems = storeItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = storeItems.find(i => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([itemId, quantity]) => {
      const item = storeItems.find(i => i.id === itemId);
      return item ? {
        id: item.id,
        title: item.title,
        price: item.price,
        quantity,
        imageUrl: item.imageUrl
      } : null;
    }).filter(Boolean) as Array<{
      id: string;
      title: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }>;
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    const orderId = 'ORD' + Date.now().toString().slice(-6);
    setCurrentOrderId(orderId);
    setCart({});
    setCurrentView('success');
  };

  const handleContinueShopping = () => {
    setCurrentView('store');
  };

  // Show checkout page
  if (currentView === 'checkout') {
    return (
      <CheckoutPage
        cartItems={getCartItems()}
        total={getCartTotal()}
        onBack={() => setCurrentView('store')}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  // Show success page
  if (currentView === 'success') {
    return (
      <OrderSuccessPage
        orderId={currentOrderId}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  if (user?.role === 'SCHOOL_ADMIN') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
              <p className="text-gray-600">Manage school store items and orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{storeItems.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹18,450</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Items Management */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Store Items</h3>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="all">All Categories</option>
                  <option value="uniforms">Uniforms</option>
                  <option value="books">Books & Stationery</option>
                  <option value="bags">Bags & Accessories</option>
                  <option value="sports">Sports Items</option>
                </select>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {storeItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.category} • Stock: {item.stock}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">Edit</button>
                  <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-xs text-gray-600">{order.items.join(', ')}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₹{order.total}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'FULFILLED' ? 'bg-emerald-100 text-emerald-800' :
                    order.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm">
                      View
                    </button>
                    {order.status === 'PENDING' && (
                      <button className="px-3 py-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors text-sm">
                        Fulfill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">School Store</h1>
            <p className="text-gray-600">Purchase school items and supplies</p>
          </div>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartItemsCount()}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                <span className="text-sm text-gray-600">Stock: {item.stock}</span>
              </div>
              <div className="flex items-center gap-2">
                {cart[item.id] ? (
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded font-medium">
                      {cart[item.id]}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cart).map(([itemId, quantity]) => {
                    const item = storeItems.find(i => i.id === itemId);
                    if (!item) return null;
                    return (
                      <div key={itemId} className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">₹{item.price} × {quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => addToCart(itemId)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {Object.keys(cart).length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">₹{getCartTotal()}</span>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* My Orders */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-xs text-gray-600">{order.items.join(', ')}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{order.total}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'FULFILLED' ? 'bg-emerald-100 text-emerald-800' :
                  order.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolStore;