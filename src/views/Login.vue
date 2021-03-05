<template>
    <section class="ajust">
        <div class="login">
            <div class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="mb-4">
            <label v-if="!this.loading" class="px-1 text-sm text-gray-600" for="username">
                E-mail
            </label>
            <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
            <input v-if="!loading"  class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white" id="username" v-model="login.email" type="text" placeholder="">
            </div>
            <div class="mb-6">
            <label v-if="!this.loading" class="px-1 text-sm text-gray-600" for="password">
                Password
            </label>
            <PuSkeleton v-if="this.loading"  height="50px"></PuSkeleton>
            <input v-if="!this.loading" class="text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white" id="password" v-model="login.password" type="password" placeholder="">
            
            </div>
            <div class="flex items-center justify-between">
            <!-- <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
                Sign In
            </button> -->
            
            <!-- <router-link class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 mt-4m d:mt-0" @click.prevent="handleLogin"  to="/login">Login</router-link> -->
            <button v-if="!loading" class="buttonActions inline-block text-sm px-4 py-2 rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 mt-4m d:mt-0"  @click.prevent="handleLogin"  type="button">Login</button>
            <PuSkeleton v-if="loading"  height="50px"></PuSkeleton>
            <!-- <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                Forgot Password?
            </a> -->
            </div>
        </div>

        </div>
        
        
    </section>
</template>

<script>



    export default {
       name: "Login",
       components: {
            
        },
        data() {
            return {
                login: {
                    email: "",
                    password:"",
                },
                loading: false,

            }
        },
        methods: {
            async handleLogin() {
                this.loading = true;
                await this.$store.dispatch("getToken", this.login).then(() => {
                    this.$router.push({name: "Home"});
                    // this.$vToastify.success("Ea");
                  
                }).catch(erro => {
                    console.log('erro: ' ,erro);
                     this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Erro!',
                        text: 'Verique o e-mail ou senha',
                        
                    });
                    
                });
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

.ajust {
    margin: 20px;
}

.ajust {
    margin-top: 110px
}

.login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}

.ajustLoading {
    border-radius: 20px;
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