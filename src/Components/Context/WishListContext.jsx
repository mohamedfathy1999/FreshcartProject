import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem('userToken') || ''
    };

   let [wishlist, setWishList] = useState(null);
   let [loading, setLoading] = useState(false);
   let [message, setMessage] = useState('');
  


    async function getwishlist() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            setWishList(data);
         
        } catch (err) {
            console.log(err);
            
        } finally {
            setLoading(false);
        }
    }


    async function addProductToWishList(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
            if (data && data.message) {
                toast.success(data.message , {
                    icon: '👏',
                   
               });
                getwishlist(); 
            }
        } catch (err) {
            toast.error("Failed to remove product from wishlist");
        } finally {
            setLoading(false);
        }
    }

 
    async function deleteProductToWishList(productId) {
        setLoading(true);
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            toast.success( 'Failed to remove product from wishlist', {
                icon: '👏',
               
           });
         
            getwishlist(); 
        } catch (err) {
            toast.error("Failed to remove product from wishlist");
        } finally {
            setLoading(false);
        }
    }
    
 
    useEffect(() => {
        getwishlist();
    }, []);

    return (
        <WishListContext.Provider value={{ addProductToWishList, wishlist, setWishList, loading, getwishlist, deleteProductToWishList, message, }}>
            {children}
        </WishListContext.Provider>
    );
}
