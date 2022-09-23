/**
 * Appeler la première fonction dès le chargement du "dom"
 */
// Attendre que le dom soit chargé
window.onload = () => {
  console.log("Dom is loaded");
  //appel de la fonction de récupération du localStorage
  getStorage();
};
/**
 * Recuperer le local storage, verifier qu'il ne soit pas vide
 */
// Fonction de récuperation du localStorage
const getStorage = () => {
  // Si le localStorage est vide
  if (!localStorage.getItem("cmd")) {
    // Création d'une alerte
    alert("votre panier est vide !");
  } else {
    // Sinon déballage du localStorage
    const storage = JSON.parse(localStorage.getItem("cmd"));
    // Appel de la fonction de récupération d'id avec mes produits en paramètre
    getId(storage);
  }
};
/**
 * Boucle sur local storage et récuperation du produit
 * @param {*Array} products
 */
// Fonction asynchrone de récuperation de l'identifiant avec mes produits en paramètre
const getId = async (products) => {
  // Création d'un tableau vide
  clientCart = [];
  // Essayer
  try {
    // Boucle sur mon tableau de produits du localStorage
    for (let product of products) {
      // Url avec l'id de mon produit dans le localStorage
      const prodUrl = `http://localhost:3000/api/products/${product._id}`;
      // requête au serveur avec "fetch" et récuperation du produit
      const response = await fetch(prodUrl);
      // Si la réponse est négative
      if (!response.ok) {
        // Lancement d'une nouvelle erreur
        throw new Error(`"erreur http :" ${response.status}`);
      } else {
        // Sinon récuperation de la réponse au format Json
        const oneProduct = await response.json();
        // Affectation de la couleur du produit au produit du localStorage
        oneProduct.color = product.color;
        // Affectation de la quantité du produit au produit du localStorage
        oneProduct.quantity = product.quantity;
        // Ajout du produit au tableau "clientCart"
        clientCart.push(oneProduct);
        // Appel de la fonction d'affichage produit avec en paramètre le prod du back, le prod du localStorage et le tableau
        displayProd(oneProduct, product, clientCart);
      }
    }
    // Appel de la fonction d'attache d'évenement
    attachEvent(clientCart);
    // Attraper une erreur
  } catch (error) {
    // Alerte avec l'erreur
    alert(error);
  }
};
/**
 * Fonction en charge d'attacher les évenements
 * @param {*Array} clientCart
 */
// fonction qui permet d'attacher tous les evenements aux éléments de la page
const attachEvent = (clientCart) => {
  // Récuperation de l'id "order" et ajout d'un évenement "click" avec l'évènement en param
  document.getElementById("order").addEventListener("click", (e) => {
    // Appel de la fonction de remplissage du formulaire avec le tableau de produits et l'évènement en param
    order(clientCart, e);
  });
  // Affectation du formulaire à une constante
  const selectForm = document.forms[0];
  // Ajout de l'évènement "blur" sur les différents champs et appel de la fonction renvoyant la réponse du controle du formulaire
  selectForm.elements.firstName.addEventListener("blur", checkContent);
  selectForm.elements.lastName.addEventListener("blur", checkContent);
  selectForm.elements.address.addEventListener("blur", checkContent);
  selectForm.elements.city.addEventListener("blur", checkContent);
  selectForm.elements.email.addEventListener("blur", checkContent);
};
/**
 * Afficher le produit et attacher plusieurs evenements
 * @param {*Object} allProd
 * @param {*Object} prod
 * @param {*Array} clientCart
 */
