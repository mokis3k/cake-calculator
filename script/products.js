const addProductForm = document.querySelector("#addProductForm");
const productsTable = document.querySelector("#productsTable");
const THEADList = ["Інгрідієнт", "Одиниці виміру", "Ціна", "Видалення"];
let productsList = JSON.parse(localStorage.getItem("products"));

const renderTable = () => {
  const thead = renderThead();
  const tbody = renderTbody();
  tbody.setAttribute("id", "productsTableTbody");
  productsTable.append(thead, tbody);
};

const renderThead = () => {
  const thead = document.createElement("thead");
  THEADList.map((elem) => {
    th = document.createElement("th");
    th.innerHTML = elem;
    thead.append(th);
  });
  return thead;
};

const renderTbody = () => {
  const tbody = document.createElement("tbody");
  productsList.map((product) => {
    let tr = createTr(product);
    tbody.append(tr);
  });
  return tbody;
};

const addProduct = (product) => {
  let tbody = document.querySelector("#productsTableTbody");
  let tr = createTr(product);
  tbody.append(tr);

  productsList.push(product);
  localStorage.setItem("products", JSON.stringify(productsList));
};

const createTr = (obj) => {
  let tr = document.createElement("tr");
  Object.keys(obj).map((key) => {
    let td = document.createElement("td");
    if (key === "name") td.setAttribute("id", obj[key]);
    td.innerHTML = obj[key];
    tr.append(td);
  });
  const tdDelete = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Видалити";
  deleteButton.addEventListener("click", (e) => deleteButtonHandler(e, obj));
  tdDelete.append(deleteButton);
  tr.append(tdDelete);

  return tr;
};

const deleteButtonHandler = (e, obj) => {
  parentTr = e.target.closest(`tr`);
  parentTr.remove();
  console.log(obj)
  console.log(productsList)
  productsList = productsList.filter((product) => product !== obj);
  console.log(productsList)
  localStorage.setItem("products", JSON.stringify(productsList));
};

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newProduct = new FormData(e.target);
  newProduct = Object.fromEntries(newProduct.entries());

  addProduct(newProduct);
  e.target.reset();
});

if (!productsList) productsList = [];
renderTable();
