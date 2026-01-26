const addForm = document.getElementsByClassName("add-items_block")[0];
const addInput = document.getElementById("addItemsInput");
const pairList = document.getElementById("itemsList");

function addPair() {
    const pair = addInput.value.trim().split("=");


}

function showList() {
     const items = JSON.parse(localStorage.getItem("items")) || [];

     if (items.length > 0) {
         for (const item of items) {
             const listItem = document.createElement("li");
             listItem.textContent = `${item.name}=${item.value}`;
             pairList.append(listItem);
         }
     }
}

showList();

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPair();
    addForm.reset();
})
