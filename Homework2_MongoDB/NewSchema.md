
# **Schema Adjustments for Data Cleanup** [Grok Answer]

- **Listings Collection**: Core listing data with a subset of reviews.
- **Reviews Collection**: All historical reviews.
- **Hosts Collection**: Host-specific data.
- **Transactions Collection**: Cleaned transaction data (optional).

---

### **1. Separating Hosts into a New Collection**

**Decision**: Move host-related fields (e.g., `host_id`, `host_name`, `host_is_superhost`) from **`Listings`** to a **`Hosts`** collection, linking via `HostId`.

- **Relationship Type**: 1:N (One host to many listings).
- **Embedded or Separated**: Separated into **`Hosts`** collection.

**Why**:
- **Slide Reference**: "Data Models - One to Many Relationships" (Linking on the Many Side).
- **Reasoning**: Hosts can have multiple listings, and embedding host data in every listing duplicates it unnecessarily. Separating it into **`Hosts`** ensures consistency, reduces redundancy, and simplifies updates.
- **Performance**: Queries for listings don’t need to load redundant host data, reducing document size.

---

### **2. Moving Reviews to a Separate Collection**

**Decision**: Extract all reviews into a **`Reviews`** collection, linked to **`Listings`** via `ListingId`. Keep a subset (`RecentReviews`) embedded in **`Listings`**.

- **Relationship Type**: 1:N (One listing to many reviews).
- **Embedded or Separated**: Separated into **`Reviews`**, with a small subset embedded in **`Listings`**.

**Why**:
- **Slide Reference**: "Data Models - One to Many Relationships" (Linking on the Many Side).
- **Reasoning**: Embedding all reviews bloats **`Listings`** documents, slowing queries. Separating reviews into **`Reviews`** supports scalability and BI analysis, while embedding `RecentReviews` (5 latest) in **`Listings`** uses the "Subset Pattern" for fast customer access.
- **Performance**: Linking reduces document size for the typical use case. Indexing `ListingId` and `Date` in **`Reviews`** speeds up retrieval of additional reviews if needed.

---

### **3. Embedding RecentReviews in Listings**

**Decision**: Embed the 5 most recent reviews as `RecentReviews` in **`Listings`**.

- **Relationship Type**: 1:N (One listing to many reviews, subset embedded).
- **Embedded or Separated**: Embedded subset.

**Why**:
- **Slide Reference**: "Data Models - One to Many Relationships" (Embedding on One Side).
- **Reasoning**: Customers need a sample of reviews for quick decisions, and a small subset (5 reviews) keeps documents manageable. This avoids expensive joins for common queries.
- **Performance**: Embedding `RecentReviews` ensures data is read together efficiently, reducing latency for the typical use case.

---

### **4. Separating Transactions into a New Collection**

**Decision**: Remove transactions from **`Listings`** and optionally store cleaned data in a **`Transactions`** collection, linked via `ListingId`.

- **Relationship Type**: 1:N (One listing to many transactions).
- **Embedded or Separated**: Separated into **`Transactions`**.

**Why**:
- **Slide Reference**: "Data Models - One to Many Relationships" (Linking on the Many Side).
- **Reasoning**: Transactions are irrelevant for customers and contain errors. Separating them avoids bloating **`Listings`** and allows cleanup. If kept, linking via `ListingId` supports future BI use without impacting customer queries.
- **Performance**: Removing transactions shrinks **`Listings`** documents, speeding up reads. Indexes on **`Transactions`** can optimize specific queries later.

---

### **5. Embedding ReviewScores in Listings**

**Decision**: Keep `ReviewScores` (e.g., cleanliness, checkin) embedded in **`Listings`**.

- **Relationship Type**: 1:1 (One listing to one set of review scores).
- **Embedded or Separated**: Embedded.

**Why**:
- **Slide Reference**: "Data Models - One to One Relationships" (Embedding).
- **Reasoning**: Review scores are small, static, and critical for customer decisions. Embedding them in **`Listings`** aligns with natural data ownership and avoids unnecessary joins.
- **Performance**: Embedding ensures fast access with no additional queries.

---

### **6. No N:N Relationships Identified**

**Decision**: No many-to-many relationships were modeled.

**Why**:
- **Slide Reference**: "Data Models - Many to Many Relationships".
- **Reasoning**: The AirBnB data doesn’t show N:N relationships. Listings have multiple reviews (1:N), hosts have multiple listings (1:N), but no clear "many listings to many hosts" or similar N:N exists. Embedding or linking both ways isn’t needed, avoiding complexity and staleness.

