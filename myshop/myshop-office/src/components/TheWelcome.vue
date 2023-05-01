<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
const check = JSON.parse(localStorage.getItem('user'))
function navigateToEditPage() {
  const id = document.getElementById('id').value
  const editUrl = '/products/edit/' + id
  window.location.href = editUrl
}
</script>

<template>
  <div class="container mt-5">
    <WelcomeItem class="mt-5">
      <template #heading>
        <h3 class="mb-4">Testing VUE template block</h3>
      </template>
      <hr />
      <div class="w-25">
        this is a div inside the <code>WelcomeItem</code> with a <code>class="w-25"</code> so it
        breaks at 25% of the window
      </div>
      <hr class="w-25" />
      <br />
      this is a text without a <code>div</code> so without any class, i guess it will be the size of
      the container <b>and here we try :</b>
      <code>Lorem ipsum dolor sit amet consectetur,
          <strong>adipisicing elit. Vitae autem provident ipsa voluptate. </strong> Quasi, et
          voluptatibus maxime optio eaque, nostrum eligendi,
          <i>ullam blanditiis totam impedit assumenda praesentium velit ipsam explicabo?</i></code>
    </WelcomeItem>
    <WelcomeItem class="mt-5">
      <template #heading>
        <h3 class="mb-4">Functionalities</h3>
      </template>
      <hr />
      <div class="my-2">
        in this app you can connect to a remote database through nodeJS and then take advantage of
        VUEs functionalities to interact with the data on a Back Office. You can access the product
        list on the backOffice at this link ->
        <a href="/products/list"> Product list on Back Office (localhost:5173)</a>
      </div>
      <div class="my-2">
        You can access the front office at -> <a href=""> Front Office (localhost:8000)</a>
      </div>
      <div class="my-2">
        You can insert a new entry on the database with a form at ->
        <a href="/products/edit/0"> Back Office (localhost:5173/products/edit/0)</a>
      </div>
      <div class="my-2">
        You can edit a product by choosing his ID ->
        <input type="number" name="id" id="id" placeholder="choose id" /><a href="#" @click="navigateToEditPage()">
          Back Office (localhost:5173/products/edit/)</a><code> + id</code>
        <div>
          <i>
            the execution of this link is done with an input field and a JS script into

            <code>script setup</code> at the beginning of the page, and using a <br />JS ...</i>
          <code>
              <pre>
              
  function navigateToEditPage() {
    const id = document.getElementById("id").value;
    const editUrl = "/products/edit/" + id;
    window.location.href = editUrl;
  }
            </pre>
            </code>
          <i>... JS</i>
        </div>
      </div>
    </WelcomeItem>

    <WelcomeItem class="mt-5">
      <h3>Log in</h3>
      <hr>
      <p>log in functionality through a database with password hashing and a token set in localStorage</p>
      <h4> <a href="/office/login">Log in page</a> <code>localhost:5173/office/login</code></h4>
      <p>log in function searches for match in the users database through REST in NodeJS, it returns a token UUID() that
        is then stored in LocalStorage</p>
      <h4>Token bearer // Token integrity</h4>
      <p>your token is: {{ check.token }}</p>
      Bearer token is sent in client side request headers for every fetch request to server <code>localhost:8000</code>
      <p>through:</p>
      <code>
  <pre>
  await fetch("http://localhost:5173/office/login", {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      <u>'Authorization': `Bearer ${check.token}`,</u>
        'Content-Type': 'application/json'
    }

}).then(
  console.log(check.token)
) 
if (!check.token) {
  console.log('token missing');
  window.location.href = "http://localhost:5173/office/login"

} else { ... }
</pre>
  </code>
    <p> it is then matched with the database token to prevent ... security issues </p>

    </WelcomeItem>
    <WelcomeItem class="mt-5">
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>Tooling</template>

      This project is served and bundled with
      <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
      recommended IDE setup is
      <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
      you need to test your components and web pages, check out
      <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
      <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

      <br />

      More instructions are available in <code>README.md</code>.
    </WelcomeItem>

    <WelcomeItem class="mt-5">
      <template #icon>
        <EcosystemIcon />
      </template>
      <template #heading>Ecosystem</template>

      Get official tools and libraries for your project:
      <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
      <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
      <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
      <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>.
      If you need more resources, we suggest paying
      <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
      a visit.
    </WelcomeItem>

    <WelcomeItem class="mt-5">
      <template #icon>
        <CommunityIcon />
      </template>
      <template #heading>Community</template>

      Got stuck? Ask your question on
      <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
      Discord server, or
      <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>. You
      should also subscribe to
      <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and
      follow the official
      <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
      twitter account for latest news in the Vue world.
    </WelcomeItem>

    <WelcomeItem class="mt-5">
      <template #icon>
        <SupportIcon />
      </template>
      <template #heading>Support Vue</template>

      As an independent project, Vue relies on community backing for its sustainability. You can
      help us by
      <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
    </WelcomeItem>
  </div>
</template>
