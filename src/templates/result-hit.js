/**
 * Generates the HTML structure for each search result.
 * @param {Object} hit - The Algolia search result object.
 * @returns {string} - The formatted HTML for a single search result.
 */
 const resultHit = (hit) => {
  const objectID = hit.objectID;
  const queryID = hit.__queryID;
  const position = hit.__position;

  if (!objectID) return "";

  return `
    <div class="result-hit">
      <div class="result-hit__image-container">
        <img class="result-hit__image" src="${hit.image}" alt="${hit._highlightResult.name.value}" />
      </div>

      <div class="result-hit__details">
        <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
        <p class="result-hit__price">$${hit.price}</p>
      </div>

      <div class="result-hit__controls">
        <button id="view-item-${objectID}" 
                class="result-hit__view" 
                data-object-id="${objectID}" 
                data-query-id="${queryID}" 
                data-position="${position}">
          View
        </button>

        <button id="add-to-cart-${objectID}" 
                class="result-hit__cart" 
                data-object-id="${objectID}" 
                data-price="${hit.price}" 
                data-query-id="${queryID}" 
                data-position="${position}">
          Add To Cart
        </button>

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
