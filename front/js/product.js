window.onload = () => {
  console.log("Dom is loaded");
  getId();
};
const getId = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  console.log(idProduct);
  getData(idProduct);
};

const getData = async (idProduct) => {
  try {
    const content = await retrieveProduct(idProduct);
    console.log(content);
    console.log(typeof content.error);
    if (typeof content.error === "undefined") {
      displayProd(content);
    } else "Error", content.msg;
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};

const retrieveProduct = async (idProduct) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${idProduct}`;
    let response = await fetch(prodApi);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    return { error: true, msg: error };
  }
};

const displayProd = (product) => {
  let h1 = (document.getElementById("title").textContent = product.name);
  console.log(product.name);
};

//3eme
// afficher le produit
// appeler fonction qui attache un ecouteur
