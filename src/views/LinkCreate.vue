<template>
    <div class="LinkCreate">
     
        <post-link />
    
   </div>

</template>

<script>
import PostLink from '../components/PostLink.vue';

    export default {
        name: "LinkCreate",
        components: {
          PostLink
        },
        data() {
            return {
                // produto: {
                //     nome: "",
                //     preco: "",
                //     descricao: "",
                //     fotos: null,
                //     vendido: "false",

                // }
            }
        },
        methods: {
            
        }
    }
</script>

<style  scoped>

textarea:focus {
    outline:  1px blue !important;
}

.linkCreate {
    margin-top: 110px;
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