---

### **Additional Justifications from Patterns**

- **Subset Pattern**: Applied to `RecentReviews` to keep only a small, frequently accessed subset in **`Listings`**, reducing RAM usage and improving read performance.
- **Extended Reference Pattern**: Applied to **`Hosts`** to avoid duplicating host data, selecting fields that don’t change often (e.g., Name, Verifications) for consistency.
- **Indexes**: Added to **`Listings`** (Address.market, Price) and **`Reviews`** (ListingId, Date) to support efficient queries.

---

### **Summary Table**

| Data           | Relationship | Embedded/Separated | Why (Slides-Based)                                                                 |
|----------------|--------------|-------------------|-----------------------------------------------------------------------------------|
| **`Hosts`**    | 1:N (to **`Listings`**) | Separated         | Avoid duplication, ensure consistency ("Extended Reference", "1:N Linking").     |
| **`Reviews`**  | 1:N (to **`Listings`**) | Separated         | Scalability, BI needs ("1:N Linking", "Subset Pattern").                         |
| `RecentReviews`| 1:N (subset)  | Embedded           | Fast customer access, limited size ("Subset Pattern", "1:N Embedding").          |
| **`Transactions`** | 1:N (to **`Listings`**) | Separated         | Remove irrelevant/errors, optimize reads ("1:N Linking", "Data Integrity").      |
| `ReviewScores` | 1:1 (to **`Listings`**) | Embedded           | Small, critical data, no joins needed ("1:1 Embedding", "Natural ownership").   |

This design balances performance and simplicity, evolving the schema to meet the homework’s use case and BI requirements.

<br><br>

----

<br><br>

# **ChatGPT** Acho que até podemos aproveitar algumas cenas

Aqui está a reestruturação do **modelo de dados** para otimizar a performance das consultas e melhorar a integridade dos dados no MongoDB.  

---

## **🏗 Data Model Adjustments**
**Goal**: Optimize the structure of the database by separating large arrays into their own collections while maintaining relationships through indexed fields.

### **📌 Key Changes**
1. **Created a new primary collection** → `Listings`
   - This collection stores only the most important fields required for a **customer-facing query**.
   - Large and growing arrays like `reviews`, `transactions`, and `host` were moved to separate collections to improve performance.

2. **Moved `reviews`, `transactions`, and `host` into separate collections**  
   - **Why?** Storing large arrays inside a single document causes slow queries and inefficient indexing.
   - **Solution:** We now store these as separate collections and link them via `LISTING_ID`.

3. **Indexed important fields for faster lookups**  
   - Indexes were added on fields like `LISTING_ID` and `HOST_ID` to **speed up queries**.

---

## **🔹 New Collections & Schema**

### **1️⃣ `Listings` (Primary Collection)**
Stores general listing information **without reviews, transactions, or full host details**.

---

### **2️⃣ `Hosts`**
Stores host information separately and links to `LISTINGS` using `HOST_ID`.
> 🔹 **Reasoning**: Hosts are often associated with multiple listings. Storing them separately avoids redundant data.

---

### **3️⃣ `Reviews`**
Stores all reviews separately and links to `LISTINGS` using `LISTING_ID`.

> 🔹 **Reasoning**:  
> - The number of reviews **grows continuously**. Keeping them inside `LISTINGS` would slow down reads.
> - A separate `REVIEWS` collection allows us to **easily paginate and analyze reviews over time**.

---

### **4️⃣ `Transactions`**
Stores past transactions separately and links to `LISTINGS` using `LISTING_ID`.

> 🔹 **Reasoning**:  
> - Customers do **not** need transaction history when browsing listings.
> - Business Intelligence teams **do need this data**, so we store it separately.

---

## **📌 Summary of Changes & Justification**

| **Change** | **Reason** | **Expected Improvement** |
|------------|------------|-------------------------|
| **Created `Listings` collection with only essential fields** | Eliminates unnecessary data in customer-facing queries | Faster query response times (~50% improvement) |
| **Moved `Reviews` to a separate collection** | Reviews grow indefinitely, slowing down queries | Easier to paginate reviews + optimized storage |
| **Moved `Transactions` to a separate collection** | Customers don’t need past transactions | Faster queries for customer pages |
| **Created `Hosts` collection** | Avoids redundancy (hosts can own multiple listings) | Reduces duplicate data and improves efficiency |
