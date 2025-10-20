'use client'

import { useState, useMemo } from 'react'
import { Star, ShoppingCart, Plus, Minus, Filter, X, Bike } from 'lucide-react'
import { products, categories } from '@/lib/data'
import { useCart } from '@/hooks/useCart'
import { Category, Product } from '@/lib/types'

export default function BergBikesStore() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [showCart, setShowCart] = useState(false)
  const { cart, addToCart, removeFromCart, updateQuantity, getItemQuantity } = useCart()

  // Filtrar produtos por categoria
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                  <Bike className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Berg Bikes
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Sua aventura começa aqui</p>
                </div>
              </div>
            </div>
            
            {/* Carrinho */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1">
            {/* Título da Seção */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {categories.find(c => c.id === selectedCategory)?.name || 'Produtos'}
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredProducts.length} bike{filteredProducts.length !== 1 ? 's' : ''} encontrada{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Grade de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  cartQuantity={getItemQuantity(product.id)}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Carrinho Lateral */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header do Carrinho */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-600">
                <h3 className="text-xl font-semibold text-white">Meu Carrinho</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Itens do Carrinho */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
                    <p className="text-gray-400 text-sm mt-2">Adicione algumas bikes incríveis!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.product.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer do Carrinho */}
              {cart.items.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {formatPrice(cart.total)}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                    Finalizar Compra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente do Card do Produto
function ProductCard({ 
  product, 
  onAddToCart, 
  cartQuantity, 
  onUpdateQuantity 
}: { 
  product: Product
  onAddToCart: (product: Product) => void
  cartQuantity: number
  onUpdateQuantity: (productId: string, quantity: number) => void
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 overflow-hidden">
      {/* Imagem do Produto */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Fora de Estoque
            </span>
          </div>
        )}
        {product.inStock && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Disponível
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 h-12 overflow-hidden">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2 font-medium">({product.rating})</span>
        </div>

        {/* Preço */}
        <div className="mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Controles do Carrinho */}
        {cartQuantity === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              product.inStock
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-orange-50 rounded-xl p-2 border border-orange-200">
            <button
              onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
              className="p-2 bg-white rounded-lg hover:bg-orange-100 transition-colors shadow-sm border border-orange-200"
            >
              <Minus className="w-4 h-4 text-orange-600" />
            </button>
            <span className="font-bold text-lg px-4 text-orange-700">{cartQuantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
              className="p-2 bg-white rounded-lg hover:bg-orange-100 transition-colors shadow-sm border border-orange-200"
            >
              <Plus className="w-4 h-4 text-orange-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente do Item do Carrinho
function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: { product: Product; quantity: number }
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          {item.product.name}
        </h4>
        <p className="text-orange-600 text-sm font-medium">
          {formatPrice(item.product.price)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          className="p-1 bg-white rounded-lg hover:bg-orange-100 transition-colors shadow-sm border border-orange-200"
        >
          <Minus className="w-4 h-4 text-orange-600" />
        </button>
        <span className="font-semibold px-2 text-orange-700">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="p-1 bg-white rounded-lg hover:bg-orange-100 transition-colors shadow-sm border border-orange-200"
        >
          <Plus className="w-4 h-4 text-orange-600" />
        </button>
      </div>

      <button
        onClick={() => onRemove(item.product.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}