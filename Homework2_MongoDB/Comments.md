Okay, let's refine the comments and address the points you've highlighted. I'll provide the Markdown sections to insert into your notebook.

**General Note:** Remember to replace the existing `ATENÇÃO`, `COMENTAR`, `CERTO`, etc., comments with the relevant Markdown blocks provided below.

---

**Markdown block to insert AFTER cell `In [189]` (Field Extraction):**

```markdown
### Initial Data Inspection and Findings

The initial inspection of a sample document and the extraction of all unique field paths reveal a complex, deeply nested structure within the `listingsAndReviews_HW2` collection. We identified **121 unique field paths**, indicating a potentially large document size and complexity. Key findings include:

1.  **Embedded Data:** Significant amounts of data are embedded directly within each listing document:
    *   **Host Information:** All details about a host (`host_name`, `host_about`, `host_location`, etc.) are duplicated across every listing managed by that host.
    *   **Reviews:** A large array of `reviews` (and redundant `reviews_copy*` fields) is embedded, potentially containing hundreds of reviews per listing. This contributes significantly to document size and violates the MongoDB recommendation against unbounded arrays.
    *   **Transactions:** Transaction data is nested within a `transactions` object, including an array of individual transaction details.

2.  **Redundancy:** The presence of `reviews_copy1` through `reviews_copy4` fields strongly suggests unnecessary data duplication, increasing storage requirements and complicating data consistency.

3.  **Potential Performance Issues:** The large average document size (around 67 KB, likely much larger for listings with many reviews/transactions) and the need to fetch entire documents even for simple listing views align with the performance problems mentioned in the assignment brief (slow queries). Retrieving and processing these large documents is inefficient.

4.  **Data Type Inconsistencies:** Several fields identified (like `maximum_nights`, price-related fields) were stored as strings or `Decimal128` where `int` or `double`/`decimal` would be more appropriate for querying and aggregation.

These observations confirm the need for schema refactoring to address performance, scalability (especially for reviews), and data integrity, as outlined in the assignment's "Data Modelling" section.
```

---

**Markdown block to insert BEFORE cell `In [192]` (Comparing Reviews):**

```markdown
#### 1.1 | Confirm and Remove Redundant Review Copies

We first address the obvious data redundancy issue. We suspect the `reviews_copy*` fields are duplicates of the main `reviews` array. We will verify this and then remove them.

**Verification:**
```

---

**Markdown block to insert AFTER cell `In [192]` (Comparing Reviews):**

```markdown
**Result:** The query confirms that for all documents, the content within `reviews_copy*` arrays is identical to the main `reviews` array. This confirms they are redundant.

**Cleanup:** We will now remove these redundant fields.
```

---

**Markdown block to insert AFTER cell `In [194]` (Deletion of Review Copies):**

```markdown
_“We applied **data cleanup by removing redundant fields** (`reviews_copy1` to `reviews_copy4`) because the verification query confirmed they contained identical data to the `reviews` field, leading to unnecessary storage consumption and potential update anomalies. We expect a **reduction in the total collection size and average document size**, leading to **faster reads and writes** when accessing listing documents, as less data needs to be processed or transferred.”_

The successful removal of these fields is confirmed by the verification query showing 0 documents containing them.
```

---

**Markdown block to insert AFTER cell `In [200]` (Checking Bathrooms):**

```markdown
**Analysis:** The `bathrooms` field contains `Decimal128` values, including halves (e.g., 0.5, 1.5, 2.5). According to Airbnb's help center and community discussions (e.g., [How to calculate Bathrooms](https://community.withairbnb.com/t5/Advice-on-your-space/How-to-calculate-Bathrooms/td-p/1437848)), a value of 0.5 typically represents a half-bath (toilet only, no shower/bath).

**Decision:** We will **keep `bathrooms` as `Decimal128`** (or potentially convert to `double` if precision isn't critical) as the fractional values hold specific meaning within the Airbnb context and represent valid data points. We will not convert it to `int`.
```

---

