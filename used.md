Below is the content of a Markdown file that separates all your GraphQL operations into two sections—**Queries** and **Mutations**. You can save the content into a file (for example, `graphql-operations.md`).

---

````md
# GraphQL Queries and Mutations

This document contains all the GraphQL queries and mutations separated into two sections.

---

## Queries

### Query 1: getAddressesByUserId

```graphql
query {
  getAddressesByUserId(userId: "$userId") {
    id
    name
    address
    userId
    latitude
    longitude
    additional
  }
}
```
````

### Query 2: getBookingsByUser

```graphql
query {
  getBookingsByUser(userId: "$userId") {
    id
    userId
    providerId
    productId
    date
    time
    address
    bookingNumber
    status
    hours
    type
    newPrice
    securityCode
  }
}
```

### Query 3: getAcceptedBookingsByProvider

```graphql
query {
  getAcceptedBookingsByProvider(providerId: "$providerId"${date != null ? ', date: "$date"' : ''}) {
    id
    date
    time
    bookingNumber
    status
    hours
    type
  }
}
```

### Query 4: getBookingsByProvider

```graphql
query {
  getBookingsByProvider(providerId: "$providerId") {
    id
    userId
    providerId
    productId
    date
    time
    address
    bookingNumber
    status
    hours
    type
    securityCode
  }
}
```

### Query 5: getBookingDetail

```graphql
query {
  getBookingDetail(bookingId: "$bookingId") {
    booking {
      id
      status
      date
      time
      bookingNumber
      hours
      type
      newPrice
      securityCode
    }
    user {
      firstName
      lastName
      email
    }
    address {
      name
      address
      additional
    }
    provider {
      id
      firstName
      lastName
      email
    }
    product {
      id
      title
      image
      rate
      rating
      includeSupplies
      includeTools
      mainCategory {
        id
        title
        color
      }
      subCategory {
        id
        title
        color
      }
    }
  }
}
```

### Query 6: getFavoriteProductsByUserId

```graphql
query {
  getFavoriteProductsByUserId(userId: "$userId") {
    productId
  }
}
```

### Query 7: getOffers

```graphql
query {
  getOffers {
    id
    title
    subtitle
    discount
    appLink
    products {
      id
      title
      description
      image
      rate
      discount
    }
    categoryId {
      id
      title
      image
    }
    imageUrl
    isActive
    creationDate
    updateDate
    expirationDate
  }
}
```

### Query 8: getOffer

```graphql
query {
  getOffer(id: "$offerId") {
    id
    title
    subtitle
    discount
    appLink
    products {
      id
      title
      description
      image
      rate
      discount
    }
    categoryId {
      id
      title
      image
    }
    imageUrl
    isActive
    creationDate
    updateDate
    expirationDate
  }
}
```

### Query 9: getServiceCategories (with color)

```graphql
query {
  getServiceCategories {
    id
    title
    image
    color
  }
}
```

### Query 10: getSubCategoriesByCategory

```graphql
query {
  getSubCategoriesByCategory(categoryId: "$categoryId") {
    id
    title
    image
    color
    categoryId
  }
}
```

### Query 11: getProductsBySubCategory

