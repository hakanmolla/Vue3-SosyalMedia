<template>
    <nav class="navbar navbar-expand-lg  bg-light">
  <div class="container">
    <router-link to="/" class="nav-link active" aria-current="page" href="#">AOS Sosyal</router-link>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
	data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
	aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-show="kullanici">
          <router-link to="/share" class="nav-link active" aria-current="page" href="#">Paylaş</router-link>
        </li>
        
      </ul>
       <div class="d-flex" role="search">
      
        <router-link to="/login" class="btn btn-outline-success" type="submit" v-show="!kullanici"> Giriş </router-link>
        <button @click="handleCikis" class="btn btn-outline-danger" type="submit" v-show="kullanici">Çıkış</button>
       </div>

    </div>
  </div>
</nav>
</template>

<script>
import getUser from '../composables/getUser';
import {auth} from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const {kullanici}=getUser();
    const router=useRouter();

    const handleCikis =async ()=>{
      await signOut(auth)
      router.push({name:'login'})
    }
    return { kullanici,handleCikis}

  }

}
</script>

<style>

</style>