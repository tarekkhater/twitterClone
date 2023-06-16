import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import {db} from '../firebase';
import { onSnapshot, query , collection , orderBy, setDoc, doc, deleteDoc, terminate } from "firebase/firestore";
import Moment from "react-moment";
import {HeartIcon} from "@heroicons/react/solid"
import { deleteObject, ref } from "firebase/storage";
import styles from '../styles/GetComment.module.css'
import { useRecoilState } from "recoil"
import { modalState , PostIdState} from '../atom/modalAtom'
export default function GetComments({comment ,id , originalId}) {
    const {data:session} = useSession();
    var [likes , setLikes] =useState([])
    var [comments , setComments] =useState([])
    var [hasLiked , setHasLiked] =useState(false)
    const[show , setShow] = useRecoilState(modalState)
    const [postId , setPostId] = useRecoilState(PostIdState)
    useEffect(()=>{
        onSnapshot(collection(db , "posts" , originalId , "comment" , id ,"likes" ),(snapshot)=> setLikes(snapshot.docs))
      },[db,originalId ])
    
      useEffect(()=>{
        setHasLiked(likes.findIndex((like)=> like.id === session?.user.id) !==-1)
      },[likes])
      async function likePost(){
        if(hasLiked){
            await deleteDoc(doc(db , "posts", originalId , "comment" ,id ,"likes" , session?.user.id));
        }
        else
        {await setDoc(doc(db , "posts", originalId, "comment" ,id ,"likes" , session?.user.id),{
          username: session.user.name
        })}
      }
      async function deleteComment(){
        if(window.confirm("Do you want to delete this post?")){
        deleteDoc(doc(db , "posts" , originalId , "comment", id))
        }}
        
  return (
    <div className='container'>
        <div className='row'>
            <div style={{paddingTop:"5px"}}>
                <div className={styles.profile}>
                    
                    <span className={styles.postProfile}><img src={comment?.profileImg} id={styles.imge} alt='' /></span>
                    <span className={styles.username}>{comment?.username}</span>
                    <span className={styles.emaill}> @{comment?.email.split("@gmail.com")} - <span><Moment className={styles.time} fromNow>{comment?.time?.toDate()}</Moment></span> </span>
                </div >
                    <div className={styles.postText} ><p>{comment?.comment}</p></div>
            </div>
        </div >          
              {comment?.image &&(
                <img src={feed.data().image} alt='' className={styles.postImg} />
              )}
           <div className="row">
                <div className={styles.row}>
                    <span id={styles.comments}><i  className="bi bi-chat-dots" onClick={()=> {setShow(!show);setPostId(originalId)}}></i></span>
                    {session?.user.name === comment?.username ? (
                    <span id={styles.comments} ><i  className="bi bi-trash3" onClick={deleteComment}></i></span>
                )
                 :(
                    <span id={styles.comments} ><i  className="bi bi-trash3"  disabled={!''}> </i></span>
                 )}
               {hasLiked? 
               ( <span id={styles.comments}> <HeartIcon   onClick={likePost} className={styles.heart}></HeartIcon></span>)
               :( <span id={styles.comments}> <i  className="bi bi-heart" onClick={likePost}></i></span>)}
               {likes.length > 0 &&
                <span className={styles.likes}>{likes.length}</span>
               }
               <span id={styles.comments}><i  className="bi bi-share"></i></span>               
            </div>
            </div>
            <hr />
            
            
        </div>
   
  )
}
