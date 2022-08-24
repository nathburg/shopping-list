// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, enterListItem, signOutUser, getListItems, deleteAll } from './fetch-utils.js';
// pure rendering (data --> DOM):
import { renderListItem } from './render-utils.js';
/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const formEl = document.querySelector('#shopping-form');
const deleteButtonEl = document.querySelector('#delete-button');

// local state:
let localList = [];

async function getItems() {
    const newList = await getListItems();
    localList = newList.data;
}

// display functions:
function displayAllItems() {
    const listContainerEl = document.querySelector('#list-container');
    listContainerEl.textContent = '';
    for (let listItem of localList) {
        const newItemEl = renderListItem(listItem);
        listContainerEl.append(newItemEl);
    }
}

// events:
window.addEventListener('load', async () => {
    await getItems();
    displayAllItems();
});




formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    const nameValue = data.get('item');
    const amountValue = data.get('amount');
    const newItem = { item: nameValue, amount: amountValue, bought: false };
    const response = await enterListItem(newItem);
    newItem.id = response.data[0].id;
    localList.push(newItem);
    displayAllItems();
    formEl.reset();
});

deleteButtonEl.addEventListener('click', async () => {
    if (confirm('Are you sure you want to delete all items?')) {
        await deleteAll();
        localList = [];
        displayAllItems();
    }
});

export function markItemBought(id) {
    for (let listItem of localList) {
        if (listItem.id === id) {
            listItem.bought = true;
            console.log(localList);
        }
    }
}