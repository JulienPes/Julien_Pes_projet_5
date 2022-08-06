window.onload = () => {
  console.log("Dom is loaded");
  getId();
};
// Récup ID
const getId = () => {
  const urlId = new URLSearchParams(window.location.search).get("id");
  console.log(urlId);
  getData(urlId);
};

const getData = async (id) => {
  try {
    const urlApi = `http://localhost:3000/api/products/${id}`;
    const response = await fetch(urlApi);
    if (response.ok) {
      const prod = await response.json();
      console.log(prod);
      displayProd(prod);
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
  document.getElementById("title").textContent = prod.name;
  document.getElementById("price").textContent = prod.price;
  document.getElementById("description").textContent = prod.description;
  prod.colors.forEach((color) => {
    let opt = new Option(color, color);
    document.getElementById("colors").appendChild(opt);
  });
  attach(prod._id);
};

const attach = (prod) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    add(prod);
  });
};

const add = (product) => {
  let colorOpt = document.getElementById("colors");
  const clrValue = colorOpt.options[colorOpt.selectedIndex].value;
  let qtyValue = document.getElementById("quantity").value;

  if (clrChoice(clrValue) && qtyChoice(qtyValue)) {
    let btn = (document.getElementById("addToCart").disabled = true);
    let prd = {
      _id: product,
      color: clrValue,
      quantity: qtyValue,
    };
    let objLinea = JSON.stringify(prd);
    localStorage.setItem("obj", objLinea);
    console.log(objLinea);
  }
};

const clrChoice = (clrValue) => {
  if (!clrValue) {
    alert("Veuillez choisir une couleur !");
    return false;
  }
  return true;
};
const qtyChoice = (qtyValue) => {
  if (qtyValue === "undefined" || 0 >= qtyValue || 100 < qtyValue) {
    alert("Veuillez choisir la quantité !");
    return false;
  }
  return true;
};