// Fonction d'affichage des produits avec en paramètre le prod du back, le prod du localStorage et le tableau
const displayProd = (allProd, prod, clientCart) => {
  // Récuperation de l'id "cart__items"
  let section = document.getElementById("cart__items");
  // Création d'un élement "article"
  let article = document.createElement("article");
  // Ajout de la classe "cart__item" à "article"
  article.classList.add("cart__item");
  // Ajout de l'id du produit à "data-id"
  article.setAttribute("data-id", allProd._id);
  // Ajout de la couleur du produit à "data-color"
  article.setAttribute("data-color", allProd.color);
  // Ajout de l'article à la section
  section.appendChild(article);
  // Création d'un élement "div"
  const elem = document.createElement("div");
  // Ajout de la classe "cart__item__img" à la "div"
  elem.classList.add("cart__item__img");
  // Ajout de la "div" à l'article
  article.appendChild(elem);
  // Création d'un élement "img"
  let img = document.createElement("img");
  // Ajout de l'attribut "src" de mon produit à image
  img.setAttribute("src", allProd.imageUrl);
  // Ajout de l'attribut "alt" de mon produit à image
  img.setAttribute("alt", allProd.altTxt);
  // Ajout de "img" à la "div"
  elem.appendChild(img);
  // Création d'un élement "div"
  const elem1 = document.createElement("div");
  // Ajout de la classe "cart__item__content" à la "div"
  elem1.classList.add("cart__item__content");
  // Ajout de la classe à la "div"
  article.appendChild(elem1);
  // Création d'un élement "div"
  const elem2 = document.createElement("div");
  // Ajout de la classe "cart__item__content__description" à la "div"
  elem2.classList.add("cart__item__content__description");
  // Ajout de la "div" à la "div" supèrieure
  elem1.appendChild(elem2);
  // Création dun élemebt "h2"
  let title = document.createElement("h2");
  // Ajout du nom de mon produit au "h2"
  title.textContent = allProd.name;
  // Ajout du "h2" à la "div"
  elem2.appendChild(title);
  // Création d'un élément "p"
  let color = document.createElement("p");
  // Ajout de la couleur de mon prod à l'élement "p"
  color.textContent = allProd.color;
  // Ajout de la couleur a la "div"
  elem2.appendChild(color);
  // Création d'un élément "p"
  let price = document.createElement("p");
  // Ajout du prix de mon prod à l'élement "p" + "€"
  price.textContent = allProd.price + "€";
  // Ajout du prix à la "div"
  elem2.appendChild(price);
  // Création d'un élement "div"
  const elem3 = document.createElement("div");
  // Ajout de la classe "cart__item__content__settings" à la "div"
  elem3.classList.add("cart__item__content__settings");
  // Ajout de la classe à ma "div" supèrieure
  elem1.appendChild(elem3);
  // Création d'un élement "div"
  const elem4 = document.createElement("div");
  // Ajout de la classe "cart__item__content__settings__quantity" à la "div"
  elem4.classList.add("cart__item__content__settings__quantity");
  // Ajout de la "div" à celle du dessus
  elem3.appendChild(elem4);
  // Création d'un nouvel élement "p"
  let quantity = document.createElement("p");
  // Ajout d'un texte à l'élement
  quantity.textContent = "Qté : ";
  // Ajout du "p" à la "div"
  elem4.appendChild(quantity);
  // Création d'un "input"
  let input = document.createElement("input");
  // Ajout de l'attribut "type""number"
  input.setAttribute("type", "number");
  // Ajout de la classe "itemQuantity"
  input.classList.add("itemQuantity");
  // Ajout de l'attribut "name" "itemQuantity"
  input.setAttribute("name", "itemQuantity");
  // Ajout de l'attribut "min" "1"
  input.setAttribute("min", "1");
  // Ajout de l'attribut "max" "100"
  input.setAttribute("max", "100");
  // Ajout de l'attribut "value" avec la quantité du produit
  input.setAttribute("value", prod.quantity);
  // Ajout d'un écouteur d'évenement "input"
  input.addEventListener("input", () => {
    // Appel de la fonction de changement de quantité dans le localStorage avec en paramètre la valeur de l'input le produit et le tableau de produits
    changeQuantity(input.value, prod, clientCart);
  });
  // Ajout de l'input à la "div"
  elem4.appendChild(input);
  // Création dun élement "div"
  const elem5 = document.createElement("div");
  // Ajout de la classe "cart__item__content__settings__delete" à la "div"
  elem5.classList.add("cart__item__content__settings__delete");
  // Ajout de la "div" à la deuxième au dessus
  elem3.appendChild(elem5);
  // Création dun élement "p"
  let remove = document.createElement("p");
  // Ajout du texte au "p"
  remove.textContent = "Supprimer";
  // Ajout d'une classe au "p"
  remove.classList.add("deleteItem");
  // Ajout d'un écouteur d'évenement avec 2 paramètres : 1- le type "click" 2- la fonction
  remove.addEventListener("click", function (event) {
    // Appel de la fonction de suppression du produit dans le localStorage avec en param l'évènement le tableau de produits et le produit
    deleteItem(event, clientCart, prod);
  });
  // Ajout du "p" à la "div"
  elem5.appendChild(remove);
  // Appel de la fonction calculant les totaux avec le tableau en paramètre
  totalProduct(clientCart);
};
/**
 *Supprimer l'article du localStorage et de la page
 * @param {*ddEventListener} event
 * @param {*Array} clientCart
 * @param {*Object} prod
 */
