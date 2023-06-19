
<template>

    <div class="container">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Düşüncelerini Yaz</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Bugün çok mutluyum" v-model="gonderi">
        </div>
        <div class="mb-3 text-center">
            <button type="button" @click="handleClick" class="btn btn-dark">Gönder</button>
        </div>
        <hr />
        <div class="mb-3">
            <ol class="list-group list-group-numbered">
                <li v-for="g in gonderiler" :key="g.id" class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">{{g.gonderi}}</div>
                    {{g.tarih}}
                    </div>
                    <span class="badge bg-primary rounded-pill">{{g.yorumlar.length}}</span>
                    <span @click="handleDelete(g.id)" class="badge bg-danger mx-2"> <i class="bi bi-x"></i> </span>
                </li>
                
            </ol>
        </div>
        
    </div>
        
    </template>
    
    <script>
        import {ref,onMounted} from 'vue'
        import getUser from '../composables/getUser' 
        import {addDoc,collection,serverTimestamp,onSnapshot,query,where, QuerySnapshot,deleteDoc,doc} from 'firebase/firestore'
        import {db} from '../firebase/config'
        import moment from 'moment'

        export default{
            setup(){

                const {kullanici}=getUser()
                const gonderi=ref('')
                const gonderiler=ref([])
                moment.locale('tr')

                const handleClick=async ()=>{
                    if (kullanici.value){
                        await addDoc (collection(db,'gonderiler'),{
                            gKullaniciAd:kullanici.value.displayName,
                            gonderi:gonderi.value,
                            tarih:serverTimestamp(),
                            yorumlar:[]

                        })
                        gonderi.value=''
                    }
                }

                const handleDelete=async(id)=>{
                    await deleteDoc(doc(db,"gonderiler",id))

                }

                onMounted(()=>{
                    const q=query(collection(db,'gonderiler'),where("gKullaniciAd","==",kullanici.value.displayName))
                    onSnapshot(q,QuerySnapshot=>{
                        const dizi=[];
                        QuerySnapshot.forEach(doc=>{
                            dizi.push({...doc.data(),id:doc.id,tarih:moment(doc.data().tarih.toDate()).format('LLL')})
                        })
                        gonderiler.value=dizi;
                    })

                })
                return {gonderi,handleClick,gonderiler,handleDelete}

            },
        }




    </script>



    <style scoped>
        .container{
            max-width: 600px;
            padding-top: 50px;
        }
    </style>
    
    
    //Navbar.vue 
    
    <router-link class="nav-link active" aria-current="page" to="/share">Paylaş</router-link>