import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector


const YourListing = () => {
 const dispatch = useDispatch(); // Initializing useDispatch hook
 const sellerEmail = useSelector(state => state.currentSeller?.Seller_Email); // Getting seller email from Redux store
 const [products, setProducts] = useState([]);

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${sellerEmail}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
 }, [dispatch, sellerEmail]); // Adding dispatch and sellerEmail to dependency array

 return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="bg-blue-100 p-4 rounded-lg">
          <img src={product.secondaryImage} alt={product.productName} className="w-full h-48 object-cover rounded-lg" />
          <h2 className="text-xl font-bold mt-2">{product.productName}</h2>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
 );
};

export default YourListing;
