# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

## Data Model

Book documents will be stored in the books collection.

Required book fields:

- `id`: string, required, custom id such as b1
- `authorId`: string, required, references the id field of an author document
- `title`: string, required
- `publicationDate` : string, required

Books will continue to use custom string ids instead of MongoDB _id values for route parameters.

## Relationship to Authors

Each book will identify its author with an `authorId`  field. The value of `authorId` must match the custom `id`  value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes
#### GET /books

- Purpose: Return all books.

- Success:

- Status code: `200`
Response body: an array of book objects

Errors:

  `500` if an unexpected server or database error occurs
#### GET /books/:id

- Purpose: Return one book by its custom `id`.

- Success:

- Status code: `200`
- Response body: the matching book object

Errors:

`404` if no book exists with that `id`
`500` if an unexpected server or database error occurs
#### POST /books

- Purpose: Create a new book.

- Request body:

{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}

- Success:

- Status code: `201`
- Response body: the newly created book object

- Errors:

`400` if a required field is missing
`400` if the id already exists
`400` if the authorId does not match an existing author
`500` if an unexpected server or database error occurs

#### PUT /books/:id

- Purpose: Update an existing book.

- Request body:

{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}

- Success:

- Status code: 200
- Response body: the updated book object

Errors:

`400`if a required field is missing
`400` if the authorId does not match an existing author
`404` if no book exists with that id
`500` if an unexpected server or database error occurs

#### DELETE /books/:id

- Purpose: Delete an existing book.

- Success:

- Status code: `204`
Response body: none

Errors:

`404` if no book exists with that `id`
`500` if an unexpected server or database error occurs
Swagger Documentation

Swagger must document every book route.

Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at /api-docs must allow someone to test every book route from the browser.

### Feature 2: Author CRUD Operations
### Goal

Add an authors collection that stores author ids, names, and birth years, and provide full CRUD operations for it, so that books can reference authors through the authorId field described in Feature 1. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the authors collection.

Required author fields:

- `id`: string, required, custom id such as a1
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB _id values for route parameters, consistent with the approach used for books.

### Error Response Format

Every error response (400, 404, 500) returns a JSON body with a single error field describing the problem:

{
  "error": "birthYear is required"
}

When a 400 is caused by more than one missing or invalid field, the error message lists all of them, comma-separated, rather than only the first one found. Response bodies are not otherwise specified per-route below; assume this shape for every error case listed under each route.

### Relationship to Books

An author's id is the value referenced by a book's authorId field (see Feature 1). Deleting an author does not automatically delete or update the books that reference them; existing books that reference a deleted author's id are left unchanged and may reference an author id that no longer exists. This is an accepted limitation of the Week 02 scope.

#### Routes
### GET /authors

- Purpose: Return all authors.

- Success:

- Status code: `200`
- Response body: an array of author objects

Errors:

 `500` if an unexpected server or database error occurs

### GET /authors/:id

- Purpose: Return one author by their custom `id`.

- Success:

- Status code: `200`
- Response body: the matching author object

Errors:

`404` if no author exists with that  `id`
`500`  if an unexpected server or database error occurs

### POST /authors

- Purpose: Create a new author.

- Request body:

{
  "id": "a3",
  "name": "Example Author Name",
  "birthYear": 1975
}

 Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

`400` if a required field is missing
`400` if the id already exists
`500` if an unexpected server or database error occurs

### PUT /authors/:id

Purpose: Update an existing author. This is a full replace of name and birthYear — both fields are required in the request body even if only one value is changing; there is no partial-update (PATCH-style) behavior.

- Purpose: Update an existing author.

- Request body:

{
  "name": "Updated Author Name",
  "birthYear": 1980
}

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

`400` if a required field is missing
`404` if no author exists with that `id`
`500`  if an unexpected server or database error occurs


### DELETE /authors/:id

- Purpose: Delete an existing author.

- Success:

- Status code: 204
- Response body: none

- Errors:

`404 `if no author exists with that `id`
`500` if an unexpected server or database error occurs
Swagger Documentation

Swagger must document every author route.

Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at /api-docs must allow someone to test every author route from the browser, alongside the book routes from Feature 1.

