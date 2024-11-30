const express = require("express");
const port = 3000;
const app = express();

//adding middleware to our server - it will make some changes in request so that express can parse the data of requests in the body
//extended means making it parsable or usable inside our code both means the same be it true or false, it just works kinda differently that's it
// without it the data was returning undefined
app.use(express.urlencoded({ extended: false }));

//this middleware is used to server static files
// app.use(express.static("public"));
// to make it available on particular route
app.use("/resources", express.static("public"));

app.get("/", (request, response) => {
    response.send("Hello from express!");
})

app.get("/products", (request, response) => {
    response.send("You have sent a GET request on product Route\n");
})

app.post("/products", (request, response) => {
    // const data = request.body;
    // console.log("You have sent a POST request on product route with body of data : \n", data);
    const { API_KEY, city, age = 0 } = request.body;
    console.log(`You have sent a POST request on product route with body of API key as ${API_KEY} and city as ${city} ${age ? "and age as " + age : ""} \n`);
    response.send("You have sent a POST request on product route");
})
app.put("/products", (request, response) => {
    response.send("You have sent a PUT request on Procuct Route\n");
});
app.patch("/products", (request, response) => {
    response.send("You have sent a PATCH request on Procuct Route\n");
});
app.delete("/products", (request, response) => {
    response.send("You have sent a DELETE request on Procuct Route\n");
});


// -------------------- another way to do the above by chaining ------------------

app
    .route("/users")
    .get((request, response) => {
        console.log(request.query);
        response.send(
            "You have sent a GET request on Users Route -- " +
            JSON.stringify(request.query)
        );
    })
    .post((request, response) => {
        response.send("You have sent a POST request on Users Route\n");
    })
    .put((request, response) => {
        response.json({ data: "You have sent a PUT request on Users Route\n" });
        //express handles it automatically we do not need to stringify the json
        response.send({ data: "You have sent a PUT request on Users Route\n" });
    })
    .patch((request, response) => {
        response.send("You have sent a PATCH request on Users Route\n");
    })
    .delete((request, response) => {
        response.send("You have sent a DELETE request on Users Route\n");
    });

app.get("/products/:productId", (request, response) => {
    const { productId } = request.params;
    response.send(`You have sent a GET request on Procuct Route with Product Id as ${productId}.\n`);

});

app.get("/products/:productId/:reviewId", (request, response) => {
    const { productId, reviewId } = request.params;
    response.send(`You have sent a GET request on Procuct Route with Product Id as ${productId} for a review with the review id as ${reviewId}\n`);
});

app.get("/sample", (request, response) => {
    response.send("<h1>Hello There <button>BTN</button></h1>");
});


// const server = http.createServer(serverLogic);
app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
})