// Fonction de suppression avec en paramètre l'évènement le tableau de produits et le produit
const deleteItem = (event, clientCart, prod) => {
  // Déballage du localStorage et récuperation des produits
  const cart = JSON.parse(localStorage.getItem("cmd"));
  // Boucle sur le tableau avec "element" et l'index en paramètre
  clientCart.forEach((elem, index) => {
    // Si le produit entrain d'être ajouté au panier contient un id et une couleur déjà présente dans mon tableau
    if (prod._id === elem._id && prod.color === elem.color) {
      // Alors je supprime l'élement du tableau
      clientCart.splice(index, 1);
      // Et je le supprime aussi de mon localStorage
      cart.splice(index, 1);
      if(clientCart.length === 0){
        alert("Votre panier est vide !")
      }
    }
  });
  // Je remets ensuite les produits stringifié dans le localStorage
  localStorage.setItem("cmd", JSON.stringify(cart));
  // J'appel la fonction de calcul des totaux avec en paramètre le tableau de tous les produits
  totalProduct(clientCart);
  // Je supprime l'article de la page
  event.target.closest("article").remove();
};
/**
 *Changer la quantité du localStorage
 * @param {*Number} inputValue
 * @param {*Object} prod
 * @param {*Array} clientCart
 */
// Fonction de changement de quantité avec en paramètre la valeur de l'input, le produit et le tableau de tous les produits
const changeQuantity = (inputValue, prod, clientCart) => {
  // Déballage du localStorage et récuperation des produits
  const cart = JSON.parse(localStorage.getItem("cmd"));
  // Boucle sur le tableau avec "element" et l'index en paramètre l'element et l'index
  clientCart.forEach((elem, index) => {
    // Si le produit entrain d'être ajouté au panier contient un id et une couleur déjà présente dans mon panier et que la qté est juste
    if (
      prod._id === elem._id &&
      prod.color === elem.color &&
      prod.quantity != inputValue &&
      inputValue > 0 &&
      inputValue <= 100
    ) {
      prod.quantity = inputValue;
      elem.quantity = inputValue;
      cart[index].quantity = inputValue;
      document.getElementById("order").disabled = false;
    }
    if (
      prod._id === elem._id &&
      prod.color === elem.color &&
      prod.quantity != inputValue &&
      inputValue <= 0
    ) {
      cart[index].quantity = inputValue;
      elem.quantity = 0;
      prod.quantity = 0;
      alert("La quantité minimum est 1");
    }
    if (
      prod._id === elem._id &&
      prod.color === elem.color &&
      prod.quantity != inputValue &&
      inputValue > 100
    ) {
      elem.quantity = 0;
      prod.quantity = 0;
      cart[index].quantity = 0;
      alert("La quantité maximum est 100");
    }
  });

  // Je remets ensuite les produits stringifié dans le localStorage
  localStorage.setItem("cmd", JSON.stringify(cart));
  // J'appel la fonction de calcul des totaux avec en paramètre le tableau de tous les produits
  totalProduct(clientCart);
};

/**
 * Calculer le total quantité et total prix
 * @param {Array} clientCart
 */
// Fonction de calcul des totaux avec en paramètre le tableau de tous les produits
const totalProduct = (clientCart) => {
  // Création de 2 variables ayant une valeur de 0
  let totalQty = 0;
  let totalPrice = 0;
  // Boucle sur le tableau avec "element" en paramètre
  clientCart.forEach((element) => {
    // Affectation d'une nouvelle quantité au total
    totalQty += parseInt(element.quantity);
    // Calcul du total
    totalPrice += parseInt(element.price) * parseInt(element.quantity);
  });
  // Ajout de la quantité totale à "totalQty"
  document.getElementById("totalQuantity").textContent = totalQty;
  // Ajout de la quantité totale à "totalPrice"
  document.getElementById("totalPrice").textContent = totalPrice;
  checkProd(clientCart);
};

