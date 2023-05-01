<script setup>


const userLogIn = async function () {
  console.log('welcome to the LOGIN FORM')
  let email = document.getElementById('name').value
  let pwd = document.getElementById('pass').value
  console.log(email)
  console.log(pwd)
  let response = await fetch('http://localhost:8000/office/login', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: email, password: pwd })
  })
  let user = await response.json();
console.log(response);
 console.log(user);
    console.log(user.token);
    localStorage.setItem('user', JSON.stringify(user));
}

const logOut = function () {
  let user = {};
  localStorage.setItem('user', JSON.stringify(user));
}

</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="form" method="POST" action="login">
        <h2 class="my-3">Login</h2>
        <h5 class="my-3">please insert your username and your password</h5>
        <p class="my-3">this form is secured by https encryption and SHA1 hashing</p>
        <div class="my-3">
          <input type="text" name="name" id="name" placeholder="insert username" />
        </div>
        <div class="my-3">
          <input type="password" name="pass" id="pass" placeholder="insert password" />
        </div>
        <button class="btn btn-info" @click="userLogIn()">log in</button>
        <button class="btn btn-danger" @click="logOut()">log OUT</button>
      </div>
        </div>
        <div class="col-6">
<h2>Login status: </h2>
<div class="status" id="stats"></div>
        </div>
      </div>
     
    </div>
  </main>
</template>
