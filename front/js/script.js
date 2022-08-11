/**
 * Appeler la première fonction dès le chargement du "dom"
 */
window.onload = () => {
  console.log("Dom is loaded");
  getProducts();
};
/**
 * Récupérer les données des produits 
 * @returns Object
 */
const getProducts = async () => {
  try {
    const urlApi = "http://localhost:3000/api/products";
    const response = await fetch(urlApi);
    if (!response.ok) {
      throw new Error(`"erreur http :" ${response.status}`);
    } else {
      const products = await response.json();
      for (let product of products) {
        create(product);
      }
    }
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
  let link = document.createElement("a");
  link.setAttribute("href", `./product.html?id=${prod._id}`);

  let article = document.createElement("article");

  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);

  let h3 = document.createElement("h3");
  h3.setAttribute("class", "productName");
  h3.textContent = prod.name;

  let para = document.createElement("p");
  para.setAttribute("class", "productDescription");
  para.textContent = prod.description;

  article.append(img, h3, para);
  link.append(article);

  document.getElementById("items").append(link);
};
