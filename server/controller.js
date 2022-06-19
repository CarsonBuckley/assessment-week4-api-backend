const posts = require('./db.json')

let globalID = 2

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["A faithful friend is a strong defense.", "A golden egg of opportunity falls into your lap this month.", "A lifetime friend shall soon be made.", "A new perspective will come with the new year.", "A short pencil is usually better than a long memory any day."]

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },
    getPosts: (req, res) => {
        res.status(200).send(posts)
    },
    createPost: (req, res) => {
        const {title, rating, imageURL} = req.body
        let newPosts = {
            id: globalID,
            title: title,
            rating: +rating,
            imageURL: imageURL
        }
        posts.push(newPosts)
        globalID++
        res.status(200).send(posts)
    },
    updatePost: (req, res) => {
        const {type} = req.body
        let index = posts.findIndex(elem => elem.id === +req.params.id)
        
        // console.log(type)
        if (type === 'downvote') {
            posts[index].rating -= 1
            res.status(200).send(posts)
        } else if (type === 'upvote') {
            posts[index].rating += 1
            res.status(200).send(posts)
        }
    },
    deletePost: (req, res) => {
        let index = posts.findIndex(elem => elem.id === +req.params.id)
        posts.splice(index, 1)
        res.status(200).send(posts)
    },

}