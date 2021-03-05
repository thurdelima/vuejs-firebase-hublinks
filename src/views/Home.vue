<template>
  <div class="home">
       <form action="" >
       <!-- <input type="text" name=""  id="busca" v-model="busca" placeholder="Buscar...">
        <input type="submit" id="lupa" value="Buscar" @click.prevent="buscarProdutos"> -->
        <div class="pt-2 relative mx-auto text-gray-600 ajustSearch">
        <input @change="handleSearchLink" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search">
        <button type="submit" @click.prevent="handleGoSearch" class="absolute right-0 top-0 mt-5 mr-4">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
        <!--{{busca}} -->
   </form>


   <section class="produtos-container">
            
            <div class="produtos">
              
              
               <div v-if="this.links.length > 0" class="produtos">
                    <div  v-for="(link, index) in links" :key="index" class="shadow-xl lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 ajustCard">
                    
                    <link-item :name="link.name" :id="link.id" :imageName="link.foto" :linkUrl="link.link" />
                  
                  </div>
               </div>
               
                <div v-else class="py-3 px-2 my-2 bg-yellow-300 text-yellow-800 rounded border border-yellow-600 ajustAlert">Nenhum link encontrado.</div>


                
   
            </div>
            
           
        </section>

      
      
      
      
      <!-- <search-link /> -->
     
    
    
  </div>
</template>

<script>
import firebase from '../config/firebase.js';
// @ is an alias to /src
 
import LinkItem from '../components/LinkItem.vue';

export default {
  name: 'Home',
   data() {
      return {
        busca: "",
        links: []
      };      
  },
  components: {
    // SearchLink,
    //ListLink,
    LinkItem

  },
  created() {
    this.handleSearch();
  },
  methods: {
    handleGoSearch() {
      console.log(' entrou');
      this.handleSearch();
    },
    handleSearchLink(event) {
      
      this.busca = event.target.value;
    },
     async handleImage(img) {
      //let image = '';
      await firebase.storage().ref(`imagens/${img}`).getDownloadURL().then((url) => {
        let image = '';
        image = url;
        console.log('IMAGE: ', image.toString());
        return image.toString();
      });

      //  console.log('IMAGE: ', image);
      // return image.toString();
      
    
    },
    async handleSearch() {
       while(this.links.length) {
                        this.links.pop();
                      }
       await firebase.firestore().collection('links').get().then((resultado) => {
                resultado.docs.forEach(doc => {
                    if(doc.data().name  && doc.data().name.indexOf(this.busca) >= 0){
                         console.log('DOC.DATA: ', doc.data());
                        this.links.push({
                            id: doc.id,
                        ...doc.data()
                        })

                        console.log('THIS.LINKS: ', this.links);
                    } else {
                      //this.links.length = 0;
                        while(this.links.length) {
                        this.links.pop();
                      }
                    }
                    
                    
                })
    
                
            })
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

 .home {
   margin-top: 110px;
 }

 .ajustAlert {
   width: 100%;
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
