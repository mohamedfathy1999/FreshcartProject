import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import Subcategories from '../SubCategories/SubCategories';
import { Helmet } from 'react-helmet';


export default function Categories() {
  let [selectedCategoryId, setSelectedCategoryId] = useState(null);
  let [selectedCategoryName, setSelectedCategoryName] = useState('');

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, error, } = useQuery({
    queryKey: ['Categories'],
    queryFn: getCategories,
    select: (data) => data?.data.data,
  });

  let handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };


  if (error) return <p className="text-red-500">Error fetching categories.</p>;

  return <>

    <Helmet>
      <title>categories</title>
    </Helmet>
    <h1 className="text-5xl text-center text-main my-4">All Categories</h1>

    {data && data.length ? (
      <div className='flex flex-wrap justify-center'>
        {data.map((category) => (
          <div key={category._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4' onClick={() => handleCategoryClick(category._id, category.name)} >
            <div className='rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-green-400 transition-shadow duration-300'>
              <img src={category?.image} className='w-full h-64 md:h-72 object-cover' alt={category?.name}/>
              <p className='text-center text-main text-2xl mt-2'>{category?.name}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className='flex flex-wrap justify-center'><Loading /></div>
    )}

    {selectedCategoryId && (
      <Subcategories categoryId={selectedCategoryId} categoryName={selectedCategoryName} />
    )}



  </>

}
