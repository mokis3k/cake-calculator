const calculatorForm = document.querySelector("#calculatorForm");
const productType = document.querySelector("#productType");
const calculateButton = document.querySelector("#calculateButton");
let calculatorProducts = document.querySelector("#calculatorProducts");
const calculatorProductsWrapper = document.querySelector(
  "#calculatorProductsWrapper"
);
const productsSelect = document.querySelector("#productsSelect");
const total = document.querySelector("#total");
let calculateProductList = [];
let productsList = JSON.parse(localStorage.getItem("products"));
console.log(productsList);

calculatorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let product = new FormData(e.target);
  product = Object.fromEntries(product.entries());
  console.log(product); //{name: 'Молоко', quantity: '10'}

  if (calculatorProducts) {
    renderProduct(product);
  } else {
    calculatorProducts = document.createElement("div");
    calculatorProducts.setAttribute("id", "calculatorProducts");
    calculatorProducts.setAttribute("class", "calculator__products");
    calculatorProductsWrapper.append(calculatorProducts);
    renderProduct(product);
  }

  e.target.reset();
});

productsSelect.addEventListener("change", (e) => {
  addType(e);
});

const renderProduct = (product) => {
  const hr = document.createElement("hr");
  const productDiv = document.createElement("div");
  productDiv.classList.add("calculator__product");
  const productName = document.createElement("span");
  productName.innerHTML = product.name;
  const productAmount = document.createElement("span");
  productAmount.innerHTML = `${product.amount} ${productType.innerHTML}`;
  productDiv.append(productName, productAmount);
  calculatorProducts.append(productDiv);
};

const addType = (e) => {
  const productName = e.target.value;
  productsList.map((obj) => {
    if (obj.name === productName) {
      switch (obj.type) {
        case "штука":
          productType.innerHTML = "шт.";
          break;
        case "літр":
          productType.innerHTML = "л.";
          break;
        case "грам":
          productType.innerHTML = "гр.";
          break;
      }
    }
  });
};

const getProductsNames = () => {
  productsList.map((obj) => {
    const option = document.createElement("option");
    option.innerHTML = obj.name;
    productsSelect.append(option);
  });
};

if (!productsList) productsList = [];
getProductsNames();
