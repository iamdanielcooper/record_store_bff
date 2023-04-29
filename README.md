# Record Store BFF

A backend app to manage a record store.

## Usage

Follow the steps outlined below to run a local instance of the service.

-   Clone this repo
-   Using your terminal navigate into this directory
-   Use the command: `npm i` to install all required packages
-   Use the command: `npm run dev` to start the service
-   A local version of the service will now be spun up on port 4000

## Technologies used

-   NodeJS
-   Express
-   Disconnect (Discogs library)
-   Dotenv

### Development

-   Nodemon
-   Jest
-   Supertest

## Endpoints

Examples for all endpoints can be found in postman_collection.json at the root of the project.

| Endpoint                  | Method | Description                          |
| ------------------------- | ------ | ------------------------------------ |
| /details/{barcode_number} | GET    | Get an albums details by its barcode |
