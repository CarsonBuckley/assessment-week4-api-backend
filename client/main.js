const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const postsContainer = document.querySelector('#posts-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/posts`

const postsCallback = ({ data: posts }) => displayPosts(posts)
const errCallback = err => console.log(err)

const getAllPosts = () => axios.get(baseURL).then(postsCallback).catch(errCallback)
const createPost = body => axios.post(baseURL, body).then(postsCallback).catch(errCallback)
const deletePost = id => axios.delete(`${baseURL}/${id}`).then(postsCallback).catch(errCallback)
const updatePost = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(postsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('#rating')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createPost(bodyObj)

    title.value = ''
    rating.value = ''
    imageURL.value = ''
}

function createPostCard(post) {
    const postCard = document.createElement('div')
    postCard.classList.add('post-card')

    postCard.innerHTML = `<img alt='post cover image' src=${post.imageURL} class="post-cover-image"/>
    <p class="title">${post.title}</p>
    <div class="btns-container">
        <button onclick="updatePost(${post.id}, 'downvote')">-</button>
        <p class="post-rating">${post.rating} upvotes</p>
        <button onclick="updatePost(${post.id}, 'upvote')">+</button>
    </div>
    <button onclick="deletePost(${post.id})">delete</button>
    `


    postsContainer.appendChild(postCard)
}

function displayPosts(arr) {
    postsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPostCard(arr[i])
    }
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

form.addEventListener('submit', submitHandler)

getAllPosts()
