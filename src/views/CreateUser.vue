<template>
    <section class="ajust">
        <div class="ajustUser">
            <div class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="max-w-sm mx-auto px-6">
                    <div class="relative flex flex-wrap">
                        <div class="w-full relative">
                            <div class="md:mt-6">
                                <div class="text-2xl text-gray-900 font-semibold">
                                   Criar conta
                                </div>
                                <div class="text-gray-600">
                                    Insira e-mail e senha para realizar o cadastro
                                </div>
                                <form class="mt-8" x-data="{password: '',password_confirm: ''}">
                                    <div class="mx-auto max-w-lg ">
                                        
                                        <div class="py-1">
                                            <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
                                            <span v-if="!loading" class="px-1 text-sm text-gray-600">E-mail</span>
                                            <input v-if="!loading" placeholder="" v-model="email" type="email"
                                                class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  ">
                                        </div>
                                        <div class="py-1">
                                            <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
                                            <span v-if="!loading" class="px-1 text-sm text-gray-600">Password</span>
                                            <input v-if="!loading" placeholder="" type="password" v-model="password"
                                                class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  ">
                                        </div>
                                        <div class="py-1">
                                             <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
                                            <span v-if="!loading" class="px-1 text-sm text-gray-600">Password Confirm</span>
                                            <input v-if="!loading" placeholder="" type="password" v-model="password_confirm"
                                                class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white  ">
                                        </div>
                                        
                                        <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
                                        <button v-if="!loading" @click.prevent="handleCreateUser" class="mt-3 text-lg font-semibold
                        bg-blue-700 w-full text-white rounded-md
                        px-6 py-3 block shadow-xl hover:text-white hover:bg-blue-600">
                                            Register
                                        </button>
                                    </div>
                                </form>

                            

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        
        
    </section>
</template>

<script>
import firebase from '../config/firebase.js';
import 'firebase/auth';
    

    export default {
       name: "CreateUser",
       components: {
            
        },
        data() {
            return {
                email: '',
                password: '',
                password_confirm: '',
                loading: false,
            }
        },
        methods: {
            async handleCreateUser() {

                 this.loading = true;

                if(this.password !== this.password_confirm) {
                    
                    this.$notify({
                               
                        group: 'foo',
                        type: 'error',
                        title: 'Erro de senha!',
                        text: 'Verifique os campos de senhas!',         
                    });
                    this.loading = false;
                    return;
                          

                }

               
              
                await firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(() => {
                    // setCarregando(0);
                    // setMsgTipo('sucesso');
                     this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Sucesso!',
                        text: 'Conta criada com sucesso!'
                        
                    });

                     this.email = '';
                     this.password = '';
                     this.password_confirm = '';
                     this.loading = false;
                }).catch(erro => {
                   
                    switch(erro.message){   
                        
                        case "The email address is already in use by another account.":
                            
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Erro!',
                                text: 'Existe uma conta com esse e-mail!',
                                
                            });
                            
                           
                            this.loading = false;
                            

                        break;
                        case 'Password should be at last 6 characters!':
                            // setMsg('A senha deve ter pelo menos 6 caracteres!');
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Erro!',
                                text: 'A senha deve ter pelo menos 6 caracteres!',
                                
                            });
                             this.loading = false;
                        break;
                        case 'The email address is already in use by another account':
                            // setMsg('Este e-mail já está sendo usado por outro!');
                            // setMsg('A senha deve ter pelo menos 6 caracteres!');
                              this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Erro!',
                                text: 'Este e-mail já está sendo usado por outro!',
                                
                            });
                             this.loading = false;
                        break;
                        case 'The email eddress is badly formatted.':
                            // setMsg('O formato do seu e-mail é inválido!');
                            // setMsg('A senha deve ter pelo menos 6 caracteres!');
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Erro!',
                                text: 'O formato do seu e-mail é inválido!',
                                
                            });
                             this.loading = false;
                        break;
                        default:
                            // setMsg('Não foi possível cadastrar. Tente novamente mais tarde');
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Erro!',
                                text: 'Não foi possível cadastrar. Tente novamente mais tarde',
                                
                            });
                            // setCarregando(0);
                            this.loading = false;
                        break;      
                    }

                
                })
            }    
        }
    }
</script>

<style scoped>

.ajust {
    
    margin: 20px;
}

.ajustUser {
    max-width: 500px;
    margin: 95px auto;
    padding: 0 20px;
}

input:focus {
    outline: 1px none;
    /* outline: 5px auto -webkit-focus-white-color; */
}

button:focus {
    outline: 1px none;
    /* outline: 5px auto -webkit-focus-white-color; */
}

</style>