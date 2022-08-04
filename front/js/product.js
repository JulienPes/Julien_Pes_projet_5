window.onload = () => {
  console.log("Dom is loaded");
  getId();
};
const getId = () => {
  let firstArg = new URLSearchParams(window.location.search).get("id");
  console.log(firstArg);
  getProduct(firstArg);
};

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

const attach = (id) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    add(id);
  });
};

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
const checkSelected = (optSelected) => {
  if (!optSelected) {
    alert("Vous devez choisir une couleur !");
    return false;
  }
  return true;
};

// const createProd = (prod) => {
//   let img = document.createElement("img");
//   img.setAttribute("src", prod.imageUrl);
//   img.setAttribute("alt", prod.altTxt);

//   document.getElementsByClassName("item__img")[0].appendChild(img);
//   document.getElementById("price").textContent = prod.price;
//   document.getElementById("title").textContent = prod.name;
//   document.getElementById("description").textContent = prod.description;
//   prod.colors.forEach((color) => {
//     let option = new Option(color, color);
//     document.getElementById("colors").appendChild(option);

//     attach(prod._id)
//   });
// };

/*
const getProduct = async (prod) => {
  try {
    const prodApi = `http://localhost:3000/api/products/${prod}`;
    const response = await fetch(prodApi);
    if (!response.ok) {
      throw new error(`"erreur http :" ${response.status}`);
    } else {
      const product = await response.json();
      console.log(product);
      createProd(product);
    }
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};

const createProd = (prod) => {
  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);

  document.getElementsByClassName("item__img")[0].appendChild(img);
  document.getElementById("price").textContent = prod.price;
  document.getElementById("title").textContent = prod.name;
  document.getElementById("description").textContent = prod.description;
  prod.colors.forEach((color) => {
    let option = new Option(color, color);
    document.getElementById("colors").appendChild(option);

    attach(prod._id)
  });
};

const attach = (prod) => {
  document.getElementById("addToCart").addEventListener("click" , () =>{
addProd(prod)
  })  
};
const addProd = (prod) =>{
 const quant =  document.getElementById("quantity").value
 let selectOpt = document.getElementById("colors")
 const opt = selectOpt.options[selectOpt.selectedIndex].value
 console.log(quant);
 console.log(opt);
}

 

/*
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
