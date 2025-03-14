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

## **🍺 The Beer project  🍺** 

As it was shown in classes, graph databases are a natural way of navegating related information. For this first project we will be taking a graph database to analyse beer and breweries!   

The project datasets are based on [kaggle](https://www.kaggle.com/ehallmar/beers-breweries-and-beer-reviews), released by Evan Hallmark. 

### **📰 Problem description**

Imagine you are working in the Data Management department of Analytics company.
Explore the database via python neo4j connector and/or the graphical tool in the NEO4J webpage. Answer the questions while adjusting the database to meet the needs of your colleagues.
Please record and keep track of your database changes, and submit the file with all cells run and with the output shown.

<br>

## **🧮 Database Schema**

<center><img src="./img/graph_afterCleaning.svg" width="1000"></center>

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
    3. Users are connected together by their reviews of beers, taking into consideration the "smell" score they assign as a weight, how many communities are formed from these relationships? How many users are in the three largest communities? 
    4. Which user is the most influential when it comes to reviews of distinct beers by style?

