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

fetch(userUrl)
    .then(response => response.json())
    .then(user => showUserInfo(user));

fetch(userPostsUrl)
    .then(response => response.json())
    .then(posts => showUserPosts(posts));

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
    website.target = "_blanc";
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
        title.textContent = `"${post.title.charAt(0).toUpperCase() + post.title.slice(1, 30)}..."`;
        const link = document.createElement("a");
        link.href = `post-details.html?userId=${post.userId}&postId=${post.id}`;
        link.textContent = "Post details >";
        postItem.append(title, link);
        userPostsList.append(postItem);
    }
}
