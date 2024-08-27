import React, { useContext, useEffect } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
    let { cart, upadataProductCart, loading, deleteProductToCart, clearCart, getCart } = useContext(CartContext);

    useEffect(() => {
        getCart();
    }, [])
    let handleClearCart = async () => {
        await clearCart();
        getCart();
    };

    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center text-main mb-6">Cart Shop</h1>

            {loading ? (
                <div className="flex justify-center">
                    <Loading />
                </div>
            ) : cart && cart.data && cart.data.products.length > 0 ? (
                <div className="w-full max-w-5xl mx-auto">
                    <Link to="/checkout" className="text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white flex justify-center my-4">
                        Check Out
                    </Link>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold"> Total Price: <span className="text-green-500">{cart.data.totalCartPrice} EGP</span></h2>
                        <h2 className="text-2xl font-semibold">Total Items: <span className="text-green-500">{cart.data.products.length}</span></h2>
                    </div>
                    {cart.data.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img src={product.product.imageCover} className="w-40 h-40 rounded" alt={product.product.title}/>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{product.product.title}</h3>
                                    <p className="text-lg text-green-500">{product.price} EGP</p>
                                    <button onClick={() => deleteProductToCart(product.product.id)} className="text-red-500 hover:text-red-700 mt-2">
                                <li className="fa fa-trash p-1"></li>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => upadataProductCart(product.product.id, product.count - 1)}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" >-</button>
                                <span className="mx-4 text-lg">{product.count}</span>
                                <button onClick={() => upadataProductCart(product.product.id, product.count + 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" >+</button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 text-center">
                        <button onClick={handleClearCart} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Clear Your Cart</button>
                    </div>
                </div>
            ) : (<div className='my-4 p-8 text-center'>
                <h2 className="text-4xl text-black font-semibold ">Your cart is empty</h2>
            </div>
            )}
        </div>
    </>

}
