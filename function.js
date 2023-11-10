const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')
const mongoose = require('mongoose')
const homeContent = "orem ipsum dolor, sit amet consectetur adipisicing elit. At, minus obcaecati pariatur molestiae, reprehenderit esse eius sit deserunt facere sint rem minima ratione dolores architecto explicabo quos illum? Delectus, autem."


app = express()
app.set('view engine', 'ejs')
app.use(express.static("stylings"))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/blogDB")
const postSchema = {
    title: String,
    content: String
}
const Post = mongoose.model("Post", postSchema)


app.get("/", function (req, res) {

        Post.find({})
        .then((post) => {
            res.render("home", {
                homePrologue: homeContent,
                postList: post
            })
        })
        .catch((err)=>{console.log(err);})
})

app.get("/about", function (req, res) {
    res.render("about")
})

app.get("/contact", function (req, res) {
    res.render("contactUs")
})

app.get("/compose", function (req, res) {
    res.render("compose")
})

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    })
    post.save()
    console.log("New post added");
    res.redirect("/")
})


app.get("/post/:postid", function (req, res) {
    const postID = req.params.postid
    Post.findOne({ _id:postID })
        .then((post) => {
            console.log("Navigate to Article :"+ post.title);
            res.render("posts", {
                title: post.title,
                content: post.content
            })
        })
        .catch((err)=>{console.log(err);})

})



app.listen(3000, function () {
    console.log("Server Initiated");
})