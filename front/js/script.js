let kanapData = [];

const fetchKanap = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((promise) => {
            kanapData = promise;
            console.log(kanapData);
        });
};
const kanapDisplay = async () => {
    await fetchKanap();

}
kanapDisplay()

