## Buildateam Code Challenge

> TODO: add unit tests via npm run test command

ReadmeRU на русском: (link placeholder)

Frontend page: https://048e-217-138-216-244.ngrok-free.app/

> Please ignore ngrok warning and press "Visit Site"

### Build steps

1. Create <b>.env</b> file in root folder. Add Shopify access token and store name.

```.env
SHOPIFY_ACCESS_TOKEN=shpat_78d...
SHOPIFY_STORE_NAME=shop-address.myshopify.com
```

2. Install root dependencies.

```
npm install
```

3. Install client dependencies and make a static build inside client folder.

```
cd .\client\
npm install
npm run build
cd ..
```

4. Setup database and run the server

```
node setup_database.js
node express.js
```

Now we have our server running locally with backend logic and also serving client on http://localhost:5050/. For production we, of course, need to setup network port.

### About the development process

#### Day 1

I started from doing a research of how the project structure could look like. Even thought a challenge defined as Node.js server and frontend on React / Redux, there is still some options that fits the requirements. Initially, I was leaning towards using Next.js for its seamless integration of frontend and backend, native TypeScript support, and SSR capabilities. However, I realized that Next.js usually handles a server by itself, and gears towards serverless architecture. While it's possible to manage your backend manually, doing so negates many benefits of Next.js. Therefore, I opted for a simpler setup, using Express as the core server and maintaining a client internally. That keeps things straightforward yet effective. So I set the project up with this approach.

#### Day 2

I set up the server to fetch data on start from Shopify and simply caching it for now. I also restucture the data a bit so its not unnesessary nested. Then I set up a clientside with React / Redux and other useful libraries. React is a bit new for me, but pretty intuitive I would say. I set up the client to fetch that cached data from a server and show it on a page nicely. I choose Tailwind css for styling as there wasnt any restictions regarding that matter. I added the logic that preserve the aspect ratio of the image inside canvas. So it works like "cover" css image property just for a canvas. I also clean the bodyHtml to show it in a nice way (though its still defenetly just a text placeholder).

#### Day 3

I setup ngrok to serve the client on a public URL for convinience. I set up a simple sqlite database to store fetched products on a server.
