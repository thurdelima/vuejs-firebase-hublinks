<template>
   
    
    <div class="produtos">
        
        <link-image :img="this.imageName" />
       
                  <div class="p-4">
                    <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">{{this.name}}</h3>
                    <p class="text-justify alContent">{{this.linkUrl}}</p>
                    <div class="mt-5">
                       
                    </div>
                    <div>
                         <router-link class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100"   :to="{name: 'Link', params: {id: this.id}}">
                             Visualizar
                         </router-link>
                    </div>
                    
                  </div>
    </div>
    
  

</template>

<script>
import firebase from '../config/firebase.js';
import LinkImage from './LinkImage.vue';

//     const storage = firebase.storage();
//     const db = firebase.firestore();
   
    

    export default {
        name: "LinkItem",
        components: {
            LinkImage 
        },
        data() {
            return {

              
              
                fotoUrl: '',
               
              
              loading: false,
      
            }
        },
          props: {
            id: {
                 type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            imageName: {
                type: String,
                default: ''
            },
            linkUrl: {
                type: String,
                default: ''
            }
        },
        mounted() {
             //this.handleImage();
        },
        beforeUpdate() {
            
        },
        beforeCreate() {
        
        },
        beforeMount() {
           
        },
        created() {
           // this.handleImage();

         
        },
        methods: {
             handleImage() {
            //let image = '';
                 firebase.storage().ref(`imagens/${this.imageName}`).getDownloadURL().then((url) => {
                    
                    return url;
              
                });

          
            
            
            },
        },  
    }
</script>

<style  scoped>
    form {
     max-width: 600px;
     margin: 30px auto 60px auto;
     position: relative;
    
 }

 .alContent {
     max-height: 70px;
    min-width: 70px;
    text-align: justify;
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