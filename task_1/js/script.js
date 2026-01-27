const addForm = document.getElementsByClassName("add-items_block")[0];
const addInput = document.getElementById("addItemsInput");
const pairsList = document.getElementById("itemsList");
const warningFormat = document.getElementsByClassName("warning")[0];
const sortByNameButton = document.getElementById("sortByNameButton");
const sortByValueButton = document.getElementById("sortByValueButton");
const deleteButton = document.getElementById("deleteButton");

let pairs = JSON.parse(localStorage.getItem("pairs")) || [];

showPairsList();

function showPairsList() {
    pairsList.textContent = "";

     if (pairs.length === 0) {
         pairsList.textContent = "No pairs found...";
         return;
     }

    pairs.forEach((pair) => addPairToList(pair));
}

function createPair() {
    const inputValue = addInput.value.replace(/\s+/g, "");

    warningFormat.classList.add("hidden");

    if (!/^[a-zA-Z0-9]+=[a-zA-Z0-9]+$/.test(inputValue)) {
        warningFormat.classList.remove("hidden");
        return;
    }

    const [name, value] = inputValue.split("=");

    if (pairs.some(pair => pair.name === name)) {
        console.log("already exist");
        return;
    }

    pairs.push({name, value, selected: false});
    localStorage.setItem("pairs", JSON.stringify(pairs));
    showPairsList();
}

function addPairToList(item) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}=${item.value}`;
    listItem.dataset.name = item.name;
    pairsList.append(listItem);
}

function sortPairs(sortKey) {
    pairs.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    showPairsList()
}

function selectPair(selected) {
    pairs.filter((pair) => {
        if (pair.name === selected.name) {
            pair.selected = !pair.selected;
        }
    });
}

function deletePairs() {
    const filtered = pairs.filter((pair) => pair.selected === false);
    localStorage.setItem("pairs", JSON.stringify(filtered));
    showPairsList();
}

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPair();
    addForm.reset();
});

sortByNameButton.addEventListener("click", () => sortPairs("name"));

sortByValueButton.addEventListener("click", () => sortPairs("value"));

pairsList.addEventListener("click", (event) => {
    const liElement = event.target.closest("li");

    if (liElement) {
        liElement.classList.toggle("selected");
    }

    selectPair(liElement.dataset);
    console.log(pairs);
});

deleteButton.addEventListener("click", () => deletePairs());
