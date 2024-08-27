import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../Context/WishListContext';

export default function ProductDetails() {
 let { addProductToWishList, wishlist } = useContext(WishListContext);  
 let [localWishList, setLocalWishList] = useState([]);

  let { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    if (wishlist && wishlist.data) {
      setLocalWishList(wishlist.data);
    }
  }, [wishlist]);

  let { id } = useParams();
 let [productDetails, setProductDetails] = useState({});

 let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

 let getProductDetails = async (id) => {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

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

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return  <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-main mb-6">Product Details</h1>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
            <Slider {...settings}>
              {productDetails.images?.map((image, index) => (
                <img src={image} key={index} className="w-full rounded-lg" alt={`Product ${index}`} />
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-2/3 lg:w-2/3 mt-32">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-black mb-4">{productDetails.title}</h2>
            <p className="text-gray-700 mb-4">{productDetails.description}</p>
            <h3 className="text-xl mb-2">{productDetails.category?.name}</h3>
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-xl font-semibold">{productDetails.price} EGP</h3>
              <div className=" ml-40">
                <i className="fas fa-star text-yellow-500 text-xl"></i>
                <span className="ml-2">{productDetails.ratingsAverage}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <button onClick={() => addProductToCart(productDetails.id)} className="btn bg-main text-white rounded-lg py-2 px-4 text-lg mb-4 md:mb-0" > Add To Cart </button>
              <button  onClick={() => handleAddToWishList(productDetails.id)} className={`fas fa-heart text-2xl md:text-3xl ${isProductInWishList(productDetails.id) ? 'text-red-600' : 'text-black'}`} ></button>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </>
  
}
