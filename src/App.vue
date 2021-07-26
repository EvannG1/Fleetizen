<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer class="pt-3"/>
  </div>
</template>

<script>
import './assets/scss/style.scss'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>