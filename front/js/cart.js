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
        displayProd(allProducts);
      }
    }
  } catch (error) {
    alert(error);
  }
};
// 3 eme fonction : afficher le produit attacher evenement click sur class delete item attacher un autre evenement change
const displayProd = (allProd) => {
  let section = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.textContent = `${allProd._id}`;
  article.textContent = `${allProd.color}`;
  section.appendChild(article);
};
// 4 eme fonction : deleteItem (remove)(closest) supprimer ensuite l'article du localStorage apl fonction 6
// 5 eme fonction : changeQuantity change quantité du localStorage et ensuite apl la 6
// 6 eme fonction : en 1er apl localStorage et ensuite calcul faire le total totalQty et totalPrice

// voir methode formData et les regex
