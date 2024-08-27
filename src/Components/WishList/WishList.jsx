import React, { useContext, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function WishList() {
  let { getwishlist, wishlist, loading, deleteProductToWishList  } = useContext(WishListContext);
  let { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    getwishlist();
  }, []);

  let handleMoveToCart = async (product) => {
    await addProductToCart(product);
    await deleteProductToWishList(product._id);
    await getwishlist(); 
  };

  let handleDeleteProduct = async (productId) => {
    await deleteProductToWishList(productId);
    await getwishlist(); 
  };

  return  <>
      <Helmet>
        <title>wishlist</title>
      </Helmet>
      <h1 className="text-4xl md:text-5xl text-center text-main my-4">My wish List</h1>

      {loading ? (
        <div className="flex flex-wrap justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-11/12 md:w-3/4 mx-auto">{wishlist && wishlist.data.length > 0 ? ( wishlist.data.map((product, index) => (<div key={index} className="flex items-center justify-between border-b py-4" >
                <div className="flex items-center">
                  <img  src={product.imageCover}  className="w-24 h-24 object-cover"  alt={product.title || 'Product'} />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </h2>
                    <p className="text-lg text-green-600 font-semibold">{product.price} EGP</p>
                    <button  onClick={() => handleDeleteProduct(product._id)} className="text-red-600 mt-2 flex items-center" >
                      <i className="fas fa-trash-alt mr-1"></i> Remove
                    </button>
                  </div>
                </div>
                <button onClick={() => handleMoveToCart(product)} className="text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white"> Add To Ca</button>
              </div>
            ))
          ) : (
            <div className="my-4 p-8 text-center">
              <h2 className="text-4xl text-black font-semibold">Your wishlist is empty</h2>
            </div>
          )}
        </div>
      )}
    </>
  
}







