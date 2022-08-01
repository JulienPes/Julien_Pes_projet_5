window.onload = () => {
  console.log("Dom is loaded");
  initPage();
};

const initPage = async () => {
  try {
    const content = await retrieveData();
    console.log(typeof content.error);
    if (typeof content.error === "undefined") {
      console.log(content);
      for (let product of content) {
        create(product);
      }
    } else {
      console.log("Error", content.msg);
    }
  } catch (e) {
    console.log("Error", e);
  }
};

const retrieveData = async () => {
  try {
    const urlApi = "http://localhost:3000/api/products";
    const response = await fetch(urlApi);
    console.log(response.ok);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    return { error: true, msg: error };
  }
};

function create(prod) {
  let link = document.createElement("a");
  link.setAttribute("href", `./product.html?id=${prod._id}`);

  let article = document.createElement("article");

  let img = document.createElement("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);
  img.setAttribute("class", "img-fluid");

  let h3 = document.createElement("h3");
  h3.setAttribute("class", "productName");
  h3.textContent = prod.name;

  let para = document.createElement("p");
  para.setAttribute("class", "productDescription");
  para.textContent = prod.description;

  article.append(img, h3, para);
  link.append(article);

  document.getElementById("items").append(link);
}
