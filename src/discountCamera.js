const fs = require('fs');
const algoliasearch = require('algoliasearch');

// Load your environment variables (Algolia App ID, API Key, and Index Name)
require('dotenv').config();

// Algolia initialization
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

// Load product data
const dataPath = './data/products.json';
let products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Function to check if a product belongs to the Cameras category
const isCameraCategory = (categories) => {
  return categories.some(category => category.includes('Cameras') || category.includes('Digital Cameras'));
};

// Apply 20% discount and round down the price for camera products
const applyDiscountToCameras = (products) => {
  return products
    .filter(product => isCameraCategory(product.categories)) // Filter only camera-related products
    .map(product => {
      const originalPrice = product.price;
      const discountedPrice = Math.floor(originalPrice * 0.8); // Apply 20% discount and round down
      product.price = discountedPrice;
      console.log(`Discounted product: ${product.name}, Original Price: ${originalPrice}, New Price: ${discountedPrice}`);
      return product;
    });
};

// Update products
let updatedProducts = applyDiscountToCameras(products);

// Send updated products to Algolia
index
  .saveObjects(updatedProducts, { autoGenerateObjectIDIfNotExist: true })
  .then(({ objectIDs }) => {
    console.log('Products successfully updated to Algolia!');
  })
  .catch(err => {
    console.error('Error uploading to Algolia:', err);
  });
