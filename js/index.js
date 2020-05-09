let menuUl_DOM = document.querySelector(".menu-ul");
let addItem_DOM = document.querySelector(".add-menu");//form
let addItemInput_DOM = document.querySelector(".add-menu-input");


let menuItemsArr = JSON.parse(localStorage.getItem("menuItemsArr")) || [];

function createUI(menuArr = menuItemsArr,root = menuUl_DOM){
    let innerHtml = menuArr.map((menuItem,index) => {
        return `
        <li class="list-item flex" data-index="${index}">
            <div class="li-checkbox-div">
                <input type="checkbox" class="list-checkbox" ${menuItem.done ? "checked" : ""}>
                <label for="item${index}"></label>
            </div>
            <span class="menu-content">${menuItem.item}</span>
        </li>     `
    }).join("");
    root.innerHTML = innerHtml; 
}


function handleAddMenuItem(event){
    event.preventDefault();
    if(!addItemInput_DOM.value.trim()) return addItemInput_DOM.style.placeholder = "Cannot be empty";
    menuItemsArr.push({
        item: addItemInput_DOM.value[0].toUpperCase() + addItemInput_DOM.value.slice(1),
        done:false
    })
    createUI(menuItemsArr);
    localStorage.setItem("menuItemsArr",JSON.stringify(menuItemsArr));
    addItemInput_DOM.value = "";
    addItemInput_DOM.style.placeholder = "Add menu item";
}

function handleClickOnCheckbox(event){
    if(!event.target.matches(".list-checkbox"))return;
    let element = event.target;
    let getId = +element.parentElement.parentElement.dataset.index;
    menuItemsArr = menuItemsArr.map((menuItem,index) => index === getId ?({...menuItem,done:!menuItem.done}):menuItem);
    console.log(menuItemsArr);
    localStorage.setItem("menuItemsArr",JSON.stringify(menuItemsArr));
    createUI();
}

addItem_DOM.addEventListener("submit",handleAddMenuItem);
document.body.addEventListener("click",handleClickOnCheckbox);
window.addEventListener("load",function(e){
    createUI(); 
})
