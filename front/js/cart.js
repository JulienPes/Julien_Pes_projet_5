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
        console.log(clientCart);
        displayProd(allProducts, product);
      }
    }
  } catch (error) {
    alert(error);
  }
};
// 3 eme fonction : afficher le produit attacher evenement click sur class delete item attacher un autre evenement change
const displayProd = (allProd, productAdded) => {
  let section = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", allProd._id);
  article.setAttribute("data-color", allProd.color);
  section.appendChild(article);
  const elem = document.createElement("div");
  elem.classList.add("cart__item__img");
  section.appendChild(elem);
  let img = document.createElement("img");
  img.setAttribute("src", allProd.imageUrl);
  img.setAttribute("alt", allProd.altTxt);
  elem.appendChild(img);
  const elem1 = document.createElement("div");
  elem1.classList.add("cart__item__content");
  section.appendChild(elem1);
  const elem2 = document.createElement("div");
  elem2.classList.add("cart__item__content__description");
  section.appendChild(elem2);
  let title = document.createElement("h2");
  title.textContent = allProd.name;
  section.appendChild(title);
  let color = document.createElement("p");
  color.textContent = allProd.color;
  section.appendChild(color);
  let price = document.createElement("p");
  price.textContent = allProd.price + "€";
  section.appendChild(price);
  const elem3 = document.createElement("div");
  elem3.classList.add("cart__item__content__settings");
  section.appendChild(elem3);
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
  input.setAttribute("value", allProd.quantity);
  elem4.appendChild(input);
  console.log(productAdded.quantity);
  changeQuantity(input.value, productAdded);
};
// 4 eme fonction : deleteItem (remove)(closest) supprimer ensuite l'article du localStorage apl fonction 6
// 5 eme fonction : changeQuantity change quantité du localStorage et ensuite apl la 6
const changeQuantity = (inputValue, productAdded) => {
  if (inputValue === productAdded.quantity) {
  } else {
  }
};
// 6 eme fonction : en 1er apl localStorage et ensuite calcul faire le total totalQty et totalPrice

// voir methode formData et les regex