```graphql
query {
  getProductsBySubCategory(subCategoryId: "$subCategoryId") {
    id
    providerId
    title
    image
    description
    rate
    rating
    jobs
    discount
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Query 12: getProduct (detailed)

```graphql
query {
  getProduct(id: "$productId") {
    id
    providerId
    title
    image
    description
    rate
    rating
    jobs
    discount
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Query 13: getServiceCategory

```graphql
query {
  getServiceCategory(id: "$categoryId") {
    id
    title
    image
    color
  }
}
```

### Query 14: getSubCategory

```graphql
query {
  getSubCategory(id: "$subCategoryId") {
    id
    title
    image
    color
    categoryId
  }
}
```

### Query 15: getAllCategoriesAndSubCategories

```graphql
query {
  getAllCategoriesAndSubCategories {
    id
    title
    subCategories {
      id
      title
    }
  }
}
```

### Query 16: getProductDetail

```graphql
query {
  getProductDetail(id: "$productId") {
    provider {
      id
    }
    title
    image
    description
    rate
    rating
    jobs
    mainCategory {
      title
    }
    subCategory {
      title
    }
    includeSupplies
    includeTools
  }
}
```

### Query 17: searchCategories

```graphql
query {
  searchCategories(searchTerm: "$searchTerm") {
    ... on ServiceCategory {
      id
      title
      image
      color
    }
    ... on SubCategory {
      id
      title
      image
      color
      categoryId
    }
  }
}
```

### Query 18: getDiscountedProducts

```graphql
query {
  getDiscountedProducts(discount: $discount, categoryId: "$categoryId") {
    id
    providerId
    title
    image
    description
    rate
    rating
    jobs
    discount
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Query 19: getProvider

```graphql
query {
  getProvider(id: "$providerId") {
    id
    firstName
    lastName
    image
    phone
    email
    firebaseId
  }
}
```

### Query 20: getProviderPreferences

```graphql
query {
  getProviderPreferences(providerId: "$providerId") {
    workingHours {
      startTime
      endTime
    }
  }
}
```

### Query 21: getProviderFCMTokenById

```graphql
query {
  getProviderFCMTokenById(id: "$providerId")
}
```

### Query 22: getReviewsByProduct

```graphql
query {
  getReviewsByProduct(productId: "$productId") {
    id
    rating
    comment
    date
    userId
  }
}
```

### Query 23: getReviewsWithDetailsByProduct

```graphql
query {
  getReviewsWithDetailsByProduct(productId: "$productId") {
    id
    rating
    comment
    date
    user {
      id
      firstName
      lastName
      profilePicture
    }
  }
}
```

### Query 24: getUserFCMTokenById

```graphql
query {
  getUserFCMTokenById(id: "$userId")
}
```

### Query 25: getBookingsByProvider (repeat)

```graphql
query {
  getBookingsByProvider(providerId: "$providerId") {
    id
    userId
    providerId
    productId
    date
    time
    address
    bookingNumber
    status
    hours
    type
    securityCode
  }
}
```

### Query 26: getBookingDetail (detailed version)

```graphql
query {
  getBookingDetail(bookingId: "$bookingId") {
    booking {
      id
      status
      date
      time
      bookingNumber
      type
      hours
      securityCode
    }
    user {
      firstName
      lastName
      email
      profilePicture
      firebaseId
    }
    address {
      latitude
      longitude
      address
      additional
    }
    provider {
      firstName
      lastName
      email
      firebaseId
    }
    product {
      title
      rate
      rating
      mainCategory {
        title
        color
      }
      subCategory {
        title
        color
      }
    }
  }
}
```

### Query 27: getProductsByProvider

```graphql
query {
  getProductsByProvider(providerId: "$providerId") {
    id
    providerId
    title
    image
    description
    rate
    rating
    jobs
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Query 28: getServiceCategories (simplified)

```graphql
query {
  getServiceCategories {
    id
    title
    image
  }
}
```

### Query 29: getSubCategoriesByCategory (simplified)

```graphql
query {
  getSubCategoriesByCategory(categoryId: "$categoryId") {
    id
    title
    image
  }
}
```

### Query 30: getProduct (simplified)

```graphql
query {
  getProduct(id: "$productId") {
    id
    title
    description
    rate
    providerId
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Query 31: getSubCategory (simplified)

```graphql
query {
  getSubCategory(id: "$subCategoryId") {
    id
    categoryId
    image
    title
  }
}
```

### Query 32: providerExists

```graphql
query {
  providerExists(firebaseId: "$firebaseId")
}
```

### Query 33: getProviderByFirebaseId

```graphql
query {
  getProviderByFirebaseId(firebaseId: "$firebaseId") {
    id
    firstName
    lastName
    email
    phone
    firebaseId
    image
  }
}
```

### Query 34: getProviderPreferences (repeat)

```graphql
query {
  getProviderPreferences(providerId: "$providerId") {
    workingHours {
      startTime
      endTime
    }
  }
}
```

### Query 35: getProviderFCMTokenById (repeat)

```graphql
query {
  getProviderFCMTokenById(id: "$providerId")
}
```

### Query 36: getReviewsWithDetailsByProvider

```graphql
query {
  getReviewsWithDetailsByProvider(providerId: "$providerId") {
    id
    rating
    comment
    date
    user {
      id
      firstName
      lastName
      email
      phoneNumber
      firebaseId
      profilePicture
    }
    category
    subCategory
    provider {
      id
      firstName
      lastName
      email
      phone
      image
      rating
      firebaseId
    }
    servicesCount
  }
}
```

### Query 37: getUserById

```graphql
query {
  getUserById(id: "$userId") {
    id
    firstName
    lastName
    email
    phoneNumber
  }
}
```

### Query 38: getUserFCMTokenById (repeat)

```graphql
query {
  getUserFCMTokenById(id: "$userId")
}
```

---

## Mutations

### Mutation 1: createBooking

```graphql
mutation {
  createBooking(
    userId: "$userId"
    providerId: "$providerId"
    productId: "$productId"
    date: "${date.toIso8601String()}"
    time: "$time"
    address: "$address"
    hours: "$hours"
    type: "$type"
  ) {
    id
    userId
    providerId
    productId
    date
    time
    address
    bookingNumber
    status
    hours
    type
    securityCode
  }
}
```

### Mutation 2: updateBookingStatus

```graphql
mutation {
  updateBookingStatus(id: "$bookingId", status: "$status") {
    id
    status
  }
}
```

### Mutation 3: addFavoriteProduct

```graphql
mutation {
  addFavoriteProduct(userId: "$userId", productId: "$productId") {
    id
  }
}
```

### Mutation 4: removeFavoriteProduct

```graphql
mutation {
  removeFavoriteProduct(userId: "$userId", productId: "$productId") {
    id
  }
}
```

### Mutation 5: createReview

```graphql
mutation {
  createReview(
    productId: "$productId"
    userId: "$userId"
    categoryId: "$categoryId"
    subCategoryId: "$subCategoryId"
    bookingId: "$bookingId"
    rating: $rating
    comment: "${comment ?? ''}"
  ) {
    id
  }
}
```

### Mutation 6: updateBookingStatus (with notes)

```graphql
mutation {
  updateBookingStatus(id: "$bookingId", status: "$status", notes: "$notes") {
    id
    status
    notes
  }
}
```

### Mutation 7: createProduct

```graphql
mutation {
  createProduct(
    providerId: "$providerId"
    title: "$title"
    image: "$image"
    description: "$description"
    rate: $rate
    mainCategory: "$mainCategory"
    subCategory: "$subCategory"
    includeSupplies: $includeSupplies
    includeTools: $includeTools
  ) {
    id
    title
    image
    description
    rate
    rating
    jobs
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Mutation 8: updateProduct

```graphql
mutation {
  updateProduct(
    id: "$productId"
    title: "$title"
    image: "$image"
    description: "$description"
    rate: $rate
    mainCategory: "$mainCategory"
    subCategory: "$subCategory"
    includeSupplies: $includeSupplies
    includeTools: $includeTools
  ) {
    id
    title
    image
    description
    rate
    rating
    jobs
    mainCategory
    subCategory
    includeSupplies
    includeTools
  }
}
```

### Mutation 9: createProvider

```graphql
mutation {
  createProvider(
    firstName: "$firstName"
    lastName: "$lastName"
    email: "$email"
    phone: "$phone"
    image: "$image"
    firebaseId: "$firebaseId"
  ) {
    id
  }
}
```

### Mutation 10: updateProvider

```graphql
mutation {
  updateProvider(
    id: "$id"
    firstName: "$firstName"
    lastName: "$lastName"
    email: "$email"
    phone: "$phone"
    image: "$image"
  ) {
    id
    firstName
    lastName
    email
    phone
    image
  }
}
```

### Mutation 11: setWorkingHours

```graphql
mutation {
  setWorkingHours(
    providerId: "$providerId"
    startTime: "$startTime"
    endTime: "$endTime"
  ) {
    workingHours {
      startTime
      endTime
    }
  }
}
```

### Mutation 12: updateProviderFCMToken

```graphql
mutation {
  updateProviderFCMToken(providerId: "$providerId", fcmToken: "$fcmToken") {
    id
  }
}
```

---

```

You now have all your GraphQL operations organized into one Markdown file with separate sections for queries and mutations.
```
