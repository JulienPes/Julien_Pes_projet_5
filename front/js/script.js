window.onload = function () {
    console.log("Dom is loaded");
    initPage();
}
const retrieveContent = async () => {
    try {
        const urlApi = "http://localhost:3000/api/products";
        const response = await fetch(urlApi);
        console.log(response);
        if (response.ok) {
            return response.json();
        }
    } catch (e) {
        return { error: true, msg: e };
    }
}

const initPage = async () => {
    try {
        const content = await retrieveContent();
        if ("undefined" === typeof content.error) { /* ?????*/
            console.log(content);
            content.map((prod) => {
                console.log(prod);
                create(prod);
            });
        } else {
            console.log("Error", content.msg);
        }
    } catch (e) {
        console.log("Error", e);
    }
};


function create(prod) {
    let link = document.createElement("a");
    link.setAttribute("href", "./product.html?id=" + prod._id);

    let article = document.createElement("article");

    let img = document.createElement("img");/* ?????*/
    img.setAttribute("src", prod.imageUrl);
    img.setAttribute("alt", prod.altTxt);
    img.setAttribute("class", "img-fluid");

    let document = createElement("h3");
    h3.setAttribute("class", "productName");
    h3.textContent = prod.name;

    let para = document.createElement("p");
    para.setAttribute("class", "productDescription");
    para.textContent = prod.description;

    article.append(img, h3, para);
    link.append(article);

    document.getElementById("items").append(link);
}



