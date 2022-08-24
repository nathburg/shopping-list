// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, enterListItem, signOutUser, getListItems } from './fetch-utils.js';
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

// local state:
let localList = [];

// display functions:
function displayAllItems() {
    const listContainerEl = document.querySelector('#list-container');
    console.log(localList);
    for (let listItem of localList) {
        console.log(listItem);
        const newItemEl = renderListItem(listItem);
        listContainerEl.append(newItemEl);
    }
}

// events:
getItems();
displayAllItems();


async function getItems() {
    const newList = await getListItems();
    localList = newList.data;
    console.log(localList);
}


formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    const nameValue = data.get('item');
    const amountValue = data.get('amount');
    const newItem = { item: nameValue, amount: amountValue, bought: false };
    localList.push(newItem);
    const response = await enterListItem(newItem);
    displayAllItems();
    formEl.reset();
});