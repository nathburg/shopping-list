import { changeBought } from './fetch-utils.js';
import { markItemBought } from './app.js';

export function renderListItem(listItem) {
    const itemContainerEl = document.createElement('div');
    const itemNameEl = document.createElement('div');
    const itemAmountEl = document.createElement('div');

    itemContainerEl.classList.add('item-container');
    itemNameEl.classList.add('item-detail');
    itemAmountEl.classList.add('item-amount');

    if (!listItem.bought) {
        itemContainerEl.addEventListener('click', async () => {
            itemContainerEl.classList.add('bought');
            markItemBought(listItem.id);
            await changeBought(listItem.id);
        });
    } else {
        itemContainerEl.classList.add('bought');
    }

    itemNameEl.textContent = listItem.item;
    itemAmountEl.textContent = listItem.amount;

    itemContainerEl.append(itemNameEl, itemAmountEl);
    return itemContainerEl;
}