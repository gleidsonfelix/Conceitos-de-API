const url = "https://jsonplaceholder.typicode.com/posts";

const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");



const mainContainer = document.querySelector(".container");
const postContainer = document.querySelector(".post-box");
const commentContainer = document.querySelector(".comment-container");


const formContainer = document.querySelector(".form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");


async function getAllPosts() {

    const response = await fetch(url);
    const data = await response.json();
    
    data.map((posts) => {

        const post = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");
        link.href = `posts.html?id=${posts.id}`

        title.innerText = posts.title;
        body.innerText = posts.body;
        link.innerText = "Ler";

        post.appendChild(title);
        post.appendChild(body);
        post.appendChild(link);

        mainContainer.appendChild(post);


    })
    
}

async function postsContent(Id) {

    const [responsePost, responseComment] = await Promise.all([fetch(`${url}/${Id}`), fetch(`${url}/${Id}/comments`)]);
    
    const dataPosts = await responsePost.json();

    const postDiv = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");

    title.innerText = dataPosts.title;
    body.innerText = dataPosts.body;

    postDiv.appendChild(title);
    postDiv.appendChild(body);

    postContainer.appendChild(postDiv);

    
    const dataComments = await responseComment.json();


    dataComments.map((comments) => {

        postComments(comments)
    })

}

function postComments(comments) {

    const comment = document.createElement("div");
    const email = document.createElement("h3");
    const body = document.createElement("p");

    email.innerText = comments.email;
    body.innerText = comments.body;

    comment.appendChild(email);
    comment.appendChild(body);


    commentContainer.appendChild(comment);
}


async function createNewComment(comment) {

    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json"
        },
    })

    const data = await response.json();

    postComments(data)
}


if (!postId) {

    getAllPosts()

} else {

    postsContent(postId)


    formContainer.addEventListener("submit", (e) => {

        e.preventDefault();

        let comment = {

            email: emailInput.value,
            body: bodyInput.value

        }

        comment = JSON.stringify(comment);

        createNewComment(comment)
    })
}


 




