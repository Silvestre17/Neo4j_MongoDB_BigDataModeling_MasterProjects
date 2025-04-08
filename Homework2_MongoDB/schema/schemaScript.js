db.createCollection("Hosts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Hosts",
      required: [],
      properties: {
        "_id": { bsonType: "objectId" },
        "Host_ID": { bsonType: "string" },
        "Host_Name": { bsonType: "string" },
        "Host_About": { bsonType: "string" },
        "Host_Location": { bsonType: "string" },
        "Host_Neighbourhood": { bsonType: "string" },
        "Host_Picture_URL": { bsonType: "string" },
        "Host_Thumbnail_URL": { bsonType: "string" },
        "Host_Response_Rate": { bsonType: "int" },
        "Host_Response_Time": { bsonType: "string" },
        "Host_Verifications": { bsonType: "array", items: { bsonType: "string" } },
        "Host_Has_Profile_Pic": { bsonType: "bool" },
        "Host_Identity_Verified": { bsonType: "bool" },
        "Host_Is_Superhost": { bsonType: "bool" },
        "Host_Listings_Count": { bsonType: "int" },
        "Host_Total_Listings_Count": { bsonType: "int" },
        "Host_URL": { bsonType: "string" },
      },
    },
  },
});

db.createCollection("Transactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Transactions",
      required: [],
      properties: {
        "_id": { bsonType: "objectId" },
        "Listing_ID": { bsonType: "string" },
        "Transaction_ID": { bsonType: "string" },
        "Transaction_Date": { bsonType: "date" },
        "Transaction_Price": { bsonType: "decimal" },
      },
    },
  },
});

db.createCollection("Reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Reviews",
      required: [],
      properties: {
        "_id": { bsonType: "objectId" },
        "Listing_ID": { bsonType: "string" },
        "Review_ID": { bsonType: "string" },
        "Reviewer_ID": { bsonType: "string" },
        "Review_Comments": { bsonType: "string" },
        "Review_Date": { bsonType: "date" },
      },
    },
  },
});

db.createCollection("Listings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Listings",
      required: [],
      properties: {
        "_id": { bsonType: "objectId" },
        "Listing_ID": { bsonType: "string" },
        "Host_ID": { bsonType: "string" },
        "Name": { bsonType: "string" },
        "Description": { bsonType: "string" },
        "Summary": { bsonType: "string" },
        "Space": { bsonType: "string" },
        "Property_Type": { bsonType: "string" },
        "Room_Type": { bsonType: "string" },
        "Accommodates": { bsonType: "int" },
        "Bedrooms": { bsonType: "int" },
        "Beds": { bsonType: "int" },
        "Bathrooms": { bsonType: "decimal" },
        "Bed_Type": { bsonType: "string" },
        "Price": { bsonType: "decimal" },
        "Cleaning_Fee": { bsonType: "decimal" },
        "Security_Deposit": { bsonType: "decimal" },
        "Extra_People": { bsonType: "decimal" },
        "Weekly_Price": { bsonType: "decimal" },
        "Monthly_Price": { bsonType: "decimal" },
        "Minimum_Nights": { bsonType: "int" },
        "Maximum_Nights": { bsonType: "int" },
        "Guests_Included": { bsonType: "int" },
        "Address": { bsonType: "object", title: "Address", properties: { "street": { bsonType: "string" }, "government_area": { bsonType: "string" }, "market": { bsonType: "string" }, "country": { bsonType: "string" }, "country_code": { bsonType: "string" }, "suburb": { bsonType: "string" }, "location": { bsonType: "object", title: "location", properties: { "type": { bsonType: "string" }, "coordinates": { bsonType: "array", items: { bsonType: "double" } }, "is_location_exact": { bsonType: "bool" }, }, }, }, },
        "Access": { bsonType: "string" },
        "Interaction": { bsonType: "string" },
        "House_Rules": { bsonType: "string" },
        "Amenities": { bsonType: "array", items: { bsonType: "string" } },
        "Availability": { bsonType: "object", title: "Availability", properties: { "availability_30": { bsonType: "int" }, "availability_60": { bsonType: "int" }, "availability_90": { bsonType: "int" }, "availability_365": { bsonType: "int" }, }, },
        "Calendar_Last_Scraped": { bsonType: "date" },
        "Last_Scraped": { bsonType: "date" },
        "Cancellation_Policy": { bsonType: "string" },
        "Neighborhood_Overview": { bsonType: "string" },
        "Transit": { bsonType: "string" },
        "Notes": { bsonType: "string" },
        "Images": { bsonType: "object", title: "Images", properties: { "thumbnail_url": { bsonType: "string" }, "medium_url": { bsonType: "string" }, "picture_url": { bsonType: "string" }, "xl_picture_url": { bsonType: "string" }, }, },
        "Listing_URL": { bsonType: "string" },
        "First_Review": { bsonType: "date" },
        "Last_Review": { bsonType: "date" },
        "Number_of_Reviews": { bsonType: "int" },
        "Review_Scores": { bsonType: "object", title: "Review_Scores", properties: { "Checkin": { bsonType: "int" }, "Cleanliness": { bsonType: "int" }, "Communication": { bsonType: "int" }, "Location": { bsonType: "int" }, "Rating": { bsonType: "double" }, "Value": { bsonType: "int" }, }, },
        "Review_Scores_Avg (Extra)": { bsonType: "double" },
        "Transactions": { bsonType: "object", title: "Transactions", properties: { "bucket_end_date": { bsonType: "date" }, "bucket_start_date": { bsonType: "date" }, "transaction_count": { bsonType: "int" }, }, },
      },
    },
  },
});

db.createCollection("Reviewers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Reviewers",
      required: [],
      properties: {
        "_id": { bsonType: "string" },
        "Reviewer_ID": { bsonType: "string" },
        "Reviewer_Name": { bsonType: "string" },
        "ReviewsCount (Extra)": { bsonType: "int" },
      },
    },
  },
});

db.createCollection("Amenities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Amenities",
      required: [],
      properties: {
        "_id": { bsonType: "objectId" },
        "Amenity": { bsonType: "string" },
      },
    },
  },
});

db.createCollection("CitySummary", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "CitySummary",
      required: [],
      properties: {
        "_id": { bsonType: "string" },
        "City": { bsonType: "string" },
        "PropertyCount": { bsonType: "int" },
        "AvgPrice": { bsonType: "double" },
        "TopProperties": { bsonType: "array", items: { bsonType: "object" } },
      },
    },
  },
});