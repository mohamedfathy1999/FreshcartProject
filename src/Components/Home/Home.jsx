import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../mainSlider/mainSlider';
import useProducts from '../../Hooks/useProducts';

export default function Home() {
 let { addProductToWishList, wishlist } = useContext(WishListContext);  
 let { addProductToCart } = useContext(CartContext);
 let { data } = useProducts();

 let [searchTerm, setSearchTerm] = useState('');
 let [localWishList, setLocalWishList] = useState([]);

  useEffect(() => {
    if (wishlist && wishlist.data) {
      setLocalWishList(wishlist.data);
    }
  }, [wishlist]);

 let search = data
    ? data.filter(product =>  
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];


 let isProductInWishList = (productId) => {
    return localWishList.find(product => product._id === productId);
  };

 
 let handleAddToWishList = (productId) => {
    if (isProductInWishList(productId)) {
    
      setLocalWishList(prevList => prevList.filter(product => product._id !== productId));
    } else {
      
      addProductToWishList(productId);
      setLocalWishList(prevList => [...prevList, { _id: productId }]); 
    }
  };

  return  <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <h1 className="text-5xl text-center text-main my-4">Home</h1>

      <MainSlider />

      <CategoriesSlider />

      <div className="flex justify-center my-4 relative w-11/12 md:w-1/2 mx-auto">
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 rounded w-full text-center pl-10"/>
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>

      {search.length ? (
        <div className="flex flex-wrap justify-center">
          {search.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 product p-4">
              <Link to={`productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full" alt={product.title} />
                <h2 className="text-main text-sm">{product.category.name}</h2>
                <h2 className="font-medium">{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className="flex justify-between my-2">
                  <h3>{product.price} EGP</h3>
                  <h3>
                    <i className="fas fa-star rating-color"></i> {product.ratingsAverage}
                  </h3>
                </div>
              </Link>

              
              <button  onClick={() => handleAddToWishList(product.id)} className={`fas fa-solid fa-heart text-3xl w-80 ml-20 ${isProductInWishList(product.id) ? 'text-red-600' : 'text-black'}`} ></button>
              <button onClick={() => addProductToCart(product.id)} className="btn w-full bg-main text-white rounded py-1" > Add To Cart </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          <Loading />
        </div>
      )}
    </>
  
}
