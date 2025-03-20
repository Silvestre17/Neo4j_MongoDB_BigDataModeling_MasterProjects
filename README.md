# BDMM | Assignment 1 & 2 | 24.25 - [Group 5]

**Assignment 1** & **Assignment 2** of the Big Data Management and Modelling course of the Master's in Data Science and Advanced Analytics at NOVA IMS.

## **Links**

> [**👨‍💻 GitHub Repository**](https://github.com/Silvestre17/BDMM_Assignment1-2)

<br>

#### **Group 5**

  - Alexandre Gonçalves, 20240738
  - André Silvestre, 20240502
  - Filipa Pereira, 20240509
  - João Henriques, 20240499
  - Umeima Mahomed, 20240543
  
<br>

---

<details>
  
  <summary>

  # **1️⃣ Assignment 1**

  </summary>

## **🍺 The Beer project  🍺** <img src="https://retina.ai/app/uploads/2020/05/neo4j.png" width="50" style="margin-left: 10px;">



As it was shown in classes, graph databases are a natural way of navegating related information. For this first project we will be taking a graph database to analyse beer and breweries!   

The project datasets are based on [kaggle](https://www.kaggle.com/ehallmar/beers-breweries-and-beer-reviews), released by Evan Hallmark. 

### **📰 Problem description**

Imagine you are working in the Data Management department of Analytics company.
Explore the database via python neo4j connector and/or the graphical tool in the NEO4J webpage. Answer the questions while adjusting the database to meet the needs of your colleagues.
Please record and keep track of your database changes, and submit the file with all cells run and with the output shown.

<br>

## **🧮 Database Schema**

<center><img src="./Homework1_Neo4J_TheBeerProject/img/graph_afterCleaningEdited.svg" width="1000"></center>

<br>

## **🔢 Questions**

1. Explore the database: get familiar with current schema, elements and other important database parameters. [1 point]
2. Adjust the database and mention reasoning behind: e.g. clean errors, remove redundancies, adjust schema as necessary. Visualize the final version of database schema. [4 points]
3. Analytics department requires the following information for the biweekly reporting: [5 points]
    1. How many reviews has the beer with the most reviews?
    2. Which three users wrote the most reviews about beers?
    3. Find all beers that are described with following words: 'fruit', 'complex', 'nutty', 'dark'.
    4. Which top three breweries produce the largest variety of beer styles?
    5. Which country produces the most beer styles?
4. Market Analysis department in your company accesses and updates the trends data on the daily basis. Given that, consider how you need to optimize the database and its performance so that the following queries are efficient. Measure performance to communicate your improvements using PROFILE before final query. Answer the following: [4 points]
    1. Using ABV score, find five strongest beers, display their ABV score and the corresponding brewery? Keep in mind that the strongest known beer is Snake Venom, and deal with the error entries in the database.
    2. Using the answer from question 2, find the top 5 distict beer styles with the highest average score of smell + feel that were reviewed by the third most productive user. Keep in mind that cleaning the database earlier should ensure correct results.
5. Answer **two out of four** of the following questions using Graph Algorithms (gds): [NB: make sure to clear the graph before using it again] For the quarterly report, Analytics department the following information. [6 points]
    1. Which two countries are most similar when it comes to their top five most produced Beer styles?
    2. Which beer is the most popular when considering the number of users who reviewed it? 
    3. ~~Users are connected together by their reviews of beers, taking into consideration the "smell" score they assign as a weight, how many communities are formed from these relationships? How many users are in the three largest communities?~~
    4. ~~Which user is the most influential when it comes to reviews of distinct beers by style?~~

</details>


<details>
  
  <summary>

  # **2️⃣ Assignment 2**

  </summary>

## **MongoDB** <img src="https://www.svgrepo.com/show/331488/mongodb.svg" width="20">

## **🔢 Questions**


<font size="8">1. Data Modelling</font>

<font size="4">Congratulations! You’ve been hired as part of the new Data Engineering and Management team in the AirBNB Business Intelligence department. The company is restructuring due to unsatisfactory performance from the previous teams.

Before leaving, the head of the Data Modelling department highlighted several issues:

**Data Storage**: A lot of data about AirBNB listings is stored in a single document. While this approach has some advantages, it has also caused performance issues. Queries are slow, and the team didn’t apply patterns, which could improve performance by optimizing the data model. Indexes were also not used.

**Reviews Growth**: The number of reviews for AirBNB is growing rapidly. Currently, we overwrite reviews regularly, but the Business Intelligence department will benefit from storing all reviews and analyzing them over time.

**Data Errors**: There are errors in the data collection, such as duplicate data entries and incorrect timestamps for transactions. The new team will need to decide how to fix these issues.

**Your Role**: In your new role, you’ll need to consider how each database query is used, how often it is needed, and its impact on reads and writes. You should update the database schema to optimize for business use cases. Use tools like embedding, linking, indexes, and patterns to improve the data model. You may need to create new fields, documents, or collections. Be sure to document the pattern you’re applying and the reasons behind your decisions, especially when dealing with duplication and risks of outdated data.

**Key tasks include**:

1. Streamlining the data collection process.
2. Cleaning up the data and optimizing what will be returned for each use case.
3. Applying the correct patterns to speed up common queries.
4. Ensuring departments get accurate and relevant information from the database.
5. Sharing the updated data model schema with other departments.

**Good Practices**: [Check Chapter 6, Mastering MongoDB]

1. All newly created fields should have capitalized names.
2. New queries should work with the most up-to-date database version. If you make multiple changes, all queries should still work after the final updates.
3. For some queries, you may need to change the database schema.
4. When you are applying specific patterns, like polymorphic, subset, or bucket, name them accordingly. 
5. Document each major transformation using this format:
*“We applied {transformation name} because {reasoning behind it}. We expect {change/result} based on {observable measure, such as query speed, number of documents returned, index use, etc.}.”*

</font>


**Data Cleanup and Schema Adjustments:** [9 points in total]

1) Before working on the queries below, review the data and adjust the schema based on the typical use case described.

**Typical Use Case**: The most common use of the database is to show property listing information to customers. A query retrieves a listing document from the database. Currently, retrieving a listing takes too long. Decide what information should be included in a typical query and optimize the structure accordingly. For example, customers usually only need a sample of reviews, not all reviews (even though all reviews are stored). They also don’t need past transaction data. Update the document schema to fit this use case. This might involve creating new collections or documents.

**Data Cleanup**: Review the data for any errors (such as transactions that don’t belong to the listing) or unnecessary duplication, and clean it up where needed.

**Standard Difficulty Questions:** [2 points per question]

2)	Once a month, we reward hosts with recognition. Select three superhosts with at least two listings that can accommodate more than four people.

