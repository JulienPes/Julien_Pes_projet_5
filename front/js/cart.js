// window.onload
window.onload = () => {
  console.log("Dom is loaded");
  getStorage();
};
// 1 ere fonction : recuperer le local storage , verifier qu'il ne soit pas vide sinon alert
const getStorage = () => {
  if (!localStorage.getItem("cmd")) {
    alert("votre panier est vide !");
  } else {
    const storage = localStorage.getItem("cmd");
    const response = JSON.parse(storage);
    getId(response);
  }
};
// 2 eme fonction : boucle sur local storage et pour chaque tour récuperer l'id avec id faire fetch
const getId = async (products) => {
  clientCart = [];
  clientCart = JSON.parse(localStorage.getItem("cmd"));
  console.log(clientCart);
  try {
    for (let product of products) {
      const productId = product._id;
      const prodUrl = `http://localhost:3000/api/products/${productId}`;
      if (!prodUrl) {
        throw new Error(`"erreur http :" ${response.status}`);
      } else {
        const response = await fetch(prodUrl);
        const allProducts = await response.json();
        Object.defineProperty(allProducts, "color", {
          value: product.color,
          writable: true,
        });
        Object.defineProperty(allProducts, "quantity", {
          value: product.quantity,
          writable: true,
        });
        clientCart.push(allProducts);
        displayProd(allProducts, product, clientCart);
      }
    }
  } catch (error) {
    alert(error);
  }
};
// 3 eme fonction : afficher le produit attacher evenement click sur class delete item attacher un autre evenement change
const displayProd = (allProd, productAdded, clientCart) => {
  let section = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", allProd._id);
  article.setAttribute("data-color", allProd.color);
  section.appendChild(article);
  const elem = document.createElement("div");
  elem.classList.add("cart__item__img");
  article.appendChild(elem);
  let img = document.createElement("img");
  img.setAttribute("src", allProd.imageUrl);
  img.setAttribute("alt", allProd.altTxt);
  elem.appendChild(img);
  const elem1 = document.createElement("div");
  elem1.classList.add("cart__item__content");
  article.appendChild(elem1);
  const elem2 = document.createElement("div");
  elem2.classList.add("cart__item__content__description");
  elem1.appendChild(elem2);
  let title = document.createElement("h2");
  title.textContent = allProd.name;
  elem2.appendChild(title);
  let color = document.createElement("p");
  color.textContent = allProd.color;
  elem2.appendChild(color);
  let price = document.createElement("p");
  price.textContent = allProd.price + "€";
  elem2.appendChild(price);
  const elem3 = document.createElement("div");
  elem3.classList.add("cart__item__content__settings");
  elem1.appendChild(elem3);
  const elem4 = document.createElement("div");
  elem4.classList.add("cart__item__content__settings__quantity");
  elem3.appendChild(elem4);
  let quantity = document.createElement("p");
  quantity.textContent = "Qté : ";
  elem4.appendChild(quantity);
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.classList.add("itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", productAdded.quantity);
  input.addEventListener("input", () => {
    changeQuantity(input.value, productAdded, clientCart);
  });
  elem4.appendChild(input);
  const elem5 = document.createElement("div");
  elem5.classList.add("cart__item__content__settings__delete");
  elem3.appendChild(elem5);
  let remove = document.createElement("p");
  remove.textContent = "Supprimer";
  remove.classList.add("deleteItem");
  remove.addEventListener("click", () => {
    deleteItem();
  });
  elem5.appendChild(remove);
};
// 4 eme fonction : deleteItem (remove)(closest) supprimer ensuite l'article du localStorage apl fonction 6
const deleteItem = () => {};

// 5 eme fonction : changeQuantity change quantité du localStorage et ensuite apl la 6
const changeQuantity = (inputValue, productAdded, clientCart) => {
  for (let i = 0; i < clientCart.length; i++) {
    let prodCart = clientCart[i];
    if (prodCart.quantity != inputValue && productAdded._id === prodCart._id) {
      prodCart.quantity = inputValue;
      totalProduct(prodCart);
    } else {
      totalProduct(prodCart);
    }
  }
};

// 6 eme fonction : en 1er apl localStorage et ensuite calcul faire le total totalQty et totalPrice
const totalProduct = (inputValue) => {};

// voir methode formData et les regex
