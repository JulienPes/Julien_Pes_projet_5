/**
 * Appeler la première fonction dès le chargement du "dom"
 */
window.onload = () => {
  console.log("Dom is loaded");
  getId();
};

/**
 * Récupérer l'identifiant du produit
 */
const getId = () => {
  const urlId = new URLSearchParams(window.location.search).get("id");
  console.log(urlId);
  getProd(urlId);
};
/**
 *Récupérer les données du produit
 * @param {*String} id
 */
const getProd = async (id) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${id}`;
    const response = await fetch(prodApi);
    if (!response) {
      throw new Error(`"erreur http :" ${response.status}`);
    }
    const product = await response.json();
    console.log(product);
    displayProd(product);
  } catch (error) {
    alert(error);
  }
};
/**
 *Afficher les éléments du produit
 * @param {*Object} product
 */
const displayProd = (product) => {
  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  document.getElementsByClassName("item__img")[0].appendChild(img);
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;

  product.colors.forEach((color) => {
    let opt = new Option(color, color);
    document.getElementById("colors").appendChild(opt);
  });
  // for (let color of product.colors) {
  //   let opt = new Option(color, color);
  //   document.getElementById("colors").appendChild(opt);
  attach(product._id);
};
/**
 *Ajouter un écouteur d'evenement au bouton "Ajouter au panier"
 * @param {String} idProd
 */
const attach = (idProd) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    add(idProd);
  });
};
/**
 *Créer un objet du produit
 * @param {String} product
 */
const add = (product) => {
  let colorOpt = document.getElementById("colors");
  const clrValue = colorOpt.options[colorOpt.selectedIndex].value;
  let qtyValue = document.getElementById("quantity").value;

  if (optSelected(clrValue) && nbSelected(qtyValue)) {
    let btn = (document.getElementById("addToCart").disabled = true);
    let prd = {
      _id: product,
      color: clrValue,
      quantity: qtyValue,
    };
    //   let objLinea = JSON.stringify(prd);
    //   localStorage.setItem("obj", objLinea);
    //   console.log(objLinea);
    putToCart(prd);
  }
};
/**
 *Vérifier que une couleur a bien était choisie
 * @param {String} value
 * @returns Boolean
 */
const optSelected = (clrValue) => {
  if (!clrValue) {
    alert("Veuillez choisir une couleur");
    return false;
  }
  return true;
};
/**
 *Vérifier que le nombre sélectionné soit compris entre 1 et 100
 * @param {Number} value
 * @returns Boolean
 */
const nbSelected = (qtyValue) => {
  if (qtyValue === "undefined" || 0 >= qtyValue || 100 < qtyValue) {
    alert("Veuillez selectionner une quantité valide");
    return false;
  }
  return true;
};

/**
 * Mettre dans le localStorage le produit
 */
const putToCart = (prd) => {
  let cart;
  if (!localStorage.getItem("cmd")) {
    cart = [];
    cart.push(prd);
  } else {
    cart = JSON.parse(localStorage.getItem("cmd"));
    const exist = checkCart(prd, cart);
    if (exist) {
      cart[i].quantity++;
      // modifier la quantité dans cart du prod deja existant
    } else {
      cart.push(prd);
    }
  }
  localStorage.setItem("cmd", JSON.stringify(cart));
  alert("Produit ajouté");
};
/**
 * Controller que le produit avec le même id n'est pas dejà dans le panier ( et la même couleur )
 * @param {Object} prd
 * @param {Array} cart
 */
const checkCart = (prd, cart) => {
  for (i = 0; i < cart.length; i++) {
    if (prd._id == cart[i]._id && prd.color == cart[i].color) {
      return true;
    } else {
      console.log("erreur");
      return false;
    }
  }
};