3)	The company considers inevsting into property to rent. Which bed type is most common in listings with a waterfront and a dishwasher in New York?

4)	We're considering hiring someone to write reviews professionally. Who wrote the longest review in New York?

5)	To assess the security of different areas, what is the biggest and smallest (price-security deposit) difference per number of visitors at a property?

6)  Identify areas by whether they are typically used for short breaks, like weekend mini breaks, or whether they are more suitable for long trips. This information support targeted advertising of different customer types. It is not expected to change much over time so we won’t look to update it, we just require current view. What is the average duration of stay (in nights) per type of property per city (you can use the maximum_nights to measure length of stays)? For each property type return the city with the highest and lowest average value.

**Advanced Difficulty Questions (Consider database optimization for these queries):** [3 points per question]

7)	We are creating a new webpage for hosts when setting up their account. It will list suggested typical amenities. This data will need to be available every time a host registers a property but is not expected to change very much. The starting point for the list will be all unique amenities currently listed in properties (across all documents). Optimise the database for this use case and show how the data should be queried.

8)	We plan to rtack our reviewers better. We want to create a webpage that shows the top 20 reviewers and the count of the number of reviews of each of these reviewers. This webpage should be kept up to date. It should also have a link to return the number of reviews for a given reviewer ID or Name (show how to query for number of reviews by ID or query quickly).

9)	For each property we store review scores across different metrics (accuracy, check-in, cleanliness etc). We consider adding more metrics, although there is no clarity on what these will be. We want to be able to easily query the average score across all of these metrics, including any new metrics that might be added without changing the query. Adjust the data model so this can be done and show the query for an example property.

10)	We aim to have better access to information about transaction, we wish to develop a search engine that can calculate the average value of transactions in a given period of time quickly for a given property.

11)	We wish to have a summary webpage that displays information about our top destinations. This webpage should display for each of the top 10 cities some basic information about our operations in the area (number of properties by type for example, average price by type) but you can choose the metrics. For each of the top 10 cities it should also provide some basic information about the top 3 properties in each city (price, number of review, whatever you think useful) to show an example of the properties available in the area. We would like to keep this webpage up to date as information changes.

**Database updates:** [2 points per question]

After optimizing the database, show how to complete the following updates. You can create fictional data. Ensure that previous data does not become stale:

12) Add a new property with a new host in one of the top 10 cities. The host selects the top 10 most common amenities to list.

13) Add a new review from one of our top 20 reviewers for this new property.

14) Add a new review metric called 'x_factor' with a score of 10. Show that the average score across all metrics is correctly calculated for this listing, using the previously developed query.

</details>
