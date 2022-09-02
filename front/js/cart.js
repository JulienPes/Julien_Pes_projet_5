/**
 * Appeler la première fonction dès le chargement du "dom"
 */
window.onload = () => {
  console.log("Dom is loaded");
  getStorage();
};
/**
 * Recuperer le local storage , verifier qu'il ne soit pas vide
 */
const getStorage = () => {
  if (!localStorage.getItem("cmd")) {
    alert("votre panier est vide !");
  } else {
    const storage = JSON.parse(localStorage.getItem("cmd"));
    getId(storage);
  }
};
/**
 * Boucle sur local storage et récuperation l'id
 * @param {*Array} products
 */
const getId = async (products) => {
  clientCart = [];
  try {
    for (let product of products) {
      const productId = product._id;
      const prodUrl = `http://localhost:3000/api/products/${productId}`;
      const response = await fetch(prodUrl);
      if (!response.ok) {
        throw new Error(`"erreur http :" ${response.status}`);
      } else {
        const oneProduct = await response.json();
        oneProduct.color = product.color;
        oneProduct.quantity = product.quantity;
        clientCart.push(oneProduct);
        displayProd(oneProduct, product, clientCart);
      }
    }
    document.getElementById("order").addEventListener("click", (e) => {
      order(clientCart, e);
    });
  } catch (error) {
    alert(error);
  }
};

/**
 * Afficher le produit et attacher plusieurs evenements
 * @param {*Object} allProd
 * @param {*Object} prod
 * @param {*Array} clientCart
 */
const displayProd = (allProd, prod, clientCart) => {
  let section = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", allProd._id);
  article.setAttribute("data-color", allProd.color);
  section.appendChild(article);
  const elem = document.createElement("div");
  elem.classList.add("cart__item__img");
  article.appendChild(elem);
  let img = document.createElement("img");
  img.setAttribute("src", allProd.imageUrl);
  img.setAttribute("alt", allProd.altTxt);
  elem.appendChild(img);
  const elem1 = document.createElement("div");
  elem1.classList.add("cart__item__content");
  article.appendChild(elem1);
  const elem2 = document.createElement("div");
  elem2.classList.add("cart__item__content__description");
  elem1.appendChild(elem2);
  let title = document.createElement("h2");
  title.textContent = allProd.name;
  elem2.appendChild(title);
  let color = document.createElement("p");
  color.textContent = allProd.color;
  elem2.appendChild(color);
  let price = document.createElement("p");
  price.textContent = allProd.price + "€";
  elem2.appendChild(price);
  const elem3 = document.createElement("div");
  elem3.classList.add("cart__item__content__settings");
  elem1.appendChild(elem3);
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
  input.setAttribute("value", prod.quantity);
  input.addEventListener("input", () => {
    changeQuantity(input.value, prod, clientCart);
  });
  elem4.appendChild(input);
  const elem5 = document.createElement("div");
  elem5.classList.add("cart__item__content__settings__delete");
  elem3.appendChild(elem5);
  let remove = document.createElement("p");
  remove.textContent = "Supprimer";
  remove.classList.add("deleteItem");
  remove.addEventListener("click", (event) => {
    deleteItem(event, clientCart, prod);
  });
  elem5.appendChild(remove);
  totalProduct(clientCart);
};

/**
 *Supprimer l'article du localStorage
 * @param {*ddEventListener} event
 * @param {*Array} clientCart
 * @param {*Object} prod
 */
const deleteItem = (event, clientCart, prod) => {
  const cart = JSON.parse(localStorage.getItem("cmd"));

  clientCart.forEach((elem, index) => {
    if (prod._id === elem._id && prod.color == elem.color) {
      clientCart.splice(index, 1);

      cart.splice(index, 1);
    }
  });
  localStorage.setItem("cmd", JSON.stringify(cart));
  totalProduct(clientCart);
  event.target.closest("article").remove();
};

/**
 *Changer la quantité du localStorage
 * @param {*Number} inputValue
 * @param {*Object} prod
 * @param {*Array} clientCart
 */
const changeQuantity = (inputValue, prod, clientCart) => {
  const cart = JSON.parse(localStorage.getItem("cmd"));

  clientCart.forEach((elem, index) => {
    if (prod._id === elem._id && prod.color === elem.color) {
      elem.quantity = inputValue;
      cart[index].quantity = inputValue;
      totalProduct(clientCart);
    }
  });
};

/**
 * Calculer le total quantité et total prix
 * @param {Array} clientCart
 */
const totalProduct = (clientCart) => {
  let totalQty = 0;
  let totalPrice = 0;
  clientCart.forEach((element, index) => {
    totalQty += parseInt(element.quantity);
    totalPrice += parseInt(element.price) * parseInt(element.quantity);
  });

  document.getElementById("totalQuantity").textContent = totalQty;
  document.getElementById("totalPrice").textContent = totalPrice;
  retrieveForm(clientCart);
  //(totalQty, clientCart);
};
const retrieveForm = () => {
  let contact = {};

  let firstName = document.getElementById("firstName");
  firstName.addEventListener("blur", (e) => {
    let firstNameValue = e.target.value;
    if (checkData("firstName", firstNameValue)) {
      console.log("zeze");
      return false;
    } else {
      contact.firstName = firstNameValue;
      console.log("zozo");
      return true;
    }
  });
  let lastName = document.getElementById("lastName");
  lastName.addEventListener("blur", (e) => {
    let lastNameValue = e.target.value;
    if (checkData("lastName", lastNameValue)) {
      return false;
    } else {
      contact.lastName = lastNameValue;
      console.log("zozo");
      return true;
    }
  });
  let address = document.getElementById("address");
  address.addEventListener("blur", (e) => {
    let addressValue = e.target.value;
    if (checkData("address", addressValue)) {
      return false;
    } else {
      contact.address = addressValue;
      console.log("zozo");
      return true;
    }
  });
  let city = document.getElementById("city");
  city.addEventListener("blur", (e) => {
    let cityValue = e.target.value;
    if (checkData("city", cityValue)) {
      return false;
    } else {
      contact.city = cityValue;
      console.log("zozo");
      return true;
    }
  });
  let email = document.getElementById("email");
  email.addEventListener("blur", (e) => {
    let emailValue = e.target.value;
    if (checkData("email", emailValue)) {
      return false;
    } else {
      contact.email = emailValue;
      console.log("zozo");
      return true;
    }
  });

  console.log(contact);
  contact = {
    prénom: firstName.value,
    nom: lastName.value,
    adresse: address.value,
    ville: city.value,
    mail: email.value,
  };
  console.log(contact);
  return contact;
};

