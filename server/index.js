const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getCompliment, getFortune, getPosts, createPost, updatePost, deletePost} = require('./controller')

// ENDPOINTS -------------------------------------------

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get('/api/posts', getPosts)
app.post('/api/posts', createPost)
app.put('/api/posts/:id', updatePost)
app.delete('/api/posts/:id', deletePost)

//  ----------------------------------------------------

app.listen(4000, () => console.log("Server running on 4000"));
