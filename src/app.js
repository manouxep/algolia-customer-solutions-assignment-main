import searchInsights from "search-insights";
import ResultsPage from "./components/results-page";

// Function to retrieve or generate a unique user token and store it in localStorage
function getUserToken() {
  let userToken = localStorage.getItem("userToken");

  // If no token exists, generate a new one and store it
  if (!userToken) {
    userToken = "user-" + Date.now(); // Create a unique user token based on timestamp
    localStorage.setItem("userToken", userToken); // Store the token in localStorage
  }
  
  return userToken; // Return the user token for future use
}

// Retrieve the current user token
const userToken = getUserToken();

// Initialize Algolia Insights with necessary credentials and tracking settings
console.log("Initializing Algolia Insights...");
searchInsights("init", {
  appId: process.env.ALGOLIA_APP_ID, // Algolia App ID from environment variables
  apiKey: process.env.ALGOLIA_API_KEY, // Algolia API Key from environment variables
  userToken: userToken, // The user token for identifying the user
  useCookie: true, // Enable cookie usage to persist tracking data
  debug: true, // Enable debugging for tracking insights in development mode
});

console.log("Algolia Insights initialized with userToken:", userToken);

// Function to track when a product is viewed
function trackProductView(objectID) {
  console.log(`Sending Product Viewed event for objectID: ${objectID}`);
  searchInsights("viewedObjectIDs", {
    eventName: "Product Viewed", // Name of the event
    index: process.env.ALGOLIA_INDEX, // Index name from environment variables
    objectIDs: [objectID], // Array of object IDs for the viewed product
  });
}

// Function to track when a product is clicked
function trackProductClick(objectID, queryID, position) {
  console.log(
    `Sending Product Clicked event for objectID: ${objectID}, queryID: ${queryID}, position: ${position}`
  );
  searchInsights("clickedObjectIDsAfterSearch", {
    eventName: "Product Clicked", // Name of the event
    index: process.env.ALGOLIA_INDEX, // Index name from environment variables
    queryID: queryID, // The query ID for tracking the search
    objectIDs: [objectID], // Array of object IDs for the clicked product
    positions: [position], // Array of positions in the search results
  });
}

// Function to track when a product is added to the cart
function trackAddToCart(objectID, queryID, price) {
  console.log(
    `Sending Add to Cart event for objectID: ${objectID}, queryID: ${queryID}, price: ${price}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Cart", // Name of the event
    index: process.env.ALGOLIA_INDEX, // Index name from environment variables
    queryID: queryID, // Query ID from the search event
    objectIDs: [objectID], // Array of object IDs for the product
    revenue: price.toFixed(2), // The price of the product, formatted as a string
  });
}

// Function to track when a product is added to the wishlist
function trackAddToWishlist(objectID, queryID) {
  console.log(
    `Sending Add to Wishlist event for objectID: ${objectID}, queryID: ${queryID}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Wishlist", // Name of the event
    index: process.env.ALGOLIA_INDEX, // Index name from environment variables
    queryID: queryID, // Query ID from the search event
    objectIDs: [objectID], // Array of object IDs for the product
  });
}

// Expose tracking functions globally for debugging or external access
window.trackProductView = trackProductView;
window.trackProductClick = trackProductClick;
window.trackAddToCart = trackAddToCart;
window.trackAddToWishlist = trackAddToWishlist;

// Event listener for handling button clicks and triggering the appropriate tracking events
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed. Setting up event delegation.");

  // Select the container that holds the search result hits
  const hitsContainer = document.querySelector("#hits");

  // If the hits container is not found, log an error and return early
  if (!hitsContainer) {
    console.error("#hits container not found in the DOM.");
    return;
  }

  console.log("Attaching event listener to #hits container.");

  // Attach a click event listener to the hits container for event delegation
  hitsContainer.addEventListener("click", (event) => {
    console.log("Click event detected within #hits container.");

    // Check if the click was on a "View" button
    const viewButton = event.target.closest(".result-hit__view");
    // Check if the click was on an "Add to Cart" button
    const cartButton = event.target.closest(".result-hit__cart");
    // Check if the click was on an "Add to Wishlist" button
    const wishlistButton = event.target.closest(".result-hit__wishlist");

    // Handle "View" button click
    if (viewButton) {
      console.log("View button clicked.");
      const objectID = viewButton.getAttribute("data-object-id");
      const queryID = viewButton.getAttribute("data-query-id");
      const position = parseInt(viewButton.getAttribute("data-position"), 10); // Parse position as an integer

      if (objectID && queryID) {
        trackProductView(objectID); // Track the product view
        trackProductClick(objectID, queryID, position); // Track the product click
      } else {
        console.error("Object ID or Query ID not found on 'View' button.");
      }
    }

    // Handle "Add to Cart" button click
    if (cartButton) {
      console.log("Cart button clicked.");
      const objectID = cartButton.getAttribute("data-object-id");
      const price = parseFloat(cartButton.getAttribute("data-price")); // Parse price as a float
      const queryID = cartButton.getAttribute("data-query-id");

      console.log({ objectID, price, queryID });

      if (objectID && price && queryID) {
        trackAddToCart(objectID, queryID, price); // Track the add to cart event
      } else {
        console.error("Object ID, Price, or Query ID not found on 'Add to Cart' button.");
      }
    }

    // Handle "Add to Wishlist" button click
    if (wishlistButton) {
      console.log("Wishlist button clicked.");
      const objectID = wishlistButton.getAttribute("data-object-id");
      const queryID = wishlistButton.getAttribute("data-query-id");

      console.log({ objectID, queryID });

      if (objectID && queryID) {
        trackAddToWishlist(objectID, queryID); // Track the add to wishlist event
      } else {
        console.error("Object ID or Query ID not found on 'Add to Wishlist' button.");
      }
    }
  });
});

// Initialize the results page logic
new ResultsPage();
