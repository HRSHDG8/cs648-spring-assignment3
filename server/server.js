const fs = require("fs");
const express = require("express");
const {ApolloServer} = require("apollo-server-express");

const products = [];

const productList = () => {
    return products;
}

const addProduct = (_, {product}) => {
    product.id = products.length + 1;
    products.push(product);
    return product;
}

const resolvers = {
    Query: {
        productList,
    },
    Mutation: {
        addProduct,
    },
};


const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
    resolvers,
});

const app = express();

app.use(express.static("public"));

server.applyMiddleware({app, path: "/graphql"});

app.listen(3000, () => {
    console.log("App started at port 3000");
});