**Markdown block to insert AFTER cell `In [201]` (Converting Guests Included):**

```markdown
**Analysis:** The `guests_included` field represents the number of guests included in the base price, which should logically be an integer. The `extra_people` field represents the *monetary charge* for additional guests, making `Decimal128` the appropriate type to handle currency values precisely.

**Decision & Transformation:**
_“We applied **data type conversion** to the `guests_included` field, changing it from `Decimal128` to `int`, because it represents a count of people, which is inherently an integer. We expect **improved type consistency and potentially slightly more efficient storage and querying** for this field. The `extra_people` field remains `Decimal128` as it represents a monetary value.”_
```

---

**Markdown block to insert AFTER cell `In [203]` (Converting Price Fields):**

```markdown
_“We applied **data type conversion** to the price-related fields (`price`, `security_deposit`, `cleaning_fee`, `weekly_price`, `monthly_price`), ensuring they are consistently stored as `Decimal128` (or `double`), because these represent monetary values. Handling `null` or missing values appropriately during conversion (e.g., defaulting to `null` or `0.0` if applicable) ensures accurate financial calculations. We expect **improved query performance for range/comparison queries on prices and reliable aggregation results (like averages)**.”_

Note: `weekly_price` and `monthly_price` often appear as `None` after conversion, indicating they were originally missing or `null`, which is expected.
```

---

**Markdown block to insert AFTER cell `In [204]` (Converting Transaction Price):**

```markdown
_“We applied **data type conversion** within the nested `transactions.transactions` array, converting the `price` field from `string` to `Decimal128`, because it represents a monetary value. This requires iterating through the array using `$map` within an update pipeline. We expect **accurate financial aggregations (like averages in Q10) and consistent data types** across all transaction records.”_
```

---

**Markdown block to insert AFTER cell `In [205]` (Checking Transit):**

```markdown
**Analysis:** The `transit` field often contains long, descriptive text about transportation options. While potentially useful, it's unstructured.

**Decision:** For the primary use case (displaying listing info quickly), splitting this into an array or further structuring it isn't essential and adds complexity. We will **leave the `transit` field as a string** for now. If specific queries targeting transportation modes arise later, further refinement could be considered.
```

---

**Markdown block to insert AFTER cell `In [208]` (Verifying Missing Data Cleanup):**

```markdown
**Analysis:** The initial check revealed numerous fields with missing (`null`) or empty string (`""`) values, particularly for optional details like `notes`, `interaction`, `host_about`, `security_deposit`, and pricing fields (`weekly_price`, `monthly_price`).

_“We applied **data cleanup by removing missing/empty fields** using `$unset` for fields identified with `null` or `""` values, because these values often provide no information and can interfere with queries (e.g., type checking, `$exists`). We expect **cleaner data, slightly reduced document size, and more predictable query behavior** when filtering or checking for field existence.”_

The verification confirms that `null` and `""` values were successfully unset from the documents. Fields listed as having `0` remaining `null` or `""` values (where `$exists: true`) are now clean in that regard.
```

---

**Markdown block to insert AFTER cell `In [215]` (Checking Review Score Outliers):**

```markdown
**Analysis:** The `review_scores_rating` field shows values up to 100, while other `review_scores_*` fields (checkin, cleanliness, etc.) are consistently between 0-10. This suggests `review_scores_rating` uses a different scale (0-100).

**Decision & Transformation:**
_“We applied **data normalization** to the `review_scores_rating` field by dividing its value by 10, because its range (0-100) was inconsistent with other review scores (0-10). We expect **consistent scaling across all review score metrics**, enabling meaningful calculation of averages (as required in Q9).”_

The verification query confirms that no `review_scores_rating` values are now greater than 10.
```

---

**Markdown block to insert BEFORE cell `In [217]` (Dropping Collections):**

