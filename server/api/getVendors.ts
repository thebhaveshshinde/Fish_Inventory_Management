import { initializeApp } from "firebase/app";
import { collection, getDocs, query, getFirestore } from "firebase/firestore";

const config=useRuntimeConfig()

const db=initializeApp(config.firebaseConfig)
const app=getFirestore(db)

export default defineEventHandler(async(event)=>{
    let vendors:Vendors[]=[]
    const q = query(collection(app, "vendors"));
    const querySnapshot = await getDocs(q);
    
    try{

    querySnapshot.docs.forEach((doc) => {
        vendors.push({
            id: doc.id,
            ...doc.data() as Vendors
        });
    });

    return {
        status:200,
        vendors
    }

}
catch(err){
    return {
        status:500
    }
}
   
})