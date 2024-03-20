import React, { useState } from 'react';

function ProductInfo() {
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState(null);

    const handleChange = (event) => {
        setProductName(event.target.value);
    };

    const handleGenerate = () => {
        if (productName.trim() !== '') {
            getProductInfo(productName);
        } else {
            alert('Please enter a product name');
        }
    };

    const getProductInfo = (productName) => {
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = 'https://api.open-product-data.org';

        fetch(`${apiUrl}/v1/products?query=${productName}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.products && data.products.length > 0) {
                    const product = data.products[0]; // Assuming the first product is the most relevant
                    setProductInfo(product);
                } else {
                    setProductInfo({ error: 'Product not found' });
                }
            })
            .catch(error => {
                console.error('Error fetching product information:', error);
                setProductInfo({ error: 'Error fetching product information' });
            });
    };

    return (
        <div>
            <input type="text" value={productName} onChange={handleChange} placeholder="Enter product name" />
            <button onClick={handleGenerate}>Generate</button>
            <div>
                {productInfo ? (
                    productInfo.error ? <p>{productInfo.error}</p> : (
                        <>
                            <h2>{productInfo.product_name}</h2>
                            <p>{productInfo.description}</p>
                            <p>Price: {productInfo.price}</p>
                            <img src={productInfo.image_url} alt={productInfo.product_name} />
                        </>
                    )
                ) : null}
            </div>
        </div>
    );
}

export default ProductInfo;
