window.onload = () => {
  console.log("Dom is loaded");
}

const getId = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  console.log(idProduct);
  getData(idProduct);
};

const retrieveProduct = async (idProduct) => {
  try {
    const product = `http://localhost:3000/api/products/${idProduct}`;
    const response = await fetch(product);
    console.log(product);
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.log("error", e);
  }
};

const getData = async (idProduct) => {
  try {
    const content = await retrieveProduct(idProduct);
    console.log(typeof product.error);
    if (product.error === "undefined") {
      displayProd(content);
    } else {
      console.log("error", error.msg);
    }
  } catch (e) {
    console.log("error", e);
  }
};

/*



window.onload = () => {
  console.log("Dom is loaded");
  //APPEL DE LA FONCTION
  getId();
};






---------------------------------------------------------------------------------------------------------

//1ere fonction : récuperer l'url et extraire l'id ( URLsearchparam) resultat variable idProduct = id
// faire un console log idProduct et verifier que l'id corresponde à l'id dans l'url
// apl 2eme fonction retrieveProduct(idProduct)

const getId = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  console.log(idProduct);
  //APPEL DE LA FONCTION
  getData(idProduct);
};

---------------------------------------------------------------------------------------------------------


//2eme fonction
// Contacter le back avec url de l'id de ce produit (fetch)
// product est le resultat du retour du back
// apl displayProd(product)



const retrieveProduct = async (idProduct) => {
  try {
    const urlProd = `http://localhost:3000/api/products/${idProduct}`;
    const response = await fetch(urlProd);
    if (response.ok) {
      //RETOUR DE LA VALEUR VERS LA FONCTION QUI M'A APPELLE
      return response.json();
      // LE RETURN VEUT DIRE QUE JE RENVOIE LA REPONSE A LA FONCTION QUI M'A APPELÉ EN L'OCCURRENCE C'EST getData
    }
  } catch (error) {
    return { error: true, msg: error };
  }
};



---------------------------------------------------------------------------------------------------------


//3eme
// afficher le produit
// appeler fonction qui attache un ecouteur




const getData = async (idProduct) => {
  try {
    const content = await retrieveProduct(idProduct);
    console.log(typeof content.error); // undefined
    if (typeof content.error === "undefined") {
      //APPEL DE LA FONCTION
      displayProd(content);
    } else {
      console.log("Error", content.msg);
    }
  } catch (e) {
    console.log("Error", e);
  }
};

---------------------------------------------------------------------------------------------------------



const displayProd = (product) => {
  //Affichage du produit
};
*/
