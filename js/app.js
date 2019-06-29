$(document).ready(function(){
  $('.sidenav').sidenav();
});

const form = document.querySelector('#item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const itemInput = document.querySelector('#item');
const itemIcons = ['egg', 'bread', 'cheese', 'juice', 'chicken', 'bacon', 'banana', 'cookie', 'cake', 'carrot', 'chip', 'cleaning', 'tuna', 'canned', 'dog food', 'food', 'doughnut', 'fish', 'flour', 'hammer', 'milk', 'icecream', 'cream', 'jam', 'makeup', 'meat', 'soap', 'watering can', 'watermelon', 'water', 'baby bottle', 'basket', 'blender', 'calculator', 'camera', 'card', 'electronic', 'insect repellant', 'pan', 'phone', 'rolling pin', 'sign', 'snack', 'wheat', 'chocolate', 'coffee', 'fruit', 'toilet paper', 'toilet', 'foil', 'soil', 'boil', 'coil', 'oil', 'peppers', 'pepper', 'sauce', 'sausage', 'soda', 'spice', 'rice', 'ice', 'sugar', 'yogurt', 'furniture', 'ketchup', 'detergent', 'clothes', 'wine', 'beer', 'pasta', 'shampoo', 'ham', 'cereal', 'towel', 'plunger',  'sponge', 'toothpaste', 'toothbrush', 'toy', 'clock', 'lock', 'pen', 'scissors', 'stationery', 'apple', 'pizza', 'onion', 'pickle', 'vegetable', 'steak', 'tea', 'bag', 'xbox', 'playstation', 'laptop', 'computer', 'usb', 'peanut butter', 'butter', 'peanut', 'margarine', 'floss', 'sunscreen', 'tissues', 'vinegar', 'salt', 'tomato', 'orange', 'ginger', 'mussel', 'vodka', 'brandy', 'whiskey', 'rum'];

loadEventListeners();
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getItems);
  form.addEventListener('submit', addItem);
  itemList.addEventListener('click', modifyItem);
  clearBtn.addEventListener('click', clearItems);
  filter.addEventListener('keyup', filterItems);
}

function setIcons(item, image) {
  for (let i = 0; i < itemIcons.length; i++) {
    if (item.indexOf(itemIcons[i]) != -1) {
      image.setAttribute('src', 'img/' + itemIcons[i].toLowerCase() + '.svg');
      break;
    } else {
      image.setAttribute('src', 'img/default.svg');
    }
  }
}

function getItems() {
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item){
    const li = document.createElement('li');
    li.className = 'collection-item';
    const itemContainer = document.createElement('div');
    itemContainer.className = 'item-container';
    const image = document.createElement('img');

    setIcons(item, image);
    
    itemContainer.appendChild(image);
    itemContainer.appendChild(document.createTextNode(item.toLowerCase()));
    li.appendChild(itemContainer);
    const linkCheck = document.createElement('a');
    linkCheck.className = 'check-item secondary-content';
    linkCheck.setAttribute('title', 'Check Item');
    linkCheck.innerHTML = '<i class="fas fa-check-circle"></i>';
    const linkRemove = document.createElement('a');
    linkRemove.className = 'delete-item secondary-content';
    linkRemove.setAttribute('title', 'Remove Item');
    linkRemove.innerHTML = '<i class="fas fa-minus-circle"></i>';
    const linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';
    linkContainer.appendChild(linkRemove);
    linkContainer.appendChild(linkCheck);
    li.appendChild(linkContainer);
    itemList.appendChild(li);
  });

  let checked;
  if(localStorage.getItem('checked') === null){
    checked = [];
  } else {
    checked = JSON.parse(localStorage.getItem('checked'));
  }

  checked.forEach(function(index){
    itemList.childNodes[index].style.textDecoration = 'line-through';
    itemList.childNodes[index].childNodes[0].childNodes[0].style.filter = 'grayscale(100%)';
    itemList.childNodes[index].childNodes[1].childNodes[1].style.display = 'none';
  });

}

function addItem(e) {
  if(itemInput.value !== '') {
    const li = document.createElement('li');
    li.className = 'collection-item';
    const itemContainer = document.createElement('div');
    itemContainer.className = 'item-container';
    const image = document.createElement('img');

    setIcons(itemInput.value.toLowerCase(), image);
    
    itemContainer.appendChild(image);
    itemContainer.appendChild(document.createTextNode(itemInput.value.toLowerCase()));
    li.appendChild(itemContainer);
    const linkCheck = document.createElement('a');
    linkCheck.className = 'check-item secondary-content';
    linkCheck.setAttribute('title', 'Check Item');
    linkCheck.innerHTML = '<i class="fas fa-check-circle"></i>';
    const linkRemove = document.createElement('a');
    linkRemove.className = 'delete-item secondary-content';
    linkRemove.setAttribute('title', 'Remove Item');
    linkRemove.innerHTML = '<i class="fas fa-minus-circle"></i>';
    const linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';
    linkContainer.appendChild(linkRemove);
    linkContainer.appendChild(linkCheck);
    
    li.appendChild(linkContainer);
    itemList.appendChild(li);
    storeItemInLocalStorage(itemInput.value.toLowerCase());
    itemInput.value = '';
    itemInput.focus();
    itemInput.select();
    M.Toast.dismissAll();
    M.toast({html: 'Item added!', classes: 'alertColor'});
  }
  
  e.preventDefault();
}

function storeItemInLocalStorage(item) {
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

function modifyItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.parentElement.remove();
    removeItemFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    M.Toast.dismissAll();
    M.toast({html: 'Item removed!', classes: 'alertColor'});
  }
  if(e.target.parentElement.classList.contains('check-item')) {
    e.target.parentElement.parentElement.parentElement.style.filter = 'grayscale(100%)';
    e.target.parentElement.parentElement.parentElement.style.textDecoration = 'line-through';
    e.target.parentElement.style.display = 'none';
    
    let checked = [];
    document.querySelectorAll('.check-item').forEach(function(item, index){
      if (item.style.display === 'none') {
        checked.push(index);
      }
    });
    localStorage.setItem('checked', JSON.stringify(checked));
    M.Toast.dismissAll();
    M.toast({html: 'Item checked!', classes: 'alertColor'});
  }
  
}

function removeItemFromLocalStorage(shopItem) {
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  let checked;
  if(localStorage.getItem('checked') === null){
    checked = [];
  } else {
    checked = JSON.parse(localStorage.getItem('checked'));
  }

  items.forEach(function(item, index){
    if(shopItem.textContent === item){
      items.splice(index, 1);

      if (checked.indexOf(index) !== -1) {
        checked.splice(checked.indexOf(index), 1);
      }

      checked.forEach(function(check, indexCheck){
        if (index < check) {
          checked[indexCheck] = check - 1;
        }
      });
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('checked', JSON.stringify(checked));
}

function clearItems() {
  if (itemList.firstChild) {
    clearItemsFromLocalStorage();
    M.Toast.dismissAll();
    M.toast({html: 'Items cleared!', classes: 'alertColor'});
  }
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  
}

function clearItemsFromLocalStorage() {
  localStorage.clear();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(item){
    const result = item.firstChild.textContent;
    if(result.toLowerCase().indexOf(text) != -1){
      item.style.display = 'grid';
    } else {
      item.style.display = 'none';
    }
  });
}