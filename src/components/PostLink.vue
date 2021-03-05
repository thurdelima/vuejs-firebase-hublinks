<template>
    <!-- <form class="adicionar-produto" >
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" v-model="produto.nome">
        
        <label for="preco">Preco (R$)</label>
        <input type="number" name="preco" id="preco" v-model="produto.preco">
        <label for="fotos">Fotos</label>
        <input type="file" name="fotos" id="fotos" ref="fotos">
        <label for="descricao">Descricao</label>
        <textarea  name="descricao" id="descricao" v-model="produto.descricao"></textarea>
        <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto">

    </form> -->

    
   
    <div class="PostLink">
      <form action="" class="shadow-xl link-container form bg-white p-6 my-10 relative">
               
              
                 <h3 class="text-2xl text-gray-900 font-semibold">Criar Link</h3>
                    <p class="text-gray-600"> Adicione um Nome, Link e Foto para realizar o cadastro.</p>
                   
                    <PuSkeleton  v-if="loading"  height="50px"></PuSkeleton>
                    <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
                    <div v-if="!loading" class="flex linkForm space-x-5 mt-3">
                      
                        <input v-if="!loading"  v-model="link.name" type="text"  placeholder="Nome" class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  w-1/2 displayInput">
                        
                        
                        <input v-if="!loading" type="tel" v-model="link.url"  placeholder="Link" class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  w-1/2 displayInput">
                    </div>
                    
                    <PuSkeleton  v-if="loading"  height="50px"></PuSkeleton>
                    <div v-if="!loading" class="ajustFile">
                      
                      <div  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input @change="handleFile" id="file-upload" name="file-upload" type="file" class="sr-only">
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                          <p  class="text-xs text-gray-500">
                            {{this.link.foto ? this.link.foto.name : ''}}
                          </p>
                        </div>
                      </div>
                   </div>
               
                <PuSkeleton  v-if="loading"  height="50px"></PuSkeleton>
                <button v-if="!loading" type="submit" @click.prevent="handleCreateLink" value="Submit" class="rounded-md w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3">Register</button>
              
                   

            </form>
    </div>
  

</template>

<script>
import firebase from '../config/firebase.js';
import store from '../store/index.js';

    const storage = firebase.storage();
    const db = firebase.firestore();
    // console.log('store.state.email: ', store.state.email);
    

    export default {
        name: "PostLink",
        data() {
            return {

              link: {
                name: '',
                url: '',
                foto: '',
                user: store.state.email
              },
              loading: false,
      
            }
        },
        methods: {
             handleFile(event) {
               console.log(`event.target.files: `, event.target.files[0].name);
               this.link.foto = event.target.files[0];
               console.log('this.link.foto.name: ', this.link.foto);
             },
             async handleCreateLink() {
               this.loading = true;
             
              

               await storage.ref(`imagens/${this.link.foto.name}`).put(this.link.foto).then(() => {
                
                  //  let n = store.state.email;

                  db.collection('links').add({
                      name: this.link.name,
                      link: this.link.url,
                      user: this.link.user,
                      views: 0,
                      foto: this.link.foto.name,
                      create: new Date()
                  }).then(() => {
                      
                      this.$notify({
                          group: 'foo',
                          type: 'success',
                          title: 'Sucesso!',
                          text: 'Link criado com sucesso!',
                          
                      });

                      this.link.name = '';
                      this.link.url = '';
                      this.link.foto = '';

                      this.loading = false
                      
                  }).catch(erro => {
                      console.log('ERRO: ', erro);
                      this.$notify({
                          group: 'foo',
                          type: 'error',
                          title: 'Erro!',
                          text: 'Verifique os dados!',
                          
                      });
                      this.loading = false;

                  })
                })
             
              
            }
        },  
    }
</script>

<style  scoped>

.PostLink {
  margin: 10px;
}

.link-container {
    max-width: 1000px;
    margin: 0 auto;
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

.ajustFile {
  margin-top: 10px;
}

textarea:focus {
        outline: 1px none;
        /* outline: 5px auto -webkit-focus-white-color; */
}

input:focus {
        outline: 1px none;
        /* outline: 1px auto -webkit-focus-blue-color; */
}

 .icon::after{
  content: '';
  display: block;
  position: absolute;
  border-top: 23px solid transparent;
  border-bottom: 17px solid transparent;
  border-left: 12px solid #3182ce;
  left: 100%;
  top: 0;
}

/* .adicionar-produto {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
}

.btn {
    grid-column: 2;
} */

</style>