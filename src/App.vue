<template>
  <div class="font-sans antialiased" id="app">
    <Menu/>
  
    <main id="main">
     
      <router-view/>
      <notifications group="foo" position='bottom right' />
    </main>


    <Footer/>
    
    
    
  </div>
</template>


<script>
import Menu from './components/menu/Menu.vue'
import Footer from './components/menu/Footer.vue'

export default {
  components: {
    Menu,
    Footer
  }
}
</script>





<style  scoped>
  #app {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
  }

  #main {
    flex: 1;
  } 
</style>

