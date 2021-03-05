<template>
   
    
    <div class="produtos">
        <!-- v-bind:style="{ 'background-image': 'url(' + image + ')' }" -->
        <!-- <div v-bind:style="{ 'background-image': 'url(' + fotoUrl + ')' }"> -->

        <!-- </div> -->
        <img :src="fotoUrl"  class="overflow-hidden">
        <!-- <img  height="125" width="50"/> -->
      
    </div>
    
  

</template>

<script>
import firebase from '../config/firebase.js';


    

    export default {
        name: "LinkImage",
        data() {
            return {

              
              
                fotoUrl: '',
               
              
              loading: false,
      
            }
        },
          props: {
         
            img: {
                type: String,
                default: ''
            },
          
        },
        computed: {
          
        },
        mounted() {
            this.handleImage();
        },
        beforeUpdate() {
            
        },
        beforeCreate() {
           
        
        },
        beforeMount() {
          
        },
        created() {
            
           
           
         
        },
        methods: {
             async handleImage() {
            //let image = '';
               await  firebase.storage().ref(`imagens/${this.img}`).getDownloadURL().then((url) => {
                 
                    this.fotoUrl = url;
                 
                });
              }    
        }
            
            
    }
</script>

<style  scoped>
    form {
     max-width: 600px;
     margin: 30px auto 60px auto;
     position: relative;
    
 }

 .ajustSearch {
     display: flex;
     flex-direction: column;
     margin: 10px
 }

 #busca {
     width: 100%;
     padding: 20px;
     border: none;
 }

 #busca:focus,
 #busca:hover {
    
     transform: scale(1.1);
     
 }

  


.produtos-container {
    max-width: 1000px;
    margin: 0 auto;
}

.produtos {
    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 30px; */

    display: flex;
    flex-direction: row;
    flex-flow: wrap;
}

.ajustCard {
    max-width: 300px;
    /* margin: 10px auto; */
    margin: 10px;
}

@media (max-width: 768px) {
   .ajustCard {
    max-width: 300px;
    /* margin: 10px auto; */
    margin: 10px auto;
  }
        
       
} 

button:focus {
        outline: 1px none;
        /* outline: 5px auto -webkit-focus-white-color; */
}


</style>