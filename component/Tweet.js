import { useSelector } from 'react-redux';
import styles from '../styles/Tweet.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSession } from 'next-auth/react'
import {useRef, useState} from 'react'
import {db , storage} from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function Tweet() {
     const filePickerRef = useRef(null);
     const [input , setInput] = useState("")
     const {data:session} = useSession();
     const [selectImagePost , setSelectImagePost] = useState(null)
     const setPosts =async ()=>{
          const docRef = await addDoc(collection(db , "posts"),{
               postText:input,
               name:session.user.name,
               email:session.user.email,
               time:serverTimestamp(),
               profileImg:session.user.image,
               id:session.user.id,
          });
          const imageRef = ref(storage , `posts/${docRef.id}/image`);
          if(selectImagePost){
               await uploadString(imageRef,selectImagePost,"data_url").then (async()=>{
                    const downloadUrl= await getDownloadURL(imageRef );
                    await updateDoc(doc(db,"posts",docRef.id),{
                         image:downloadUrl,
                    })
               })
          }
          setInput('');
          setSelectImagePost(null);
     };
     const addImagePost =(e) => {
     const reader = new FileReader();
     if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
     };
     reader.onload =(readerEvent) =>{
          setSelectImagePost(readerEvent.target.result);
     }
     }
return (
     <div className={styles.container}>
          <div className="row">
               <h5>Home</h5>   
          </div>
          <div  id={styles.tweet}>
               <div >
               <img src={session?.user.image}  id={styles.imge}/>     
               </div>
               <div  >
                    <textarea className={styles.post} placeholder=" What's happenning"
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                    >

               </textarea>
               {selectImagePost && (
                    <div className={styles.selectImage}>
                         <i className="bi bi-x-lg" id={styles.remove} onClick={()=> setSelectImagePost(null)}></i>
                         <img src={selectImagePost} alt=''  />
                    </div>
               )}
               <div className={styles.emoji}>  
                    <input type="file" id={styles.file} ref={filePickerRef} onChange={addImagePost} />
               &nbsp;<i id={styles.emoji} className="bi bi-images" onClick={()=>filePickerRef.current.click()}></i>
               <button type="button"id={styles.btn} className="btn btn-primary" disabled={!input.trim() && !selectImagePost} onClick={setPosts}>Tweet</button>
               </div>
          </div>
     </div>
     </div>
)
}
export default  Tweet;