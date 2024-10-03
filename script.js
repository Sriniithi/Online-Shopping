console.log("Category :", Category);
console.log("Inventory:", Inventory);
console.log("Customer:", Customer);



const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// Show the modal when Welcome is clicked
document.getElementById("welcomeBtn").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "block";
});

// Close modal functionality
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
});

// Admin and Customer button actions
document.getElementById("adminBtn").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("adminPage").style.display = "block";
});

document.getElementById("customerBtn").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("customerPage").style.display = "block";
});

// Admin login form submit
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Admin logged in!");
});

// Customer login form submit
document.getElementById("customerLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Customer logged in!");
});

// Sign Up and Reset Password functionality
document.getElementById("customerSignup").addEventListener("click", function () {
  alert("Sign Up page!");
});

document.getElementById("customerReset").addEventListener("click", function () {
  alert("Reset Password page!");
});

document.getElementById("adminReset").addEventListener("click", function () {
  alert("Admin reset password!");
});


// Toggle dropdown visibility on button click
document.querySelector('.dropdown-btn').addEventListener('click', function() {
  const dropdown = document.querySelector('.dropdown-content');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

let customers = [];
let products = [];

// CRUD Operations for Customers
function createCustomer(name, creditLimit) {
    const newCustomer = { id: Date.now(), name, creditLimit };
    customers.push(newCustomer);
    renderCustomers();
}

function renderCustomers() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';
    customers.forEach(customer => {
        const li = document.createElement('li');
        li.innerHTML = `${customer.name} - $${customer.creditLimit} <button onclick="deleteCustomer(${customer.id})">Delete</button>`;
        customerList.appendChild(li);
    });
}

function deleteCustomer(id) {
    customers = customers.filter(customer => customer.id !== id);
    renderCustomers();
}

// CRUD Operations for Products
function createProduct(name, category, price) {
    const newProduct = { id: Date.now(), name, category, price };
    products.push(newProduct);
    renderProducts();
}

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} (${product.category}) - $${product.price} <button onclick="deleteProduct(${product.id})">Delete</button>`;
        productList.appendChild(li);
    });
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
}

// Event Listeners
document.getElementById('customerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const creditLimit = document.getElementById('customerCreditLimit').value;
    createCustomer(name, creditLimit);
    this.reset();
});

document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;
    createProduct(name, category, price);
    this.reset();
});

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const FIREBASE_CATEGORY_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Category';

$(document).ready(function () {
    // Fetch categories from Firebase
    function fetchCategories() {
      db.collection("Category").get().then((querySnapshot) => {
        categoryList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const li = document.createElement("li");
            li.textContent = doc.data().Name;
            categoryList.appendChild(li);
        });
    });
}

// Add new category to Firebase
function addCategory() {
  const categoryName = document.getElementById("categoryName").value;
  if (categoryName) {
      db.collection("Category").add({
          Name: categoryName
      }).then(() => {
          fetchCategories();
          document.getElementById("categoryName").value = ""; // Clear input
      });
  } else {
      alert("Please enter a category name.");
  }
}

// Fetch categories on page load
document.addEventListener("DOMContentLoaded", fetchCategories);



    // Generate unique ID
    function generateId() {
        return 'cat-' + Math.random().toString(36).substr(2, 9);
    }

    // Save new category
    $('#categoryForm').submit(function (event) {
        event.preventDefault();
        const category = {
            fields: {
                id: { stringValue: generateId() },
                name: { stringValue: $('#name').val() }
            }
        };

        $.ajax({
            url: FIREBASE_CATEGORY_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(category),
            success: function () {
                alert('Category added!');
                fetchCategories();
                $('#categoryForm')[0].reset();
            },
            error: function () {
                alert('Failed to add category.');
            }
        });
    });

    // Delete category
    window.deleteCategory = function (docName) {
        $.ajax({
            url: `${docName}`,
            method: 'DELETE',
            success: function () {
                alert('Category deleted!');
                fetchCategories();
            },
            error: function () {
                alert('Failed to delete category.');
            }
        });
    };

    // Initialize
    fetchCategories();
});

const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory';
$(document).ready(function () {

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

    // Fetch inventory from Firebase
const inventoryTable = document.querySelector("#inventory-table tbody");

function fetchInventory() {
    db.collection("Inventory").get().then((querySnapshot) => {
        inventoryTable.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const inventoryItem = doc.data();
            const row = `<tr>
                <td>${doc.id}</td>
                <td>${inventoryItem.Title}</td>
                <td>${inventoryItem.Description}</td>
                <td>${inventoryItem.Category}</td>
                <td>${inventoryItem.Quantity}</td>
                <td>${inventoryItem.Price}</td>
                <td>
                    <button onclick="editItem('${doc.id}')">Edit</button>
                    <button onclick="deleteItem('${doc.id}')">Delete</button>
                </td>
            </tr>`;
            inventoryTable.innerHTML += row;
        });
    });
}


// Add new inventory item to Firebase
function addInventory() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  db.collection("Inventory").add({
      Title: title,
      Description: description,
      Category: category,
      Quantity: parseInt(quantity),
      Price: parseFloat(price)
  }).then(() => {
      fetchInventory();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("price").value = "";
  });
}


// Edit item
function editItem(id) {
  const title = prompt("Enter new title:");
  const description = prompt("Enter new description:");
  const category = prompt("Enter new category:");
  const quantity = prompt("Enter new quantity:");
  const price = prompt("Enter new price:");

  db.collection("Inventory").doc(id).update({
      Title: title,
      Description: description,
      Category: category,
      Quantity: parseInt(quantity),
      Price: parseFloat(price)
  }).then(() => {
      fetchInventory();
  });
}

    // Save new inventory
    $('#inventoryForm').submit(function (event) {
      event.preventDefault();
      const inventory = {
          fields: {
              category: { stringValue: $('#category').val() },
              title: { stringValue: $('#title').val() },
              description: { stringValue: $('#description').val() },
              quantity: { integerValue: parseInt($('#quantity').val()) },
              price: { doubleValue: parseFloat($('#price').val()) }
          }
      };

      $.ajax({
          url: FIREBASE_URL,
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(inventory),
          success: function () {
              alert('Inventory saved!');
              fetchInventory();
              $('#inventoryForm')[0].reset();
          },
          error: function () {
              alert('Failed to save inventory.');
          }
      });
  });

  // Delete item
function deleteItem(id) {
  if (confirm("Are you sure you want to delete this item?")) {
      db.collection("Inventory").doc(id).delete().then(() => {
          fetchInventory();
      });
  }
}

// Fetch inventory on page load
document.addEventListener("DOMContentLoaded", fetchInventory);
  // Initialize
  fetchInventory();
});

          // Automatically update the data if needed
          db.collection("Inventory").doc(doc.id).set({
              Category: data.Category,
              id: data.id,
              Title: data.Title,
              Description: data.Description,
              Quantity: data.Quantity,
              Price: data.price
          }).then(() => {
              console.log("Inventory updated successfully!");
          }).catch((error) => {
              console.error("Error updating document: ", error);
          });

// Call the fetchInventory function to load and save data
fetchInventory();
db.collection("Inventory").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
      if (change.type === "added" || change.type === "modified") {
          const data = change.doc.data();
          console.log("Updated Category: " + data.Category);
          // Handle data as needed
      }
  });
});




// Fetch customers from Firebase
const customerTable = document.querySelector("#customer-table tbody");

function fetchCustomers() {
  db.collection("Customer").get().then((querySnapshot) => {
      customerTable.innerHTML = "";
      querySnapshot.forEach((doc) => {
          const customer = doc.data();
          const row = `<tr>
              <td>${doc.id}</td>
              <td>${customer.Name}</td>
              <td>${customer.Email}</td>
              <td>${customer.Mob}</td>
              <td>${customer.CreditLimit}</td>
              <td>
                  <button onclick="editCustomer('${doc.id}')">Edit</button>
                  <button onclick="deleteCustomer('${doc.id}')">Delete</button>
              </td>
          </tr>`;
          customerTable.innerHTML += row;
      });
  });
}

// Add new customer
function addCustomer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const creditLimit = parseFloat(document.getElementById("creditLimit").value);

  db.collection("Customer").add({
      Name: name,
      Email: email,
      Mob: mobile,
      CreditLimit: creditLimit
  }).then(() => {
      fetchCustomers();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("creditLimit").value = "0";
  });
}

// Edit customer
function editCustomer(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  const mobile = prompt("Enter new mobile:");
  const creditLimit = prompt("Enter new credit limit:");

  db.collection("Customer").doc(id).update({
      Name: name,
      Email: email,
      Mob: mobile,
      CreditLimit: parseFloat(creditLimit)
  }).then(() => {
      fetchCustomers();
  });
}

// Delete customer
function deleteCustomer(id) {
  if (confirm("Are you sure you want to delete this customer?")) {
      db.collection("Customer").doc(id).delete().then(() => {
          fetchCustomers();
      });
  }
}

document.getElementById('categoryForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const categoryName = document.getElementById('categoryName').value;

  try {
    const response = await fetch('/addCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName })
    });
    const message = await response.text();
    document.getElementById('message').innerText = message;
  } catch (error) {
    document.getElementById('message').innerText = 'Error: ' + error.message;
  }
});

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  // Perform authentication logic (e.g., Firebase authentication)
});



