const addProductNode = document.querySelector("#add_product");
let products = [
    // {count: 10}
];/*let, чтобы можно было менять массив(сначала массив пустой)*/

addProductNode.addEventListener("submit", event =>{/*заполняем массив с помощью обработчика события*/ 
    event.preventDefault();/*отменили поведение по дефолту*/
    const title = event.target.title.value;/*создаем ключи для объектов: title, price, count */
    const price = +event.target.price.value;/*+ значит число */
    const count = +event.target.count.value;
    const product = {title, price, count};/*создаем объект */
    products.push(product);/*заполнили массив */

    rerender();/*ф-я создания карточек из массива продуктов и заполнения div*/

    console.log(products);/*вывели массив в консоль */
    event.target.reset();/*очистили форму(input)*/
});

function createProductCart(title, price, count){//создаем карточку продукта
    const divNode = document.createElement("div");/*добавили контейнер для полей карточки товара*/
    divNode.classList.add("product_cart");

    const titleNode = document.createElement("p");/*поле: название товара*/
    titleNode.innerText = title;

    const priceNode = document.createElement("p");/*поле: цена товара*/
    priceNode.innerText = price;
    
    const containerCountNode = document.createElement("div");
    const countNode = document.createElement("p");/*поле: кол-во товара*/ 
    countNode.innerText = count===0 ? "Товар закончился": count;

    const buttonsNode = document.createElement("div");/*добавили контейнер для кнопок*/
    const decreaseButtonNode = document.createElement("button");/*добавили кнопку уменьшения кол-ва товара*/
    decreaseButtonNode.innerText = "-";
    decreaseButtonNode.addEventListener("click",()=> {
        const currentProduct = products.find(product => product.title === title);
        if (count === 0){
            return;
        }
        currentProduct.count--;
        rerender();
    });
    const increaseButtonNode = document.createElement("button");/*добавили кнопку увеличения кол-ва товара*/
    increaseButtonNode.innerText = "+";
    increaseButtonNode.addEventListener("click",()=> {
        const currentProduct = products.find(product => product.title === title);
        currentProduct.count++;
        rerender();
    });
    buttonsNode.append(decreaseButtonNode, increaseButtonNode);
    buttonsNode.style.margin = "auto 20px";

    containerCountNode.append(countNode, buttonsNode);
    containerCountNode.style.cssText = " display: flex; justify-content: flex-start; margin:auto 50px";

    const deleteNode = document.createElement("button");/*добавили кнопку удаления товара*/
    deleteNode.innerText = "remove";

    divNode.style.borderColor =  count===0 ?"#c0392b":"green";/*если товар закончился, то цвет - красный, иначе- зеленый*/
    
    divNode.append(titleNode, priceNode, containerCountNode, deleteNode);

    deleteNode.addEventListener("click", ()=>{
        remove(title);
    });
    return divNode;  
};

function rerender(){
    const productsNode = document.querySelector(".products");
    productsNode.innerText = ""; //очистили productsNode, записав в него пустую строку
    const messageNode = document.createElement("p");
    messageNode.innerText = products.length!==0? "":"Товара нет";
    productsNode.append(messageNode);
    products.forEach(({title, price, count}) => 
        productsNode.append(createProductCart(title, price, count))); 
}

function remove(title){
    const newProducts = products.filter(e => e.title !== title);/*оставляем все продукты, название кот. не совпадает с названием продукта, кот. мы хотим удалить */
    products = newProducts;/*перезаписали новый массив в старый */
    rerender();/*создали карточки и добавили их в div*/
}

rerender();/*нужно вызвать эту ф-ю, чтобы отбивка появилась сначала, когда товара еще нет */

