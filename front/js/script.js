/**
 * Appeler la première fonction dès le chargement du "dom"
 */
// Attendre que le dom soit chargé
window.onload = () => {
  console.log("Dom is loaded");
  //appel de la fonction de récupération de données
  getProducts();
};
/**
 * Récupérer les données des produits
 * @returns Object
 */
const getProducts = async () => {
  try {
    // url de l'API
    const urlApi = "http://localhost:3000/api/products";
    // Essayé de récupérer les produits
    const response = await fetch(urlApi);
    // Si la réponse est a false
    if (!response.ok) {
      // Lancement d'une nouvelle error en cas de problème
      throw new Error(`"erreur http :" ${response.status}`);
    } else {
      // Sinon récupérer la réponse au format json
      const products = await response.json();
      // Faire boucle sur le tableau de produits
      for (let product of products) {
        // appel create avec le tableau en paramètre afin d'afficher les produits
        create(product);
      }
    }
    // Attraper l'erreur
  } catch (error) {
    return {
      error: true,
      msg: error,
    };
  }
};
/**
 * Afficher les produits
 * @param {Object} prod
 */
const create = (prod) => {
  // Création liens
  let link = document.createElement("a");
  link.setAttribute("href", `./product.html?id=${prod._id}`);
  // Création articles
  let article = document.createElement("article");
  // Création d'images
  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);
  // Création titres
  let h3 = document.createElement("h3");
  h3.setAttribute("class", "productName");
  h3.textContent = prod.name;
  // Création textes
  let para = document.createElement("p");
  para.setAttribute("class", "productDescription");
  para.textContent = prod.description;
  // Ajouter les liens à élément id
  document.getElementById("items").append(link);
  // Affichage des articles
  link.append(article);
  // Affichage images, titres et textes
  article.append(img, h3, para);
};
