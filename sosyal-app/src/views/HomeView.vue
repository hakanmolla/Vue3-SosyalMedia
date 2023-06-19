<template>
  <div class="container">
<div class="row" v-if="gonderiler.length!==0">
  <div class="col-sm-6 mb-3" v-for="g in gonderiler" :key="g.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{g.gonderi}}</h5>
        <p class="card-text">{{g.gKullaniciAd}}</p>
        <router-link :to="'/browse/'+g.id" class="btn btn-primary">İncele</router-link>
      </div>
      <div class="card-footer text-muted text-center">
        {{g.tarih}}
      </div>

    </div>
  </div>
 
</div>

<div class="row" v-if="gonderiler.length==0">
  <div class="col-sm-6 mb-3">
      <p class="h3">Henüz gönderi eklenmedi</p>
  </div>
</div>
</div>
</template>

<script>
import {db} from '../firebase/config'
import { collection, onSnapshot } from "firebase/firestore";
import {ref} from 'vue'

import moment from 'moment';


export default {
  name: 'HomeView',
  setup(){

  const gonderiler=ref([])
  moment.locale('tr')
  const unsub =onSnapshot(collection(db, "gonderiler"), (snap) => {
    //console.log(snap.docs);

    snap.docs.forEach(doc=>{
      gonderiler.value.push({...doc.data(),id:doc.id,tarih:moment(doc.data().tarih.toDate()).fromNow()})
    })

    console.log(gonderiler.value);
  });

  return {gonderiler}

  }


}
</script>

<style scoped>
        .container{
            max-width: 600px;
            padding-top: 50px;
        }
  </style>
    