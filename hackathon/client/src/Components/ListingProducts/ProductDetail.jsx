// ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/list/listing/${id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;
  if (!product) return null;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md overflow-hidden m-5">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full h-[55vh] object-fit"
                src={imageUrl}
                width={300}
                height={800}
                alt={`Product Image ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product.name}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {product.description}
          </p>
          <p className="mt-2 text-gray-500">Price: {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