```markdown
### 1.5 | Data Model Adjustments: Implementing the New Schema

Based on the Workload, Relationships, and Patterns analysis, we will now implement the new schema design by creating separate collections for `Hosts`, `Reviews`, and `Transactions`, and restructuring the `Listings` collection.

**Overall Strategy:** Move large, unbounded, or independently accessed data (reviews, host details, transactions) out of the main listing document into their own collections, using references (`Host_ID`, `Listing_ID`, `Reviewer_ID`) to link them. This applies the **Outlier Pattern** to handle the large `reviews` and `transactions` arrays and improves data normalization for `Hosts`. Key listing information, including a subset of reviews (if needed, though not implemented here as Q1 didn't explicitly ask for *displaying* sample reviews, just optimizing the fetch) and structured `Review_Scores`, will remain embedded in the `Listings` collection for the primary read use case.

We start by dropping any potentially existing target collections to ensure a clean state.
```

---

**Markdown block to insert AFTER cell `In [221]` (Creating Reviews Index):**

```markdown
_“We applied the **Outlier Pattern** by creating a separate `Reviews` collection, moving the unbounded `reviews` array out of the main listing document. This addresses the performance bottleneck caused by large documents and accommodates the expected growth in reviews. Each document in `Reviews` represents a single review and contains a `Listing_ID` reference. We expect **significantly faster reads for the main `Listings` collection**, **improved scalability for storing reviews**, and **efficient querying of reviews based on `Listing_ID`** due to the added index.”_
```

---

**Markdown block to insert AFTER cell `In [224]` (Creating Reviewers Index):**

```markdown
_“We applied the **Computed Pattern** by creating a `Reviewers` collection. This collection stores unique reviewer information (`Reviewer_ID`) and pre-aggregates the list of reviews they have written (`Review_IDs`). This avoids repeatedly scanning the potentially large `Reviews` collection just to count reviews per reviewer (addressing Q8). We expect **very fast lookups for reviewer information and their total review count** using the indexed `Reviewer_ID`.”_
```

---

**Markdown block to insert AFTER cell `In [229]` (Creating Hosts Index):**

```markdown
_“We applied **Data Normalization** by creating a separate `Hosts` collection. This eliminates the duplication of host information previously embedded in each listing document. Each document in `Hosts` represents a unique host, identified by `Host_ID`, and is referenced from the `Listings` collection. We expect **improved data integrity (updates to host info only need to happen in one place), reduced overall storage**, and **efficient querying of host-specific information** using the indexed `Host_ID`.”_
```

---

**Markdown block to insert AFTER cell `In [235]` (Creating Transactions Index):**

```markdown
_“We applied the **Outlier Pattern** by creating a separate `Transactions` collection, moving the potentially large and time-sensitive `transactions.transactions` array out of the main listing document. This isolates transaction data for focused querying (like in Q10). Each document represents a single transaction and includes a `Listing_ID` reference. We expect **faster reads for the main `Listings` collection**, **improved performance for time-based queries on transactions** (especially with the index on `Listing_ID` and potentially `Transaction_Date`), and **better scalability for transaction data**.”_

**Note on Bucket Info:** We decided to *keep* the `transactions.bucket_end_date`, `transactions.bucket_start_date`, and `transactions.transaction_count` fields within the main `Listings` collection (under the `Transactions` subdocument, but without the nested `transactions` array). These fields provide a useful summary about the transaction history associated with the listing, which might be needed for display without querying the full `Transactions` collection. This represents a slight application of the **Subset Pattern** for transaction metadata.
```

---

**Markdown block to insert AFTER cell `In [241]` (Creating Listings Index):**

```markdown
_“We applied **schema restructuring** to create the final `Listings` collection. This involved **removing embedded host details, the full reviews array, and the detailed transactions array**, replacing them with references (`Host_ID`). We **restructured the `review_scores_*` fields into a `Review_Scores` subdocument**, applying the **Attribute Pattern** for flexibility (Q9). Key identifying information (`Listing_ID`), frequently accessed data (`Name`, `Price`, `Address`, `Amenities`, etc.), and summary transaction info remain embedded. We expect **significantly faster retrieval of core listing information** for the primary customer-facing use case (Q1), as documents are much smaller. The restructured `Review_Scores` allows for flexible querying of score averages.”_

The new collection structure is now in place.
```

