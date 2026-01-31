const id = document.getElementById("postId");
const title = document.getElementById("postTitle");
const author = document.getElementById("postAuthor");
const postText = document.getElementById("postBody");
const commentsList = document.getElementById("commentsList");

const baseUrl = new URL("https://jsonplaceholder.typicode.com/");

const postPageUrl = new URL(window.location.href);
const postId = postPageUrl.searchParams.get("postId");
const postUrl = new URL(`posts/${postId}/`, baseUrl);

const postCommentsUrl = new URL("comments", postUrl);

fetch(postUrl)
    .then(response => response.json())
    .then(post => showPostInfo(post));

fetch(postCommentsUrl)
    .then(response => response.json())
    .then(comments => showPostComments(comments));

function showPostInfo(post) {
    id.textContent = `Post # ${post.id}`;
    title.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
    author.textContent = `Post author: user # ${post.userId}`;
    postText.textContent = post.body.charAt(0).toUpperCase() + post.body.slice(1);
}

function showPostComments(comments) {
    for (const comment of comments) {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        const commentId = document.createElement("p");
        commentId.textContent = `Comment # ${comment.id}`;
        const commentPostId = document.createElement("p");
        commentPostId.textContent = `(post: ${comment.postId})`;
        const commentTitle = document.createElement("h3");
        commentTitle.textContent = `${comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}`;
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("comment-author");
        const commentAuthorText = document.createElement("p");
        const commentAuthorEmail = document.createElement("p");
        commentAuthorText.textContent = "From:";
        commentAuthorEmail.textContent = comment.email;
        commentAuthor.append(commentAuthorText, commentAuthorEmail);
        const commentText = document.createElement("p");
        commentText.textContent = `${comment.body.charAt(0).toUpperCase() + comment.body.slice(1)}`;
        commentItem.append(commentId, commentPostId, commentAuthor, commentTitle, commentText);
        commentsList.append(commentItem);
    }
}