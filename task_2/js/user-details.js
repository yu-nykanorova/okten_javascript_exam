const id = document.getElementById("userId");
const name = document.getElementById("userName");
const username = document.getElementById("userSecondName");
const email = document.getElementById("userEmail");
const phone = document.getElementById("userPhone");
const website = document.getElementById("userWebsite");
const streetSuite = document.getElementById("userStreetSuite");
const city = document.getElementById("userCity");
const zipcode = document.getElementById("userZipcode");
const latitude = document.getElementById("userLatitude");
const longitude = document.getElementById("userLongitude");
const companyName = document.getElementById("companyName");
const companyPhrase = document.getElementById("companyPhrase");
const companySlogan = document.getElementById("companySlogan");
const showPostsButton = document.getElementById("showPostsButton");
const userPostsList = document.getElementById("userPosts");

const baseUrl = new URL("https://jsonplaceholder.typicode.com/");

const userPageUrl = new URL(window.location.href);
const userId = userPageUrl.searchParams.get("userId");
const userUrl = new URL(`users/${userId}/`, baseUrl);

const userPostsUrl = new URL("posts", userUrl);

let postLoaded = false;
let postVisible = false;

fetch(userUrl)
    .then(response => response.json())
    .then(user => showUserInfo(user));

function showUserInfo(user) {
    id.textContent = `User # ${user.id}`;
    name.textContent = user.name;
    username.textContent = `Username: ${user.username}`;
    email.textContent = user.email;
    email.href = `mailto:${user.email}`;
    phone.textContent = user.phone;
    phone.href = `tel:${user.phone}`;
    website.textContent = user.website;
    website.href = user.website;
    website.target = "_blank";
    streetSuite.textContent = `${user.address.street} Str., ${user.address.suite},`;
    city.textContent = user.address.city;
    zipcode.textContent = `ZIP: ${user.address.zipcode}`;
    latitude.textContent = `Latitude: ${user.address.geo.lat}`;
    longitude.textContent = `Longitude: ${user.address.geo.lng}`;
    companyName.textContent = user.company.name;
    companyPhrase.textContent = `"${user.company.catchPhrase}"`;
    companySlogan.textContent = user.company.bs;
}

function showUserPosts(posts) {
    for (const post of posts) {
        const postItem = document.createElement("div");
        postItem.classList.add("post-item");
        const title = document.createElement("h2");
        const shortTitle = post.title.length > 40 ? `${post.title.slice(1, 40)}...` : post.title.slice(1);
        title.textContent = `"${post.title.charAt(0).toUpperCase() + shortTitle}"`;
        const link = document.createElement("a");
        link.href = `post-details.html?userId=${post.userId}&postId=${post.id}`;
        link.textContent = "Post details >";
        postItem.append(title, link);
        userPostsList.append(postItem);
    }
}

showPostsButton.addEventListener("click", () => {
    if (postLoaded) {
        if (postVisible) {
            userPostsList.style.display = "none";
            showPostsButton.textContent = "Posts of current user";
        } else {
            userPostsList.style.display = "grid";
            showPostsButton.textContent = "Hide posts";
        }

        postVisible = !postVisible;
        return;
    }

    fetch(userPostsUrl)
        .then(response => response.json())
        .then(posts => {
            showUserPosts(posts);
            postLoaded = true;
            postVisible = true;
            showPostsButton.textContent = "Hide posts";
        });
});
