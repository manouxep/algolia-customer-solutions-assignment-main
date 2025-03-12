import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import { searchBox, hits, pagination, refinementList } from "instantsearch.js/es/widgets";
import { createInsightsMiddleware } from "instantsearch.js/es/middlewares";
import resultHit from "../templates/result-hit";

/**
 * @class ResultsPage
 * Handles the display of instant search results
 */
class ResultsPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Initializes the Algolia search client
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: true,
    });

    // Enable Algolia Insights for click tracking
    const insightsMiddleware = createInsightsMiddleware();
    this._searchInstance.use(insightsMiddleware);
  }

  /**
   * @private
   * Adds widgets to the Algolia InstantSearch instance
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: "#searchbox",
      }),
      hits({
        container: "#hits",
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: "#pagination",
      }),
      refinementList({
        container: "#brand-facet",
        attribute: "brand",
      }),
      refinementList({
        container: "#categories-facet",
        attribute: "categories",
      }),
    ]);
  }

  /**
   * @private
   * Starts the InstantSearch instance
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultsPage;
