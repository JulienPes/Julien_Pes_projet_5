window.onload = () => {
  console.log("Dom is loaded");
  getId();
};
const getId = () => {
  let firstArg = new URLSearchParams(window.location.search).get("id");
  console.log(firstArg);
  getProduct(firstArg);
};

const getProduct = async (zeub) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${zeub}`;
    const response = await fetch(prodApi);
    if (!response.ok) {
      throw new Error(`"erreur http :" ${response.status}`);
    }
    const product = await response.json();
    console.log(product);
    if (product.ok != "undefined") {
      displayProd(product);
    } else {
      "Error", product.msg;
    }
  } catch (error) {
    return { error: true, msg: error };
  }
};

const displayProd = (prod) => {
  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);
  let title = document.getElementById("title");
  title.textContent = prod.name;
  document.getElementsByClassName("item__img")[0].appendChild(img);
  let text = document.getElementById("description");
  text.textContent = prod.description;
};

//3eme
// afficher le produit
// appeler fonction qui attache un ecouteur
/*
const getProduct = async (idProduct) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${idProduct}`;
    let response = await fetch(prodApi);
    if (!response.ok) {
      throw new Error(`"erreur http :" ${response.status}`);
    }
    const product = await response.json();

    if (typeof product.error === "undefined") {
      displayProd(product);
    } else "Error", content.msg;
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};

const displayProd = (product) => {
  let h1 = (document.getElementById("title").textContent = product.name);
  console.log(product.name);
};
*/
