
 <template>
  <div class="container my-5">
    <div class="row">
      <div class="alert alert-primary text-center" role="alert"> <h2>AOS Sosyal</h2></div>
    </div>
    <div class="row">
   <div class="col-sm-8 mb-3">
    <div class="card">
        <div class="card-header text-end">
        Tarih
    </div>
    <div class="card-body text-center">
        <h5 class="card-title">{{gonderi}}</h5>
        <p class="card-text">{{kullaniciAd}}</p>
        
      </div>
      

      <ul class="list-group list-group-flush" v-if="yorumlar.length!==0">
        <li class="list-group-item d-flex justify-content-between align-items-start" v-for="y in yorumlar" :key="y.yorum">
            <div class="ms-2 me-auto">
            <div class="fw-bold">{{y.yorum}}</div>
            
            </div>
            
            <span class="badge bg-primary mx-2">{{y.yKullaniciAd}}</span>
        </li>

      </ul>

      <ul class="list-group list-group-flush" v-if="yorumlar.length==0">
            <li class="list-group-item">Henüz yorum yapılmadı</li>
      </ul>

    </div>
  </div>

  <div class="col-sm-4" v-show="kullanici">
    <form @submit.prevent="handleYorumYap">
    <div class="mb-3">
        <div id="yorumBaslik" class="form-text">Gönderiye Yorum yapabilirsiniz</div>
        <label for="yorum" class="form-label">Yorumunuz</label>
        
        <input type="text" class="form-control" id="yorum" aria-describedby="yorumBaslik" v-model="yorumText">
        
    </div>
    
    <button type="submit" class="btn btn-outline-primary">Yorum Yap</button>
    </form>
  </div>
</div>

  </div>
</template>

<script>
import getUser from '../composables/getUser'
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import {db} from '../firebase/config'
import { doc, updateDoc, arrayUnion,onSnapshot } from "firebase/firestore";
import moment from 'moment'

export default {
    setup() {
        moment.locale('tr')
        const route=useRoute();
        const {kullanici}=getUser();
        const yorumText=ref('')
        const gonderi=ref('')
        const tarih=ref('')
        const yorumlar=ref([])
        const kullaniciAd=ref('')

        
        const gonderiRef = doc(db, "gonderiler", route.params.id);

        const handleYorumYap=async ()=>{

            await updateDoc(gonderiRef, {
                yorumlar: arrayUnion({
                    yKullaniciAd:kullanici.value.displayName,
                    yorum:yorumText.value
                })
            });
            yorumText.value=''


        }
        
        onSnapshot(gonderiRef,(snap)=>{
            //console.log(snap.data());
            gonderi.value=snap.data().gonderi;
            tarih.value=moment(snap.data().tarih.toDate()).calendar()
            kullaniciAd.value=snap.data().gKullaniciAd;
            yorumlar.value=snap.data().yorumlar;
        })

            return {kullanici,yorumText,handleYorumYap,yorumlar}

    },
}
</script> 

<style>

</style>