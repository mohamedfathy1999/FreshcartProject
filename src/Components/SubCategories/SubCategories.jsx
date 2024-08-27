
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';



export default function Subcategories({ categoryId, categoryName }) {
 let [subcategories, setSubcategories] = useState([]);
 let [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
 let [products, setProducts] = useState([]);
 let [loading, setLoading] = useState(true);
 let [error, setError] = useState(null);

  useEffect(() => {
   let fetchSubcategories = async () => {
      setLoading(true);
      setError(null);
      try {
       let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
        setSubcategories(response.data.data);
      } catch (err) {
        setError('Error fetching subcategories.');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  useEffect(() => {
   let fetchProducts = async () => {
      if (selectedSubcategoryId) {
        try {
         let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${selectedSubcategoryId}/products`);
          setProducts(response.data.data);
        } catch (err) {
          setError('Error fetching products.');
        }
      }
    };

    fetchProducts();
  }, [selectedSubcategoryId]);

 
  if (error) return <p className="text-red-500">{error}</p>;

  return <>
     <div className='mt-8'>
      <h1 className='text-5xl text-center text-main mb-4'>{categoryName}</h1>
      {subcategories.length ? (
        <div className='flex flex-wrap'>
          {subcategories.map((subcategory) => (
            <div key={subcategory._id} className='w-1/3 p-4' onClick={() => setSelectedSubcategoryId(subcategory._id)}>
              <div className='rounded-2xl overflow-hidden cursor-pointer shadow-lg'>
                <p className='text-center text-xl mt-2 py-11'>{subcategory?.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap justify-center'><Loading /></div>
      )}

  
    </div>
  </>
 
  
}
