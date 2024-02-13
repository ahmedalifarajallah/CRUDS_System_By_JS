// Get All DOM Elements
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const search = document.getElementById("search");
const searchTitle = document.getElementById("searchTitle");
const searchCategory = document.getElementById("searchCategory");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let mood = "create";
let tmp;

// Function to calculate total price
function getTotalPrice() {
  let result = 0;
  if (price.value != "" && +price.value > 0) {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.value = result;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.value = "";
    total.style.background = "#a00d02";
  }
}

// create or update data
let data;

if (localStorage.product) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = createData;

function createData() {
  let newData = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    data.push(newData);
    total.innerHTML = "";
  } else {
    data[tmp] = newData;
    mood = "create";
    total.innerHTML = "";
    submit.innerHTML = "Create";
  }

  localStorage.setItem("product", JSON.stringify(data));
  clearInput();
  showData(data);
}

// clear input fields
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.value = "";
  total.style.background = "#a00d02";
  count.value = "";
  category.value = "";
}

// Show Data in the table
function showData(data) {
  let tbody = document.querySelector("#table tbody");
  let products = "";

  data.forEach((product, index) => {
    products += `
      <tr>
        <td>${index}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.count}</td>
        <td>${product.category}</td>
        <td><button onclick="updateData(${index})" class="updateBtn">Update</button></td>
        <td><button onclick="deleteData(${index})" class="deleteBtn">Delete</button></td>
      </tr> 
    `;
  });

  tbody.innerHTML = products;

  if (data.length > 1) {
    document.getElementById("deleteAllBtn").style.display = "block";
  }
}
showData(data);

// Update Data
function updateData(i) {
  let product = data[i];

  // Show The Product Data In The Inputs
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  total.value = product.total;
  getTotalPrice();
  count.value = product.count;
  category.value = product.category;
  submit.innerHTML = "Update";

  mood = "update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Delete Product
function deleteData(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  window.location.reload();
}

// Delete All Data
function deleteAllData() {
  data.splice(0);
  localStorage.removeItem("product");
  window.location.reload();
}

// Search By Title
function searchByTitle() {
  let searchInputVal = search.value.toLowerCase();

  let filteredData = data.filter((product) => {
    return product.title.toLowerCase().includes(searchInputVal);
  });

  showData(filteredData);
}

// Search By Category
function searchByCategory() {
  let searchInputVal = search.value.toLowerCase();

  let filteredData = data.filter((product) => {
    return product.category.toLowerCase().includes(searchInputVal);
  });

  showData(filteredData);
}
