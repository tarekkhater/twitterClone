import { useRecoilState } from "recoil"
import {modalState, PostIdState} from '../atom/modalAtom';
import Modal from 'react-modal';
import styles from '../styles/Comment.module.css'
import { useEffect, useState ,useRef} from "react";
import { db } from "../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import Moment from "react-moment";
import {useSession } from 'next-auth/react'
import { useRouter } from "next/router";
export default function Comment() {
    const [show , setShow] = useRecoilState(modalState)
    const [postId , setPostId] = useRecoilState(PostIdState)
    const [feed , setFeed] = useState({})
    const filePickerRef = useRef(null);
    const [input , setInput] = useState("")
    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        onSnapshot(doc(db , "posts" , postId),(snapshot) => {setFeed(snapshot)})
    },[postId , db])
    const addImagePost =(e) => {
         const reader = new FileReader();
         if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
         };
         reader.onload =(readerEvent) =>{
          setSelectImagePost(readerEvent.target.result);
         }
     }
     async  function setComment(){
          await addDoc(collection(db , "posts", postId ,"comment" ),{
              comment : input,
              username: session?.user.name,
              email:session?.user.email,
              time:serverTimestamp(),
              profileImg:session?.user.image,
              
          });
          setShow(false);
          setInput("");
          (router.push(`/post/${postId}`))
     }
     
  return (
    <div className={styles.container}>
      {show &&(
        <Modal isOpen={show} className={styles.model}>
          <i className="bi bi-x-lg" id={styles.exit} onClick={()=>setShow(false)}></i>
          <hr/>
          
          <div style={{paddingTop:"5px"}}>
          <div className={styles.profile}>
            <span className={styles.line}/>
            <span className={styles.postProfile}><img src={feed?.data()?.profileImg} id={styles.imge} alt='' /></span>
                
                    <span className={styles.username}>{feed?.data()?.name}</span>
                    <span className={styles.emaill}> @{feed?.data()?.email.split("@gmail.com")} - <span><Moment fromNow>{feed?.data()?.time?.toDate()}</Moment></span> </span>
                
           </div >
           <div className={styles.postText}><p >{feed?.data()?.postText}</p></div>
          </div>
          <div className="row" id={styles.tweet}>
            <div className="col-1">
            <img src={session?.user.image}  id={styles.imge1}/>     
            </div>
            <div className="col-11" >
                <textarea className={styles.post} placeholder=" Tweet your reply"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                >

                </textarea>
                
                <hr />
                <div className={styles.emoji}>  
                    <input type="file" id={styles.file} ref={filePickerRef} onChange={addImagePost} />
                &nbsp;<i id={styles.emoji} className="bi bi-images" onClick={()=>filePickerRef.current.click()}></i>
                <button type="button"id={styles.btn} className="btn btn-primary" disabled={!input.trim()} onClick={setComment}>Reply</button>
                </div>
                
            </div>
          </div>
         
      </Modal>
      )}
      
    </div>
  )
}
