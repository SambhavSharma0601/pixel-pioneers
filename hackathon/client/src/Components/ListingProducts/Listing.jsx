import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importing useSelector to access Redux state

export default function Listing() {
 const { id } = useParams();
 const navigate = useNavigate();
 const sellerEmail = useSelector(state => state.currentSeller.Seller_Email); // Fetching seller email from Redux state
 const [listing, setListing] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(false);

 useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/products/${sellerEmail}`); // Using seller email in the URL
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
 }, [id, sellerEmail]); // Adding sellerEmail to the dependency array

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Something went wrong!</div>;

 return (
 <div className="bg-gray-100">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg max-w-md backdrop-blur-md transition-transform duration-200 ease-in-out transform hover:scale-105 p-4" onClick={() => navigate(`/product-detail/${id}`)}>
      <div className="text-center text-2xl font-bold mb-4">Preview</div>
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {listing?.images.map((imageUrl, index) => (
            <img key={index} className="h-48 w-full object-cover md:w-48" src={imageUrl} alt={`Listing ${index}`} />
          ))}
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{listing?.name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{listing?.description}</p>
          <p className="mt-2 text-gray-500">Price: {listing?.price}</p>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{listing?.category}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{listing?.overview}</p>
          <p className="mt-2 text-gray-500">Availability: {listing?.availability}</p>
        </div>
      </div>
    </div>
 </div>
 );
}
