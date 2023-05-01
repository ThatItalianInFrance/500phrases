<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'


console.log('products edit page script setup run')
const route = useRoute()
let id = route.params.id
console.log(id)

// id == 0 ? () => id = 1 : "";
const checkLogIn = async function () {
  const check = JSON.parse(localStorage.getItem('user'))
  console.log(check.token)

 await fetch("http://localhost:5173/office/login", {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
    }
}).then(
  console.log(check.token)
) 
if (!check.token) {
  console.log('token missing');
  window.location.href = "http://localhost:5173/office/login"

} else {
  let logged = document.getElementById("logged");
  let welcome = document.getElementById("welcomeText");
  logged.innerHTML = `your security token is: ` +check.token
  welcome.innerHTML = `Welcome: ${check.name}! <br> it's ${new Date()}`

}
  console.log('line 25 reading local storage token')
  console.log('line 26 token match: ')
  console.log()
}
checkLogIn()

let txt = ref()
let desc = ref()
let price = ref()
let products = ref({})

let loadProduct = function (id) {

  if (id == 0) {
    console.log('id 0')
    products.value = [
      { id: 'new id', name: 'new name', description: 'new description', price: 'new price' }
    ]
    return
  }
  fetch(`http://localhost:8000/office/products/${id}`) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (contacts) {
      console.log(contacts)
      products.value = contacts
    })
}
loadProduct(id)
console.log(products.value)

let SaveProduct = function (product) {
  if (id == 0) {
    product = fetch('http://localhost:8000/office/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: txt.value,
        description: desc.value,
        price: price.value
      })
    })
    return
  }
  console.log('saveproduct fired')
  console.log(product)
  console.log(txt.value)
  console.log(desc.value)
}
</script>

<template>
  <main class="container my-5" message="stocazzo">
    <h1 class="my-5">Edit Product Page</h1>

    <div v-for="product in products" :key="product.id">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <h4>New values</h4>

            <div>
              <input
                type="text"
                v-model="txt"
                Placeholder="text"
                class="hidden"
                style="visibility: hidden"
              />
            </div>
            <div><input type="text" v-model="txt" Placeholder="text" class="" /></div>
            <div><input type="text" v-model="desc" Placeholder="description" class="" /></div>
            <div><input type="text" v-model="price" Placeholder="price" class="" /></div>
            <button class="btn btn-success" @click="SaveProduct()">edit</button>
            <button class="btn btn-danger" onclick="">cancel</button>
          </div>
          <div class="col-6">
            <h4>Old values</h4>
            <div class="my-2 bg-primary-subtle">{{ product.id }}</div>
            <div class="my-2 bg-primary-subtle">{{ product.name }}</div>
            <div class="my-2 bg-primary-subtle">{{ product.description }}</div>
            <div class="my-2 bg-primary-subtle">{{ product.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

</script>
