# URL Shortener Service

A simple URL shortener service built with Node.js and SQLite.
This service allows users to shorten long URLs. It's still a work in progress
so its going to have more features in the future. 

## Features

- Shorten long URLs
- Redirect users to the original URL
- Display the created shortened URL
- Basic error handling
- SQLite3 database for storing URLs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/felipemdutra/url-shortener-service.git
    cd url-shortener-service
    ```

2. Install the dependencies:

    ```bash
    npm install sqlite3 express crypto ejs
    ```

### Running the Service

1. Start the server:

    ```bash
    npm run devStart 
    ```
    configured in package.json as:
    ```json
    "scripts": {
        "devStart": "nodemon ./src/server.js"
    }
    ```

2. The service will be available at `http://localhost:8000`.

### API Endpoints

- **POST /shorten**

    Create a shortened URL.

    - **Request Body**:
      ```json
      {
        "originalUrl": "https://example.com"
      }
      ```

    - **Response**:
      ```json
      {
        "shortUrl": "http://localhost:8000/abcdef"
      }
      ```

- **GET /:shortUrl**

    Redirect to the original URL.

## Database

The service uses SQLite3 to store the URLs. The database schema includes a table `urls` with the following columns:

- `id` (INTEGER): Primary key
- `originalUrl` (TEXT): The original long URL
- `shortUrl` (TEXT): The shortened URL

## Code Structure

- `server.js`: Entry point of the application

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
