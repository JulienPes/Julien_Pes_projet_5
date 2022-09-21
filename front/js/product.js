/**
 * Appeler la première fonction dès le chargement du "dom"
 */
// Attendre que le dom soit chargé
window.onload = () => {
  console.log("Dom is loaded");
  //appel de la fonction de récupération id produit
  getId();
};

/**
 * Récupérer l'identifiant du produit
 */
const getId = () => {
  // new URLSearchParams, récupération des paramètres get ( après le "?")
  const urlId = new URLSearchParams(window.location.search).get("id");
  console.log(urlId);
  // Appel fonction de récuperation des produits avec "id" en param
  getProd(urlId);
};
/**
 *Récupérer les données du produit
 * @param {*String} id
 */
const getProd = async (id) => {
  try {
    // url de l'API avec id produit
    const prodApi = `http://localhost:3000/api/products/${id}`;
    // Essayé de récupérer le produit
    const response = await fetch(prodApi);
    // Si la réponse est a false
    if (!response.ok) {
      // Lancement d'une nouvelle error en cas de problème
      throw new Error(`"erreur http :" ${response.status}`);
    }
    // Sinon récupérer la réponse au format json
    const product = await response.json();
    // Appel fonction d'affichage produit avec l'objet en paramètre
    displayProd(product);
    // Attraper l'erreur
  } catch (error) {
    // Affichage d'une alert avec le parametre de l'erreur
    alert(error);
  }
};
/**
 *Afficher les éléments du produit
 * @param {*Object} product
 */
const displayProd = (product) => {
  // Création d'image
  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  // Affichage de l'image du tableau [0]
  document.getElementsByClassName("item__img")[0].appendChild(img);
  // Affichage titre
  document.getElementById("title").textContent = product.name;
  // Affichage prix
  document.getElementById("price").textContent = product.price;
  // Affichage description
  document.getElementById("description").textContent = product.description;
  // Boucle sur mon tableau de couleurs
  product.colors.forEach((color) => {
    // Création de nouvelles options
    let opt = new Option(color, color);
    // Affichage de l'option a chaque tour de boucle
    document.getElementById("colors").appendChild(opt);
  });
  // Appel fonction attacheur d'évènement avec id du prod en paramètre
  attach(product._id);
};
/**
 *Ajouter un écouteur d'evenement au bouton "Ajouter au panier"
 * @param {String} idProd
 */
// Fonction attacheur d'évènement
const attach = (idProd) => {
  // Ajout d'évenement "click" au bouton d'ajout au panier
  document.getElementById("addToCart").addEventListener("click", () => {
    // Au "click" appel de la fonction d'ajout au panier avec id du prod en paramètre
    add(idProd);
  });
};
/**
 *Ajouter le produit au panier
 * @param {String} product
 */
//
const add = (idProduct) => {
  // Récupération de l'id "colors"
  let colorOpt = document.getElementById("colors");
  // Récupération de la valeur séléctionné dans l'index du tableau de couleur
  const clrValue = colorOpt.options[colorOpt.selectedIndex].value;
  // Récupération de la valeur de la quantité
  let qtyValue = document.getElementById("quantity").value;
  // Si couleur sélectionné et nombre supèrieur à 0 et infèrieur à 100
  if (optSelected(clrValue) && nbSelected(qtyValue)) {
    // Alors désactivation du bouton d'ajout au panier
    document.getElementById("addToCart").disabled = true;
    // Création de l'objet du produit séléctionné
    prd = {
      _id: idProduct,
      color: clrValue,
      quantity: parseInt(qtyValue),
    };
    console.log(prd);
    // Appel de la fonction de stockage dans le localStorage
    putToCart(prd);
  }
};

/**
 *Vérifier que une couleur a bien était choisie
 * @param {String} value
 * @returns Boolean
 */
// Fonction déterminant si couleur séléctionnée avec la couleur en paramètre
const optSelected = (clrValue) => {
  // Si pas d'option sélectionnée
  if (!clrValue) {
    // Affichage d'une alerte
    alert("Veuillez choisir une couleur");
    // Réponse attendue
    return false;
  }
  // Sinon réponse attendue
  return true;
};
/**
 *Vérifier que le nombre sélectionné soit compris entre 1 et 100
 * @param {String} qtyValue
 * @returns Boolean
 */
// Fonction déterminant si quantité séléctionnée avec le nombre en paramètre
const nbSelected = (qtyValue) => {
  // Si la quantité n'esxiste pas ou n'est pas bonne
  if (qtyValue === "undefined" || 0 >= qtyValue || 100 < qtyValue) {
    // Alors alerte
    alert("Veuillez selectionner une quantité valide");
    // Réponse "false" attendue
    return false;
  }

  // Sinon reponse "true"
  return true;
};
/**
 * Mettre dans le localStorage le produit
 */
const putToCart = (prd) => {
  console.log(prd);
  // Création d'une variable vide
  let cart;
  // Si il n'y a pas déjà de produit dans le localStorage
  if (!localStorage.getItem("cmd")) {
    // Alors création d'un tableau vide
    cart = [];

    // Insertion d'un nouveau produit dans le tableau
    cart.push(prd);
  } else {
    // Sinon déballage du localStorage et récuperation des produits
    cart = JSON.parse(localStorage.getItem("cmd"));

    // Appel de la fonction  de controlle d'un produit existant avec le produit et le tableau en param
    if (!checkCart(prd, cart)) {
      // Si le produit n'existe pas alors insertion du nouveau produit dans le tableau
      cart.push(prd);
    }

    console.log(cart);
  }
  // Je remets cart stringifié dans le localStorage
  localStorage.setItem("cmd", JSON.stringify(cart));
  // Réactivation du bouton d'ajout au panier
  document.getElementById("addToCart").disabled = false;
  // Création d'une alerte d'ajout au panier
  alert("Produit ajouté");
};
/**
 * Controller que le produit avec le même id n'est pas dejà dans le panier ( et la même couleur )
 * @param {Object} prd
 * @param {Array} cart
 */
// Fonction  de controlle d'un produit existant avec le produit et le tableau en param
const checkCart = (prd, cart) => {
  // Boucle sur le tableau de produits
  for (let i in cart) {
    // Si le produit entrain d'être ajouté au panier contient un id et une couleur déjà présente dans mon panier
    if (prd._id === cart[i]._id && prd.color === cart[i].color) {
      // Alors ajout d'une quantité au produit existant
      cart[i].quantity += prd.quantity;
      // Retour "true" attendu
      return true;
    }
  }
  return false;
};