const checkProd = (clientCart) => {
  for (let i in clientCart) {
    if (
      clientCart[i].quantity === "undefined" ||
      clientCart[i].quantity === 0 ||
      clientCart[i].quantity > 100
    ) {
      document.getElementById("order").disabled = true;
    }
  }
};

/************************* PARTIE FORMULAIRE***********************/
/**
 * Récupération des données du formulaire et création de l’objet contact
 * @param {Array} clientCart
 * @param {*Event} e
 * @returns Boolean
 */
const order = (clientCart, e) => {
  // Empecher le comportement par défaut
  e.preventDefault();
  // Affectation du résultat de getData()à la const contact
  const contact = getData();
  // Test de la valeur de chacuns des index de l'objet contact
  for (let i in contact) {
    if (!contact) {
      alert("Veuillez remplir le formulaire");
      return false;
    }
  }

  // Récuperation du formulaire dans la constante
  console.log(contact);
  // Appel de la fonction de récuperation des identifiants
  const products = checkCart(clientCart);
  console.log(products);
  // Si il y a des identifiants
  if (products.length != 0) {
    // Alors création dun objet contenant le formulaire et l'id des produits
    let data = {
      contact,
      products,
    };
    // Appel de la fonction d'envoie des données avec l'objet en paramètre
    sendData(data);
  }
  // Retour attendu
  return false;
};
/**
 * Envoi des données au back
 * @param {Object} data
 */
// Fonction en charge d'envoyer les données avec l'objet contenant la commande en paramètre
const sendData = async (data) => {
  try {
    // url de l'API avec order
    const urlApi = "http://localhost:3000/api/products/order";
    // Essayé d'envoyer le produit
    const response = await fetch(urlApi, {
      // Type de méthode à employer pour fetch
      method: "POST",
      // Type de format de données
      headers: {
        "Content-Type": "application/json",
      },
      // Transformation d'un objet JSON en chaine de caractéres
      body: JSON.stringify(data),
    });
    // Si la réponse est négative lancement d'une nouvelle erreur
    if (!response.ok) {
      throw new Error(`"erreur http :" ${response.status}`);
    } else {
      // Sinon récuperation de la reponse au format json
      const order = await response.json();
      console.log(order);
      // Changement d'url
      window.location = "confirmation.html?orderId= " + order.orderId;
    }
    // Recherche d'une erreur
  } catch (error) {
    // Affichage de l'erreur
    alert(error);
  }
};
/**
 * Récuperation des champs du form
 * @returns object
 */
const getData = () => {
  let contact = {};
  const selectForm = document.forms[0];
  // Pour chaque champs en faisant checkData si le champs n'est pas rempli retour false attendu
  const firstName = selectForm.elements.firstName.value;
  if (checkData("firstName", firstName)) {
    return false;
  }
  // Sinon "firstName" dans contact sera égale à la valeur dans le formulaire
  contact.firstName = firstName;

  // Pour chaque champs en faisant checkData si le champs n'est pas rempli retour false attendu
  const lastName = selectForm.elements.lastName.value;
  if (checkData("lastName", lastName)) {
    return false;
  }
  // Sinon "lastName" dans contact sera égale à la valeur dans le formulaire
  contact.lastName = lastName;
  // Pour chaque champs en faisant checkData si le champs n'est pas rempli retour false attendu
  const address = selectForm.elements.address.value;
  if (checkData("address", address)) {
    return false;
  }
  // Sinon "address" dans contact sera égale à la valeur dans le formulaire
  contact.address = address;
  // Pour chaque champs en faisant checkData si le champs n'est pas rempli retour false attendu
  const city = selectForm.elements.city.value;
  if (checkData("city", city)) {
    return false;
  }
  // Sinon "city" dans contact sera égale à la valeur dans le formulaire
  contact.city = city;
  // Pour chaque champs en faisant checkData si le champs n'est pas rempli retour false attendu
  const email = selectForm.elements.email.value;
  if (checkData("email", email)) {
    return false;
  }
  // Sinon "email" dans contact sera égale à la valeur dans le formulaire
  contact.email = email;

  return contact;
};
/**
 * Récuperation des identifiants
 * @param {Array} clientCart
 * @returns Array (id)
 */
