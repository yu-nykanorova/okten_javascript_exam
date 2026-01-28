const addForm = document.getElementsByClassName("add-items_block")[0];
const addInput = document.getElementById("addItemsInput");
const pairsList = document.getElementById("itemsList");
const warningFormat = document.getElementsByClassName("warning")[0];
const sortByNameButton = document.getElementById("sortByNameButton");
const sortByValueButton = document.getElementById("sortByValueButton");
const deleteButton = document.getElementById("deleteButton");
const modalAlertWindow = document.getElementsByClassName("modal-alert")[0];
const modalAlertMessage = document.getElementsByClassName("modal-alert_message")[0];
const confirmAlertButton = document.getElementById("confirmAlertButton");
const cancelAlertButton = document.getElementById("cancelAlertButton");

let pairs = JSON.parse(localStorage.getItem("pairs")) || [];
let replacePair = null;

showPairsList();

// function to display list of all current pairs

function showPairsList() {
    pairsList.textContent = "";

     if (pairs.length === 0) {
         pairsList.textContent = "No pairs found...";
         return;
     }

    pairs.forEach((pair) => addPairToList(pair));
}

// function to create and save a new pair

function createPair() {
    const inputValue = addInput.value.replace(/\s+/g, "");

    warningFormat.classList.add("hidden");
    addInput.classList.remove("wrong-input");

    if (!/^[a-zA-Z0-9]+=[a-zA-Z0-9]+$/.test(inputValue)) {
        warningFormat.classList.remove("hidden");
        addInput.classList.add("wrong-input");
        return;
    }

    const [name, value] = inputValue.split("=");

    const existingPair = pairs.find(pair => pair.name === name);

    if (existingPair) {
        replacePair = {name, value};
        openAlertModal(existingPair, value);
        return;
    }

    pairs.push({name, value, selected: false});
    localStorage.setItem("pairs", JSON.stringify(pairs));
    showPairsList();
}

// function to add a new pair to the output list

function addPairToList(item) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}=${item.value}`;
    listItem.dataset.name = item.name;
    pairsList.append(listItem);
}

// function to sort pairs in the list by a specific criterion

function sortPairs(sortKey) {
    pairs.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    showPairsList();
}

// function to mark the pair as selected

function selectPair(selected) {
    const pair = pairs.find(pair => pair.name === selected.name);
    if (pair) {
        pair.selected = !pair.selected;
    }
}

// function to delete selected pairs

function deletePairs() {
    const filtered = pairs.filter((pair) => pair.selected === false);
    localStorage.setItem("pairs", JSON.stringify(filtered));
    pairs = filtered;
    showPairsList();
}

// function to open alert modal window if pair name is already exist

function openAlertModal(existingPair, value) {
    modalAlertWindow.classList.remove("hidden");
    modalAlertMessage.textContent = "";

    const alertTitle = document.createElement("h3");
    const alertInfo = document.createElement("p");
    const alertQuestion = document.createElement("p");
    alertTitle.textContent = `A pair with name "${existingPair.name}" already exists`;
    alertInfo.textContent = `Current value: "${existingPair.value}"`;
    alertQuestion.textContent = `Replace it with new value: "${value}"?`;

    modalAlertMessage.prepend(alertTitle, alertInfo, alertQuestion);
}

// function to close alert modal window

function closeAlertModal() {
    replacePair = null;
    modalAlertWindow.classList.add("hidden");
    modalAlertMessage.textContent = "";
}

// adding of new pair

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPair();
    addForm.reset();
});

// sorting pairs by name

sortByNameButton.addEventListener("click", () => sortPairs("name"));

// sorting pairs by value

sortByValueButton.addEventListener("click", () => sortPairs("value"));

// highlighting of selected pair

pairsList.addEventListener("click", (event) => {
    const liElement = event.target.closest("li");

    if (liElement) {
        liElement.classList.toggle("selected");
        selectPair(liElement.dataset);
    }
});

// deleting of selected pairs

deleteButton.addEventListener("click", deletePairs);

// confirming replacement of the pair value with an existing name

confirmAlertButton.addEventListener("click", () => {
    if (!replacePair) return;

    const pair = pairs.find(pair => pair.name === replacePair.name);
    pair.value = replacePair.value;

    localStorage.setItem("pairs", JSON.stringify(pairs));
    showPairsList();
    closeAlertModal();
});

// closing alert modal window without changes

cancelAlertButton.addEventListener("click", closeAlertModal);
