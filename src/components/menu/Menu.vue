<template>
  <nav class="fixed flex items-center justify-between flex-wrap bg-blue-600 bg-opacity-50 p-6 menuAj">
    <div class="flex items-center flex-shrink-0  mr-6">
        <!-- <span class="font-semibold text-xl tracking-tight">Hub_links</span> -->
        <router-link class="font-semibold text-xl tracking-tight"  to="/">Hub_links</router-link>
    </div>
    <div class="block md:hidden" >
        <button @click='clickMenu' class="flex items-center px-3 py-2 border rounded" >
        <svg class="whiteMenu fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
    </div>
    <div class="w-full flex-grow md:flex md:items-center md:w-auto" v-if="menuVisible">
        <div class="text-sm md:flex-grow">
        <!-- <a href="#responsive-header" class="block mt-4 md:inline-block md:mt-0 hover:text-white mr-4">
            Links
        </a> -->

        <router-link class="block mt-4 md:inline-block md:mt-0  hover:text-white mr-4"  to="/">Links</router-link>

        <router-link class="block mt-4 md:inline-block md:mt-0  hover:text-white mr-4" v-if="$store.state.loginToken !== ''"    to="/criar-link">Criar Link</router-link>
        <!-- <a href="#responsive-header" class="block mt-4 md:inline-block md:mt-0  hover:text-white mr-4">
            Criar Links
        </a> -->
        <!-- <a href="#responsive-header" class="block mt-4 md:inline-block md:mt-0  hover:text-white">
            Blog
        </a> -->
        </div>
        <div class="space">
        <!-- <a href="#" class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 mt-4 md:mt-0">Sign Up</a> -->
        <button type="button" class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 mt-4 md:mt-0" @click.prevent="handleLogOut" v-if="$store.state.loginToken !== ''">Log out</button>
        <!-- <router-link class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 mt-4 md:mt-0" v-if="$store.state.loginToken !== ''"  to="/criar-usuario">Log out</router-link> -->
        <router-link class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 mt-4 md:mt-0" v-if="$store.state.loginToken == ''"  to="/criar-usuario">Sign Up</router-link>
        <!-- <a href="#" class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 mt-4m d:mt-0">Log In</a> -->
        <router-link class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 mt-4m d:mt-0" v-if="$store.state.loginToken == ''"  to="/login">Sign in</router-link>
        
        </div>
    </div>
</nav>
</template>

<script>
// @ is an alias to /src

// const tailwindConfig = require('tailwind.config.js');
//import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../././../../tailwind.config';


export default {
  data() {
    return {
      windowWidth: 0,
      menuOpen: false,
      mdBreakpoint: Number(tailwindConfig.theme.screens.md.replace('px', ''))
    }
  },
  computed: {
    menuVisible() {
      return this.windowWidth > this.mdBreakpoint ? true : this.menuOpen

    }
  },
  methods: {
    updateWindowSize() {
      this.windowWidth = window.innerWidth
    },
    clickMenu() {
      this.menuOpen = !this.menuOpen
    },
    handleLogOut() {
        this.$store.dispatch("destroyToken");
        this.$router.push({name: "Login"});
    }
  },
  mounted() {
    this.updateWindowSize()
    window.addEventListener('resize', this.updateWindowSize)
  },
  beforeDestroyed() {
    window.removeEventListener('resize', this.updateWindowSize)
  }
}

</script>


<style  scoped>
    .buttonActions {
        margin-right: 5px;
    }

    .menuAj {
      width: 100%;
      z-index: 999;
    }

   .space {
         margin-top: 0px;
    } 

    @media (max-width: 768px) {
        .space {
         margin-top: 10px;
        } 
        
       
    }

    /* @media only screen and (min-width: 481px) and (max-width:768px) {
        
    } */


    .whiteMenu {
        color: white;
    }

    button:focus {
        outline: 1px none;
        /* outline: 5px auto -webkit-focus-white-color; */
    }
</style>
