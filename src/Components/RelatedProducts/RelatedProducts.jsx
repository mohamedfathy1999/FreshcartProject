import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';


export default function RelatedProducts() {

 let { addProductToWishList, wishlist } = useContext(WishListContext);  
 let [localWishList, setLocalWishList] = useState([]);


  useEffect(() => {
    if (wishlist && wishlist.data) {
      setLocalWishList(wishlist.data);
    }
  }, [wishlist]);

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

 
  let { addProductToCart } = useContext(CartContext);


  let { category } = useParams();
 let [relatedProducts, setRelatedProducts] = useState([]);

 let getRelatedProducts = async () => {
    try {
     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
     let related = data.data.filter((product) => product.category.name === category);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

 let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  useEffect(() => {
    getRelatedProducts();
  }, [category]);

  return <>
  
  <div>
      

      <Slider {...settings}>
        {relatedProducts.length  ? (
          relatedProducts.map((product) => (
            <div key={product.id} className='product p-4'>
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className='w-full' alt={product.title} />
                <h2 className='text-main text-sm'>{product.category.name}</h2>
                <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className='flex justify-between my-2'>
                  <h3>{product.price} EGP</h3>
                </div>
              </Link>
              <i className="fas fa-star text-yellow-500 text-xl"></i>
              <span className="ml-2">{product.ratingsAverage}</span>
              <button  onClick={() => handleAddToWishList(product.id)} className={`fas fa-heart text-2xl ml-60 ${isProductInWishList(product.id) ? 'text-red-600' : 'text-black'}`}></button>
              <button onClick={()=> addProductToCart(product.id)}   className='btn w-full bg-main text-white rounded py-1'>Add To Cart</button>
            </div>
          ))
        ) : (
          <div className='flex justify-center  py-36'>
       <Loading/>
          </div>
        )}
      </Slider>
    </div>
  </>
  
  
}
