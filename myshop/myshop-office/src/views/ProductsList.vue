<script setup>

// REMEBER TO IMPORT REF
import {ref} from 'vue'
import {  RouterLink } from 'vue-router'

const check = JSON.parse(localStorage.getItem('user'))
  console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let products = ref([]);


let loadProducts = function () {
  const check = JSON.parse(localStorage.getItem('user'))
  console.log(check.token)
  fetch("http://localhost:8000/office/products", {
    method: 'GET',
    // withCredentials: true,
    // credentials: 'include',
    headers: {
        'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
    }
}) // par défaut, fetch() fait une requête GET
    .then(function (response) {
        return response.json();
    })
    .then(function(contacts) {
     
      products.value = contacts   
      console.log(products.value);
      console.log(contacts);
       
    })
};

loadProducts()
console.log(products.value);



</script>

<template>
  <main>
    <div v-for="product in products" :key="product.id" class="container my-5">
      
      <ul class="row">
        <div class="col-2">
          
            {{ product.id }}
          
        </div>
        <div class="col-2">

      <div >
        <!-- IMPORTANT FOR LINKssss 
        
        https://stackoverflow.com/questions/39344574/how-pass-variable-to-vue-router-v-link
      
      -->
        <router-link :to="{path:'/products/edit/'+product.id}">produits</router-link>
         {{ product.name }}

       
      </div>
    </div>
    <div class="col-2">
      
        {{ product.description }}
      
    </div>
    <div class="col-2">
      
        {{ product.price }}
       
      
    </div>
    </ul>
</div>
  
   
  </main>
</template>
<script>

</script>
