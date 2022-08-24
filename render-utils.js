import { changeBought } from "./fetch-utils.js";

export function renderListItem(listItem) {
    const itemContainerEl = document.createElement('div');
    const itemNameEl = document.createElement('div');
    const itemAmountEl = document.createElement('div');

    itemContainerEl.classList.add('item-container');
    itemNameEl.classList.add('item-detail');
    itemAmountEl.classList.add('item-amount');

    if (!listItem.bought) {
        itemContainerEl.addEventListener('click', () => {
            itemContainerEl.classList.add('bought');
            const response = changeBought(listItem.id);
            console.log(response);
        });
    } else {
        itemContainerEl.classList.add('bought');
    }

    itemNameEl.textContent = listItem.item;
    itemAmountEl.textContent = listItem.amount;

    itemContainerEl.append(itemNameEl, itemAmountEl);
    return itemContainerEl;
}