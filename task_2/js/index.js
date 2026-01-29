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
        id.textContent = `User # ${user.id}`;
        const name = document.createElement("h2");
        name.textContent = `${user.name}`;
        const link = document.createElement("a");
        link.href = `user-details.html?user=${user.id}`;
        link.textContent = `More details`;
        const arrow = document.createElement("span");
        arrow.classList.add("arrow");
        arrow.textContent = ` >>>`;
        link.append(arrow);
        userCard.append(id, name, link);
        usersList.append(userCard);
    }
}