
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

// Configure Cloudinary
const cloudName = 'drnxqtdfo'; // Replace with your Cloudinary cloud name
const apiKey = '727296686627594'; // Replace with your Cloudinary API key
const apiSecret = 'Cz99BEIJg9qJH39JjHOjjhZdkgI'; // Replace with your Cloudinary API secret

export default function CreateListing() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    images: [],
  });
  
  const currentSeller = useSelector(state => state.currentSeller);
  const Seller_Email = currentSeller ? currentSeller.Seller_Email : '';

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.images.length < 6) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i], i));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 5 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file, index) => {
    return new Promise((resolve, reject) => {
      // Check if it's the first image and remove background using Cloudinary

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'uliaa8ei'); // Your Cloudinary upload preset
        formData.append('api_key', apiKey);
        formData.append('timestamp', (Date.now() / 1000) | 0);
        formData.append('signature', '24cd946240812c9b529244b651a060912811ae5d'); // Your Cloudinary signature
        formData.append('effect', 'remove_background'); // Cloudinary effect to remove background

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Use the URL from Cloudinary as the download URL
            resolve(data.secure_url);
          })
          .catch((error) => {
            reject(error);
          });
      
        // For other images, proceed with Firebase upload
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.type === 'number' || e.target.type === 'text') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      if (formData.images.length < 1) {
        return setError('You must upload at least one image');
      }
      setLoading(true);
      setError(false);

      const formData1 = {
        ...formData,
        Seller_Email: Seller_Email, 
      };

      const res = await fetch('http://localhost:8000/api/list/create-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData1),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleCopyDescription = () => {
    // Copy the generated description to the clipboard
    navigator.clipboard.writeText(formData.description);
    // Optionally provide feedback to the user
    alert('Description copied to clipboard!');
  };
  const generateDescription = (productName) => {
    // Example logic for generating description based on product name
    return `This is a description for ${productName}. It is a high-quality product that meets all your needs.`;
  };

  const handleGenerateDescription = () => {
    const generatedDescription = generateDescription(formData.name);
    setFormData({
      ...formData,
      description: generatedDescription,
    });
  };
  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center'>
      <main className='container mx-auto p-4 bg-white rounded-lg shadow-lg max-w-md backdrop-blur-md'>
        <h1 className='text-3xl font-semibold text-center my-7'>
          Create a Listing
        </h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 p-4'>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Product Name'
              className='border-2 border-gray-300 bg-gray-100 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500'
              id='name'
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              placeholder='Description'
              className='border-2 border-gray-300 bg-gray-100 p-3 rounded-lg w-full focus:outline-none  h-40 focus:border-blue-500'
              id='description'
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type='number'
              placeholder='Price'
              className='border-2 border-gray-300 bg-gray-100 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500'
              id='price'
              required
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <div className='space-y-4'>
            <p className='font-semibold'>
              Images:
            </p>
            <div className='flex items-center'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='border-2 border-gray-300 bg-gray-100 p-3 rounded-lg w-full focus:outline-none'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 focus:outline-none transition-colors duration-200'
                onClick={handleImageSubmit}
              >
                Upload
              </button>
              {/* {uploading ? 'Uploading...' : 'Upload'} */}
            </div>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {formData.images.length > 0 &&
              formData.images.map((url, index) => (
                <div
                 key={`${url}-${index}`}
                 className='flex justify-between items-center p-3 border rounded-lg'
                >
                 <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-cover rounded-lg'
                 />
                 <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='text-red-700 px-4 py-2 rounded-lg uppercase hover:bg-red-100 focus:outline-none'
                 >
                    Delete
                 </button>
                </div>
              ))}
          </div>
          <button
            type='submit'
            disabled={loading || uploading}
            className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </form>
        <button
              type='button'
              className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 focus:outline-none transition-colors duration-200'
              onClick={handleGenerateDescription}
            >
              Generate Description
            </button>
            {formData.description && (
          <div className='p-4 bg-gray-100 rounded-lg'>
            <h2 className='font-semibold mb-2'>Generated Description</h2>
            <p>{formData.description}</p>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none'
              onClick={handleCopyDescription}
            >
              Copy Description
            </button>
          </div>
        )}
      </main>
    </div>
 );
}

// export default CreateListing;