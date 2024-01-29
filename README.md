## Buildateam Code Challenge

> TODO: add unit tests via npm run test command

ReadmeRU на русском: (link placeholder)

Frontend page: (link placeholder)

### Getting Started

Create <b>.env</b> file in root folder. Add Shopify access token and store name.

```.env
SHOPIFY_ACCESS_TOKEN=shpat_78d...
SHOPIFY_STORE_NAME=shop-address.myshopify.com
```

Install dependencies and run the server.

```
npm install

cd .\client\
npm install
npm run build

cd ..
npm run express
```

Now we have our server running on port 5050 with backend logic and also serving client (go to http://localhost:5050/ ).

### About the development process

Initially, I was leaning towards using Next.js for its seamless integration of frontend and backend, native TypeScript support, and SSR capabilities. However, I realized that Next.js primarily gears towards serverless architecture. While it's possible to manage your own server backend, doing so negates many benefits of Next.js. Therefore, I opted for a simpler setup, using Express as the core server and maintaining a separate client internally. This approach keeps things straightforward yet effective.
