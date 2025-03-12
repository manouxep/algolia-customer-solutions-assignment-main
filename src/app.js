import searchInsights from "search-insights";
import ResultsPage from "./components/results-page";

// Retrieve or generate a unique user token and store it in localStorage
function getUserToken() {
  let userToken = localStorage.getItem("userToken");

  if (!userToken) {
    userToken = "user-" + Date.now();
    localStorage.setItem("userToken", userToken);
  }

  return userToken;
}

// Retrieve the current user token
const userToken = getUserToken();

// Initialize Algolia Insights for tracking
searchInsights("init", {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  userToken: userToken,
  useCookie: true,
  debug: true,
});

// Track when a product is viewed
function trackProductView(objectID) {
  searchInsights("viewedObjectIDs", {
    eventName: "Product Viewed",
    index: process.env.ALGOLIA_INDEX,
    objectIDs: [objectID],
  });
}

// Track when a product is clicked
function trackProductClick(objectID, queryID, position) {
  searchInsights("clickedObjectIDsAfterSearch", {
    eventName: "Product Clicked",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
    positions: [position],
  });
}

// Track when a product is added to the cart
function trackAddToCart(objectID, queryID, price) {
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Cart",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
    revenue: price.toFixed(2),
  });
}

// Track when a product is added to the wishlist
function trackAddToWishlist(objectID, queryID) {
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Wishlist",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
  });
}

// Expose tracking functions globally
window.trackProductView = trackProductView;
window.trackProductClick = trackProductClick;
window.trackAddToCart = trackAddToCart;
window.trackAddToWishlist = trackAddToWishlist;

// Attach event listener to track user interactions
document.addEventListener("DOMContentLoaded", () => {
  const hitsContainer = document.querySelector("#hits");

  if (!hitsContainer) return;

  hitsContainer.addEventListener("click", (event) => {
    const viewButton = event.target.closest(".result-hit__view");
    const cartButton = event.target.closest(".result-hit__cart");
    const wishlistButton = event.target.closest(".result-hit__wishlist");

    if (viewButton) {
      const objectID = viewButton.getAttribute("data-object-id");
      const queryID = viewButton.getAttribute("data-query-id");
      const position = parseInt(viewButton.getAttribute("data-position"), 10);

      if (objectID && queryID) {
        trackProductView(objectID);
        trackProductClick(objectID, queryID, position);
      }
    }

    if (cartButton) {
      const objectID = cartButton.getAttribute("data-object-id");
      const price = parseFloat(cartButton.getAttribute("data-price"));
      const queryID = cartButton.getAttribute("data-query-id");

      if (objectID && price && queryID) {
        trackAddToCart(objectID, queryID, price);
      }
    }

    if (wishlistButton) {
      const objectID = wishlistButton.getAttribute("data-object-id");
      const queryID = wishlistButton.getAttribute("data-query-id");

      if (objectID && queryID) {
        trackAddToWishlist(objectID, queryID);
      }
    }
  });
});

// Initialize the results page
const resultsPage = new ResultsPage();

// Enable clickAnalytics in search requests
if (resultsPage._searchInstance) {
  resultsPage._searchInstance.helper.setQueryParameter("clickAnalytics", true);
}