---

Okay, let's enhance the comparison comments to include quantitative speed differences.

---

**Markdown block to insert AFTER cell `In [245]` (Q2 Result):**

```markdown
**Comparison (Q2):** The new schema query uses a `$lookup` to join `Hosts` and `Listings`. While lookups can introduce overhead compared to querying a single collection, this approach maintains normalized data by avoiding host information duplication. The execution time in the new schema (0.049s) is slightly slower than the original (0.021s) for this specific query. This is expected due to the join operation, however, the trade-off ensures data integrity and avoids redundancy. Indexing `Host_ID` helps mitigate the lookup cost.
```

---

**Markdown block to insert AFTER cell `In [248]` (Q3 Result):**

```markdown
**Comparison (Q3):** Both queries yield the same result ("Real Bed", count 75). The new schema query targets the optimized `Listings` collection. Performance is slightly faster in the new schema (0.055s vs 0.073s in the original), representing an improvement of approximately **24.7%** (or about **1.3 times faster**). This indicates that querying the leaner `Listings` collection, even with similar filtering logic, provides a performance benefit.
```

---

**Markdown block to insert AFTER cell `In [251]` (Q4 Result):**

```markdown
**Comparison (Q4):** The new schema query involves lookups between `Reviews`, `Listings` (for the market filter), and potentially `Reviewers`. Although separating collections often improves performance for targeted reads, the multiple `$lookup` stages required here introduce significant overhead. This resulted in a considerably longer execution time ($17.8\s$ vs $0.09\s$ in the original). While indexing helps, the cost of joining large collections for this specific query outweighs the benefit of smaller individual documents in the `Reviews` collection. For frequent queries like this, further optimization (like denormalizing the reviewer name into the `Reviews` collection or creating materialized views) might be considered in a real-world scenario.
```

---

**Markdown block to insert AFTER cell `In [254]` (Q5 Result):**

```markdown
**Comparison (Q5):** Both queries produce the same min (0.0) and max (48842.0) difference per visitor. The new schema query runs on the cleaner, smaller documents of the `Listings` collection. This resulted in a faster execution time (0.025s vs 0.039s in the original), an improvement of approximately **35.9%** (or about **1.6 times faster**). This demonstrates the efficiency gains from operating on more compact documents during aggregation stages.
```

---

**Markdown block to insert AFTER cell `In [257]` (Q6 Result):**

```markdown
**Comparison (Q6):** Both queries yield the same results for highest and lowest average maximum nights per property type/city. The new schema query targets the `Listings` collection. Performance is noticeably faster (0.028s vs 0.040s in the original), representing an improvement of **30%** (or about **1.4 times faster**). This improvement is likely due to the more streamlined documents in the `Listings` collection being processed during the aggregation.
**Note on `maximum_nights` Outliers:** As requested, the query uses the average of `maximum_nights`. However, we observed extreme maximum values (e.g., 2147483647, likely default or error values) which heavily skew the averages (like the ~5 million average for Apartments in Istanbul). For a more robust real-world analysis of typical stay lengths, using the *median* `maximum_nights` or filtering out extreme outliers might be preferable, but we adhere to the prompt's use of the average.
```

---

**Markdown block to insert AFTER cell `In [277]` (Q11 Result):**

```markdown
**Optimization & Update Strategy (Q11):**
_“We query the optimized `Listings` collection to generate the summary data. This direct aggregation is slightly faster than querying the original monolithic collection (0.075s vs 0.084s, an improvement of **10.7%** or **1.1 times faster**) due to smaller documents. However, the requirement to **keep this webpage up to date** suggests further optimization using the **Computed Pattern**. A separate `CitySummary` collection could be created and periodically updated (e.g., using `$merge` or `$out` in a scheduled task) with the results of this aggregation pipeline. The webpage would then query this much smaller, pre-aggregated `CitySummary` collection for **near-instantaneous loading**. For this exercise, we demonstrate the direct aggregation on the `Listings` collection.”_
```