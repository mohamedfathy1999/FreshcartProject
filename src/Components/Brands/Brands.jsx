import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Brands() {
  let [selectedBrandId, setSelectedBrandId] = useState(null);
  let [selectedBrand, setSelectedBrand] = useState(null);
  let [isModalOpen, setIsModalOpen] = useState(false);

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data } = useQuery({
    queryKey: ['Brands'],
    queryFn: getBrands,
    select: (data) => data?.data.data,
  });

  let handleBrandClick = async (brandId) => {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setSelectedBrand(response.data.data);
      setSelectedBrandId(brandId);
      setIsModalOpen(true);  
    } catch (error) {
      console.error('Error fetching brand details:', error);
    }
  };

  let closeModal = () => {
    setIsModalOpen(false);
  };

  return  <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className="text-5xl text-center text-main my-4">All Brands</h1>

      {data && data.length ? (
        <div className="flex flex-wrap justify-center">
          {data.map((brand) => (
            <div
              key={brand._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
              onClick={() => handleBrandClick(brand._id)}
            >
              <div className="rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-green-400 transition-shadow duration-300">
                <img
                  src={brand?.image}
                  className="w-full h-40 object-contain"
                  alt={brand?.name}
                />
                <p className="text-center text-xl text-main mt-2">{brand?.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          <Loading />
        </div>
      )}

      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/2 rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              <i className="fa fa-times text-2xl"></i>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-main">{selectedBrand.name}</h2>
                <p className="text-sm text-gray-500 mt-2">{selectedBrand.name}</p>
              </div>
              <img
                className=" w-80 object-contain"
                src={selectedBrand.image}
                alt={selectedBrand.name}
              />
            </div>
            <button
              className="mt-4 bg-main text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>

}
