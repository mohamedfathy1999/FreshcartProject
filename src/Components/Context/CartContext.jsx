import axios from "axios";
import { createContext,  useState } from "react";
import toast from "react-hot-toast";


export let CartContext = createContext();

 

export default function CartContextProvider({ children }) {
   
    let headers = {
        token: localStorage.getItem('userToken') || ''
    };
   let [cart, setCart] = useState(null);
   let [loading, setLoading] = useState(false);

    async function addProductToCart(productId) {
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers }
            );
            toast.success(data.message , {
                 icon: '👏',   
            });
            getCart();
        } catch (err) {
            console.log(err);
            
        } finally {
            setLoading(false);
        }
    }

    async function getCart() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers }
            );
            setCart(data);
        } catch (err) {
            toast.error("Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    }


    async function upadataProductCart(productId, count) {
        if (count > 0) {

            setLoading(true)
            try {
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    {
                        count
                    },
                    {
                        headers
                    });


                setCart(data)
                setLoading(false)
            } catch (err) {

                setLoading(false)
            }
        } else {
            deleteProductToCart(productId)
        }



    }

    async function deleteProductToCart(productId) {
        try {
            setLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers
                });
            setCart(data)
            toast.success("Cart delete");
            setLoading(false)
        } catch (err) {
           
            setLoading(false)
        }
    }

    async function clearCart() {
        setLoading(true);
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers }
            );
            setCart(null);
            toast.success("Cart cleared");
        } catch (err) {
            toast.error("Failed to clear cart");
        } finally {
            setLoading(false);
        }
    }

    async function checkout(shippingAddress) {
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data._id}?url=http://localhost:5173`,
                { shippingAddress },
                { headers }
            );
            window.location.href = data.session.url;
            
        
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }



    return (
        <CartContext.Provider value={{  checkout, addProductToCart, getCart, cart, setCart, upadataProductCart, loading, deleteProductToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}











