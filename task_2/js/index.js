const usersList = document.getElementById("usersList");

const url = new URL("https://jsonplaceholder.typicode.com/users");

fetch(url)
.then(response => response.json())
.then((users) => showUsers(users));

function showUsers(users) {
    for (const user of users) {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        const id = document.createElement("p");
        const name = document.createElement("h2");
        const link = document.createElement("a");
        id.textContent = `User # ${user.id}`;
        name.textContent = `${user.name}`;
        link.href = `user-details.html?user=${user.id}`;
        link.textContent = `More details`;
        userCard.append(id, name, link);
        usersList.append(userCard);
    }
}