const checkCart = (clientCart) => {
  prodsId = [];
  clientCart.forEach((element) => {
    prodsId.push(element._id);
  });

  return prodsId;
};

/**
 * Récupérer les champs du formulaire et créer un objet contact
 * @param {*Number} totalQty
 * @param {*Array} clientCart
 */
const checkData = (type, val) => {
  let ret = false;
  switch (type) {
    case "firstName":
    case "lastName":
    case "city":
      ret = checkNumber(type, val);
      break;
    case "firstName":
    case "lastName":
    case "city":
    case "adress":
      ret = checkNumberCaracters(type, val);

    case "address":
      ret = checkAdress(type, val);
      break;
    case "email":
      ret = checkEmail(type, val);
      break;
    case "firstName":
    case "lastName":
    case "city":
      ret = checkCaracters(type, val);
  }
  return ret;
};

const checkSpecialValue = /[§!@#$%^&*(),.?":{}|<>]/;
const checkNumberValue = /[0-9]/;
const checkEmailValue = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

///^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const checkNumber = (type, val) => {
  if (
    checkNumberValue.test(val) === true ||
    checkSpecialValue.test(val) ||
    val === ""
  ) {
    // afficher msg erreur sous le champ
    console.log("erreur caractères");
    return true;
  }
  console.log("tvb");
  return false;
};
// const checkName = (type , val) =>{
//   if (checkName.test)
// }

const checkAdress = (type, val) => {
  if (checkSpecialValue.test(val) === true || val === "") {
    // afficher msg erreur sous le champ
    console.log("erreur caractères");
    return true;
  }
  console.log("tvb");
  return false;
};
const checkEmail = (type, val) => {
  if (checkEmailValue.test(val) === true || val === "") {
    console.log("tvb");
    return true;
  }
  console.log("erreur caractères");
  // afficher msg erreur sous le champ
  return false;
};
const order = (clientCart, e) => {
  e.preventDefault();
  const contact = retrieveForm();
  const orderId = checkCart(clientCart);
  console.log(contact);
  console.log(orderId);
  if (contact === "undefined") {
    console.log("non");
  } else {
    console.log(contact.value);
  }
  // console.log(contact);
};
/*
const retrieveForm = () => {
  let contact = {}
  
  let firstName = document.getElementById("firstName");
  firstName.addEventListener("blur", (e) => {
    if (
      e.target.value.length >= 3 &&
      e.target.value.test(/^[a-z A-Z]{3,25}$/)
    ) {
      console.log(e.target.value);
      contact.firstName = e.target.value
    } else {
      document.getElementById("firstNameErrorMsg").textContent =
        "Veuillez entrer un prénom compris entre 3 et 25 caractères";
        return false
    }
  });
  let lastName = document.getElementById("lastName");
  lastName.addEventListener("blur", (e) => {
    if (
      e.target.value.length >= 2 &&
      e.target.value.match(/^[a-z A-Z]{2,45}$/)
    ) {
      console.log(e.target.value);
      contact.lastName = e.target.value
    } else {
      document.getElementById("lastNameErrorMsg").textContent =
        "Veuillez entrer un nom compris entre 2 et 45 caractères";
        return false
    }
  });
  let address = document.getElementById("address");
  address.addEventListener("blur", (e) => {
    if (e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{3,70}$/)) {
      console.log(e.target.value);
      contact.address = e.target.value
    } else {
      document.getElementById("addressErrorMsg").textContent =
        "Veuillez entrer une adresse valide";
        return false
    }
  });
  let city = document.getElementById("city");
  city.addEventListener("blur", (e) => {
    if (e.target.value.match(/^[a-z A-Z]{2,30}$/)) {
      console.log(e.target.value);
      contact.city = e.target.value
    } else {
      document.getElementById("cityErrorMsg").textContent =
        "Veuillez entrer une ville valide";
        return false
    }
  });
  let email = document.getElementById("email");
  email.addEventListener("blur", (e) => {
    if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      console.log(e.target.value);
      contact.email = e.target.value
    } else {
      document.getElementById("emailErrorMsg").textContent =
        "Veuillez entrer un email valide";
        return false
    }
  });
  
  // let contact = {
  //   prénom: firstName.value,
  //   nom: lastName.value,
  //   adresse: address.value,
  //   ville: city.value,
  //   mail: email.value,
  // };
  console.log(contact);
  return contact
 
};

const order = (clientCart , e) => {
//   document.getElementById("order").addEventListener("click", () => {
//     if (totalQty > 0) {
//       console.log(totalQty);
//       console.log(clientCart);
//     } else {
//     }
//   });
e.preventDefault()
const contact = retrieveForm()
if(!contact){
  return false
}

};
*/
