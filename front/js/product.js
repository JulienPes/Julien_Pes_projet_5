// dom chargé => apl 1ere fonction (initialisation)
window.onload = () => {
  console.log("Dom is loaded");
};

const initPage = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  console.log(idProduct);
  retrieveProduct(idProduct);
};

const retrieveProduct = async () => {
  try {
    const urlProd = `http://localhost:3000/api/products/${idProduct}`;
    const response = await fetch(urlProd);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    return { error: true, msg: error };
  }
};




/*

//1ere fonction : récuperer l'url et extraire l'id ( URLsearchparam) resultat variable idProduct = id
// faire un console log idProduct et verifier que l'id corresponde à l'id dans l'url
// apl 2eme fonction retrieveProduct(idProduct)

//2eme fonction
// Contacter le back avec url de l'id de ce produit (fetch)
// product est le resultat du retour du back
// apl displayProd(product)

//3eme
// afficher le produit
// appeler fonction qui attache un ecouteur

//// 4eme
//attacher un evenement click qui apl une fonction (add)



const displayProd = (product) => {
  attach(product._id);
};

const attach = (id) => {};

const add = (id) => {
  // faire un log id
};
*/