// Fonction de récuperation des identifiants avec le tableau de produits en paramètre
const checkCart = (clientCart) => {
  // Création d'un tableau vide
  prodsId = [];
  // Boucle sur le tableau de produits avec element en paramètre
  clientCart.forEach((element) => {
    // Ajout de l'identifiant du produit au tableau "prodsId"
    prodsId.push(element._id);
  });
  // Retour du tableau "prodsId" attendu
  return prodsId;
};
/**
 * Attente des réponses du controle des champs du formulaire
 * @param {Event} e
 * @returns Boolean
 */
// Fonction qui va renvoyer false si checkData renvoi true (si le test de la regex à marché donc le champs contient un truc qu'il ne devrait pas)
const checkContent = (e) => {
  // Appel de la fonction de verification, si le champ contient un caractère ou un élement non autorisé
  if (checkData(e.target.id, e.target.value)) {
    // Alors retour false attendu
    return false;
  } else {
    // Nettoyage du champ erreur
    document.getElementById(`${e.target.id}ErrorMsg`).textContent = "";
  }
  return true;
};

/**
 * Controle des champs du formulaire avec le type et la valeur du champ en paramètre
 * @param {*Number} totalQty
 * @param {*Array} clientCart
 */
const checkData = (type, val) => {
  // Variable contenant "false"
  let ret = false;

  // Test de plusieurs champs à la fois
  switch (type) {
    case "firstName":
    case "lastName":
    case "city":
      // Appel de la fonction de controle de la présence d'un nombre
      ret = checkNoNumber(type, val);
      // Si la valeur de "ret" est à true alors on arrète
      break;
    case "address":
      // Appel de la fonction de controle de la présence de caractères speciaux
      ret = checkAdress(type, val);
      // Si la valeur de "ret" est à true alors on arrète
      break;
    case "email":
      // Appel de la fonction de controle de la validité de l'email
      ret = checkEmail(type, val);
      // Si la valeur de "ret" est à false alors on arrète
      break;
    // Si un problème se produit alors alerte
    default:
      alert("une erreur sest produite, veuillez réessayer");
  }
  // Retour des test qui sont renvoyé la fonction appellante (checkCart)
  return ret;
};

// Déclaration des constantes pour les regex
const checkSpecialValue = /[§!@#$%^&*(),.?":{}|<>]/;
const checkNumberValue = /[0-9]/;
const checkEmailValue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
/**
 *
 * @param {*Input} type
 * @param {*String} val
 * @returns Boolean
 */
// Check pas de nombres avec type et valeur en paramètre
const checkNoNumber = (type, val) => {
  // Affichage du type d'erreur sous le champ
  const msgErro = document.getElementById(`${type}ErrorMsg`);
  // Si une erreur dans les tests regex a été trouvé ou que le champ est vide
  if (
    checkNumberValue.test(val) === true ||
    checkSpecialValue.test(val) ||
    val == ""
  ) {
    // Alors afficher un msg erreur sous le champ
    msgErro.textContent = `Le champ ${type} n'est pas valide`;
    // Retour "true" attendu
    return true;
  }
  // Sinon retour "false" attendu
  return false;
};

/**
 *
 * @param {*Input} type
 * @param {*String} val
 * @returns Boolean
 */
// Check pas de caractères spéciaux avec type et valeur en paramètre
const checkAdress = (type, val) => {
  const msgErro = document.getElementById(`${type}ErrorMsg`);
  if (checkSpecialValue.test(val) === true || val == "") {
    // Affichage du type d'erreur sous le champ
    msgErro.textContent = `Le champ ${type} n'est pas valide`;
    // Retour "true" attendu
    return true;
  }
  // Sinon retour "false" attendu
  return false;
};
/**
 *
 * @param {*Input} type
 * @param {*String} val
 * @returns Boolean
 */
// Check email avec type et valeur en paramètre
const checkEmail = (type, val) => {
  const msgErro = document.getElementById(`${type}ErrorMsg`);
  // La réponse au test de la regex doit être fausse pour déclancher un erreur
  if (checkEmailValue.test(val) === false || val == "") {
    // Affichage du type d'erreur sous le champ
    msgErro.textContent = `Le champ ${type} n'est pas valide`;
    // Retour "true" attendu
    return true;
  }
  // Sinon retour "false" attendu
  return false;
};
