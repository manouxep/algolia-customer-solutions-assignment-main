// Function to generate the HTML structure for each search result
const resultHit = (hit) => {
  // Log the entire hit object for debugging, useful for checking if objectID exists
  console.log("Rendering hit:", hit); 

  // Extract important properties from the hit object
  const objectID = hit.objectID;  // Unique identifier for the item
  const queryID = hit.__queryID;  // Query ID for tracking the search query (optional)
  const position = hit.__position; // Position of the item in the search results (for analytics)

  // If objectID is missing, log an error and return an empty string to prevent rendering
  if (!objectID) {
    console.error("objectID is missing for the hit:", hit);
    return ""; // Do not render the result without an objectID
  }

  // Generate the HTML structure for the result, including data attributes for tracking
  return `
    <div class="result-hit">
      
      <!-- Image container for displaying the product's image -->
      <div class="result-hit__image-container">
        <!-- Display the product image dynamically; 'alt' attribute for accessibility -->
        <img class="result-hit__image" src="${hit.image}" alt="${hit._highlightResult.name.value}" />
      </div>

      <!-- Details section to show the product's name and price -->
      <div class="result-hit__details">
        <!-- Display the product name with highlighted search terms (if applicable) -->
        <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
        <!-- Display the price of the product dynamically -->
        <p class="result-hit__price">$${hit.price}</p>
      </div>

      <!-- Control buttons section for user interaction (View, Add to Cart, Add to Wishlist) -->
      <div class="result-hit__controls">
        <!-- View button, uniquely identified by objectID, with relevant tracking data -->
        <button id="view-item-${objectID}" 
                class="result-hit__view" 
                data-object-id="${objectID}" 
                data-query-id="${queryID}" 
                data-position="${position}">
          View
        </button>

        <!-- Add to Cart button, with objectID, price, and tracking data for analytics -->
        <button id="add-to-cart-${objectID}" 
                class="result-hit__cart" 
                data-object-id="${objectID}" 
                data-price="${hit.price}" 
                data-query-id="${queryID}" 
                data-position="${position}">
          Add To Cart
        </button>

        <!-- Add to Wishlist button, also with tracking data (objectID, queryID, position) -->
        <button id="add-to-wishlist-${objectID}" 
                class="result-hit__wishlist" 
                data-object-id="${objectID}" 
                data-query-id="${queryID}" 
                data-position="${position}">
          Add To Wishlist
        </button>
      </div>
    </div>
  `;
};

export default resultHit;
