window.onload = () => {
  console.log("Dom is loaded");
  getId();
};
// Récup ID

const getId = () => {
  const urlId = new URLSearchParams(window.location.search).get("id");
  getProd(urlId);
};

/*
const getId = () => {
  let firstArg = new URLSearchParams(window.location.search).get("id");
  console.log(firstArg);
  getProduct(firstArg);
};
*/
// Contact serveur
const getProd = async (id) => {
  try {
    const getUrl = `http://localhost:3000/api/products/${id}`;
    const response = await fetch(getUrl);
    if (!response) {
      throw new Error(`"erreur http " : ${response.status}`);
    }
    const prod = await response.json();
    console.log(prod);
    displayProd(prod);
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};

/*

const getProduct = async (prod) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${prod}`;
    const response = await fetch(prodApi);
    if (!response.ok) {
      throw new Error(`"erreur http :" ${response.status}`);
    } else {
      const products = await response.json();
      console.log(products);
      displayProd(products);
    }
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};
*/
// Affiche les produits

const displayProd = (prodCard) => {
  const img = document.createElement("img");
  img.setAttribute("src", prodCard.imageUrl);
  img.setAttribute("alt", prodCard.altTxt);
  document.getElementsByClassName("item__img")[0].appendChild(img);
  document.getElementById("title").textContent = prodCard.name;
  document.getElementById("price").textContent = prodCard.price;
  document.getElementById("description").textContent = prodCard.description;

  prodCard.colors.forEach((color) => {
    const opt = new Option(color, color);
    document.getElementById("colors").appendChild(opt);
  });
  attach(prodCard._id);
};

/*
const displayProd = (prod) => {
  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);

  document.getElementsByClassName("item__img")[0].appendChild(img);
  document.getElementById("title").innerHTML = prod.name;
  document.getElementById("price").innerHTML = prod.price;
  document.getElementById("description").textContent = prod.description;

  prod.colors.forEach((color) => {
    let opt = new Option(color, color);
    document.getElementById("colors").appendChild(opt);
  });
  attach(prod._id);
};
*/
// Ajoute un écouteur

const attach = (id) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    add(id);
  });
};

const add = (prod) => {
  let color = document.getElementById("colors");
  const selectedColor = color.options[color.selectedIndex].value;
  const selectedQty = document.getElementById("quantity").value;
  console.log(checkColor(selectedColor));
  console.log(checkOpt(selectedQty));
  if (checkOpt(selectedQty) && checkColor(selectedColor)) {
    const but = (document.getElementById("addToCart").disabled = true);
    let order = {
      Identifiant: prod,
      Couleur: selectedColor,
      Quantité: selectedQty,
    };
    console.log(order);
  }
};

const checkOpt = (selectedQty) => {
  if (
    "undefined" === typeof selectedQty ||
    0 >= selectedQty ||
    100 < selectedQty
  ) {
    alert("Veuillez choisir une quantité !");
    return false;
  }
  return true;
};
const checkColor = (selectedColor) => {
  if (!selectedColor) {
    alert("Veuillez choisir une couleur !");
    return false;
  }
  return true;
};

/*
const attach = (id) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    add(id);
  });
};
*/
// Valide le panier

/*
const add = (id) => {
  const quanty = document.getElementById("quantity").value;
  let color = document.getElementById("colors");
  const opt = color.options[color.selectedIndex].value;
  console.log(checkQuant(quanty));
  console.log(checkSelected(opt));
  if (checkQuant(quanty) && checkSelected(opt)) {
    const but = (document.getElementById("addTocart").disabled = true);
  }
};
*/
// Vérifie la quantité

/*
const checkQuant = (quanty) => {
  if (
    "undefined" === typeof quanty ||
    0 >= parseInt(quanty) ||
    100 < parseInt(quanty)
  ) {
    alert("Vous devez selectionner une quantité entre 1 et 100 !");
    document.getElementById("quantity").value = 1;
    return false;
  }
  return true;
};
*/
// Vérifie la couleur

/*
const checkSelected = (optSelected) => {
  if (!optSelected) {
    alert("Vous devez choisir une couleur !");
    return false;
  }
  return true;
};
*/
