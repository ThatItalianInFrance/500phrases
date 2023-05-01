<script setup>
import TheWelcome from '../components/TheWelcome.vue'
const check = JSON.parse(localStorage.getItem('user'));
console.log(check);
fetch('http://localhost:5173/office/login', {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
    }
}).then(
  res => {
    return res.json
  }
  ).then(
    console.log()
  )
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
