<template>
    <section class="linkView">
         <div class="top h-64 w-full bg-blue-600 overflow-hidden relative" >
            <div class="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                <img :src="this.fotoUrl" />
            </div>
       </div>
   
        <div class="infoLink">
            <div class="shadow-xl link-container form bg-white p-6 my-10 relative">
                 <div class="flex linkForm space-x-5 mt-3">
                        <input type="text" v-model="this.name" name="" id="" placeholder="Nome" class="text-md block px-3 py-2 rounded-lg 
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  w-1/2 displayInput">
                        <input type="tel" v-model="this.link" name="" id="" placeholder="Link" class="text-md block px-3 py-2 rounded-lg 
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  w-1/2   displayInput">
                    <div class="w-1/10 ajustView">
                      
                        <svg class="wIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                         {{this.views}}
                    </div>
                </div>
            </div>

        </div>

    </section>
    
   
   
</template>

<script>
import firebase from '../config/firebase.js';
    

    export default {
       name: "Link",
        props: ["id"],
       components: {
            
        },
        data() {
            return {
                name: '',
                link: '',
                views: '',
                fotoUrl: '',
            }
        },
        created() {
            this.handleLink();
        },
        methods: {
           async  handleLink() {
               await  firebase.firestore().collection('links').doc(this.id).get().then(resultado => {
               
                
                this.name = resultado.data().name;
                this.link = resultado.data().link;
                
                 firebase.firestore().collection('links').doc(this.id).update('views', resultado.data().views + 1);
                this.views = resultado.data().views + 1;

                firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then(url => {
                
                    this.fotoUrl = url;
                });
            });
            }
            // logar() {
            //     this.$store.dispatch("getUsuario", this.login.email);
            //     this.$router.push({name: "usuario"});
            // }
        }
    }
</script>

<style scoped>

.ajust {
    margin: 20px;
}

.wIcon {
    height: 32px;
    color: blue;
    margin-left: 5px;
    margin-right: 5px;
}

img {
    width: 100%;
}

.linkView {
    margin-top: 84px;
}

.infoLink {
  /* margin: 10px; */
    max-width: 850px;
    margin: 0 auto;
    padding: 0 20px;
}

.ajustView {
    display: flex;
    align-items: center;
    color: blue;
    /* flex-direction: row-reverse; */
}

.login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}

input:focus {
        outline: 1px none;
        /* outline: 5px auto -webkit-focus-white-color; */
}

.displayInput {
      
      /* margin: 5px; */
      margin-right: 5px;
      margin-left: 5px;
}



.lt {
  margin-left: 0px
}

.space-x-5 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: 0px;
    margin-left: 0px;
}

@media (max-width: 768px) {
      .linkForm {
      /* display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px;
      margin: 30px; */

      /* display: flex;
      flex-direction: row; */
      flex-flow: wrap;
    }

    .displayInput {
      width: 100%;
      /* margin: 5px; */
      margin-top: 5px;
      margin-bottom: 5px;
       margin-right: 0px;
      margin-left: 0px;
    }
        
       
  }    

</style>