// const http = require("http"); // in express we will not import http, instead we will import express

const express = require("express");

// initialization express in a variable c/d app
const app = express(); // you can name anything in place of app.

// application will now use only json data format
app.use(express.json());  // using the app
const port = 8081;

const toDOList = ["hey! everyone","hope you all","are doing","awesome at work."];

// http://localhost:8081/todos
app.get("/todos",(req,res)=>{  // GET
    // callback function below
    res.status(200).send(toDOList);
});

// http://localhost:8081/todos
app.post("/todos",(req,res)=>{  //POST
    let newToDo = req.body.item;
    toDOList.push(newToDo);
    res.status(201).send({
        message: "The task was added successfully"
    });
})

// http://localhost:8081/todos
app.delete("/todos",(req,res)=>{  //DELETE
    var itemToDelete = req.body.item;

    // before deleting we need to find that particular element
    toDOList.find((elem,index)=>{
            if(elem===itemToDelete){
                toDOList.splice(index,1); // we use splice method to delete item.
            }
    });
    // once done with deleting we also need to send the response back
    res.status(204).send({
        message:`Deleted item ${req.body.item}`
    });
})

// in the above code put and patch methods are not called , so here we will use "all" method to handle all the methods which are not defined.
app.all("/todos",(req,res)=>{
    res.status(501).send({
        message: "Not Yet Implemented"
    })
})

// our genuine url: http://localhost:8081/todos . Now if the user enter a dummy url or make some mistake while entering the url, in order to handle those thing/errors we will use "*"
app.all("*",(req,res)=>{    // "*" will show result no matter what the url is.
    res.status(404).send({
        message:"default url"
    })
}) 

app.listen(port,()=>{
    console.log(`NodeJS with Express started running Successfully on ${port}`);
});