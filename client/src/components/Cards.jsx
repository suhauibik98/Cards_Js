import React, { useState } from 'react';

const Cards = ({title}) => {
  const images = [
    'https://tecdn.b-cdn.net/img/new/standard/city/044.webp',
    'https://tecdn.b-cdn.net/img/new/standard/city/043.webp',
    'https://tecdn.b-cdn.net/img/new/standard/city/042.webp'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img
          className="rounded-t-lg w-full"
          src={images[currentImageIndex]}
          alt=""
        />
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2"
        >
          &gt;
        </button>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-red-300">
          Noteworthy
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          loc:
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          phone:
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          des:
        </p>
        
        
      </div>
    </div>
  );
};

export default Cards;
