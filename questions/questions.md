*Question 1*  

 
From: marissa@startup.com  
Subject:  Bad design  

Hello,  
  
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.  
   
Thanks,  
Marissa  


  
--
Answer Question 1

Hello Marissa,

Thank you for your feedback regarding the new dashboard design. We understand that clearing and deleting indexes now requires more clicks, which can be inconvenient during iteration. We will pass your feedback to the product team to consider for future improvements.

In the meantime, you also have the option to perform these actions via the API:

1. **Delete an index**: You can delete an index using the API by following the [delete index](https://www.algolia.com/doc/api-reference/api-methods/delete-index/) documentation.
   
   Example in JavaScript:
 
   const client = algoliasearch('YourApplicationID', 'YourAPIKey');
   const index = client.initIndex('YourIndexName');
   index.delete();
  

2. **Clear an index**: If you only want to clear the records of an index without affecting its settings, you can use the `clearObjects` method. See the [clear objects](https://www.algolia.com/doc/api-reference/api-methods/clear-objects/) documentation.

   Example in JavaScript:

   index.clearObjects().then(() => {
     console.log('Index cleared');
   });
 

Additionally, you can still perform these actions directly from the Algolia dashboard, though they may require a few more steps.

Thanks again for your valuable feedback!

Best regards,  
Yaovi  Reinhardt
Algolia Support Team

*Question 2*:   
  
From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!  
  
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".  
  
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?  
  
Please advise on how to fix this. Thanks.   

  
---------------------------------
Answer Question 2

Hello Carrie,

Thank you for reaching out, and I understand the urgency of this issue.

The error message "Record is too big, please contact enterprise@algolia.com" indicates that the size of the records you are trying to index exceeds Algolia's limits. For paid plans, the limit is 10 KB per record.

### Here's how you can address the issue:

1. **Optimize the Record Size**:
   - **Split large records**: If your record contains a lot of metadata, especially data not needed for search, consider splitting it into smaller, more manageable records.
   - **Exclude unnecessary data**: You can use the [excludeAttributesFromIndexing](https://www.algolia.com/doc/api-reference/api-parameters/attributesToRetrieve/#parameter-option) parameter to remove metadata that is not required for search.
   
2. **Use Algolia's "Large Record Handling"**:
   - Algolia allows for [handling large records](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/index-large-records/) by splitting them into smaller parts. This can help you manage and link related records in your system while still displaying them as a single result.

3. **Upgrade to an Enterprise Plan**:
   - Since you are a paying customer, you may want to explore the [enterprise plan](https://www.algolia.com/pricing) that allows for larger records and offers higher limits on record size.

4. **Review API Usage**:
   - You can monitor your current usage through the [API logs](https://www.algolia.com/doc/guides/sending-and-managing-data/monitoring/#logs) to ensure that your usage aligns with your current plan.

Feel free to contact us for further assistance or to discuss the enterprise plan to support larger records.

Best regards,  
Yaovi Reinhardt
Algolia Support Team

------

*Question 3*:   


From: marc@hotmail.com  
Subject: Error on website  
  
Hi, my website is not working and here's the error:  
  
![error message](./error.png)  
  
Can you fix it please?  

-----------------

Answer Question 3

=> Hello Marc,

I hope you're doing well. After reviewing your error, there are a few potential causes:

Missing Import or Reference: You might not have imported the Searchkit library at the top of your file, or it’s not correctly included in your build.
Incorrect CDN Link: If you're using a CDN to load Searchkit in your HTML, it might not be loading properly.

Here’s how to fix the issue:

1. Install Searchkit using npm or yarn:

npm install searchkit

Or if you’re using yarn:

yarn add searchkit

2. Import Searchkit in your JavaScript file:


import { SearchkitManager, SearchkitProvider, ... } from 'searchkit';


3. If you’re using a CDN, make sure you’re including the correct Searchkit CDN link in your HTML file:

<script src="https://cdn.jsdelivr.net/npm/searchkit@latest/dist/umd/searchkit.min.js"></script>

Please do not hesitate if you have any questions

Best regards,  
Yaovi Reinhardt  
Algolia Support Team



