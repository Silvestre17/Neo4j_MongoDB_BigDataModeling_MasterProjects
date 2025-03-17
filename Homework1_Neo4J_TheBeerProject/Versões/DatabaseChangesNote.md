(Added by JH)
#### Additional considerations regarding data base structure changes 

##### 1. Possibility of converting labels to properties 
- During the analysis of the database structure, we noted some labels that could potentially be reduced to a property in another label. In particularly, transforming the label **`STYLE`** into a **`BEER`** property.
- As each **`BEER`** only has a single **`STYLE`** and there are no orphaned STYLE nodes, applying this change would provide a few advantages like the simplification of the database, allow for faster querying and reduce redundancy. Additionally, it would allow us to take full advantage of the flexibility provided by the NEO4J graph database.
- However, after considering the cons associated with this transformation, we decided against it. The main reason being that this change would pose a chalenge to the application of graph algorithms as many of these require explicit node relationships for the graph projection. 
- Hence implementing this type of changes could make it harder to run the graph algorithms required to answer the questions posed by the business in the component 5 of the assignment. 

##### 2. Possibility of converting properties to labels
- We also considered the possibility of converting some properties into labels. For example, the **state** property of the **`BEER`** label could be converted into a label.
- However, this change would not be beneficial for the business as it would not provide any advantages in terms of query performance or graph algorithms considering the questions asked by the business in the compoments 5 or 3 of the assignment.
- Hence implementing these changes would increase graph complexity while potentially leading to redundant relationships 