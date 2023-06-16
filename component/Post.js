
import { useSelector } from "react-redux";
import styles from '../styles/Feeds.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import {db} from '../firebase';
import { onSnapshot, query , collection , orderBy, setDoc, doc, deleteDoc, terminate } from "firebase/firestore";
import Moment from "react-moment";
import {HeartIcon} from "@heroicons/react/solid"
import { deleteObject, ref } from "firebase/storage";
import Comment from "./Comment";
import { useRecoilState } from "recoil"
import { modalState , PostIdState} from '../atom/modalAtom';
  

export default function Post({feed , id}) {
    const {data:session} = useSession();
    var [likes , setLikes] =useState([])
    var [comments , setComments] =useState([])
    var [hasLiked , setHasLiked] =useState(false)
    const[show , setShow] = useRecoilState(modalState)
    const [postId , setPostId] = useRecoilState(PostIdState)
  useEffect(()=>{
    onSnapshot(collection(db , "posts" , id,"likes"),(snapshot)=> setLikes(snapshot.docs))
  },[db])

  useEffect(()=>{
    onSnapshot(collection(db , "posts" , id,"comment"),(snapshot)=> setComments(snapshot.docs))
  },[db])
  useEffect(()=>{
    setHasLiked(likes.findIndex((like)=> like.id === session?.user.id) !==-1)
  },[likes])
  async function likePost(){
    if(hasLiked){
        await deleteDoc(doc(db , "posts", id ,"likes" , session?.user.id));
    }
    else
    {await setDoc(doc(db , "posts", id ,"likes" , session?.user.id),{
      username: session.user.name
    })}
  }
  async function deletePost(){
    if(window.confirm("Do you want to delete this post?")){
    deleteDoc(doc(db , "posts" , id))
    deleteObject(ref(storage,`posts/${id}/image` ))}
  }
  return (
    <div>
        <div key={id} className={styles.feed}> 
              <div className={styles.postProfile}><img src={feed?.data().profileImg} id={styles.imge} alt='' />
              </div>
              <div>
                  <div className={styles.text}>
                  <p className={styles.username}>{feed?.data().name}</p>
                    <p className={styles.emaill}>
                      @{feed?.data().email.split("@gmail.com")} - 
                      &nbsp;<span className={styles.time}>
                        <Moment fromNow>{feed?.data()?.time?.toDate()}</Moment>
                        </span> </p>
                  </div>
                  <div>
                    <div className={styles.postText}><p >{feed?.data().postText}</p>
                    </div>
                    <div className={styles.image}>
                      {
                        feed?.data().image &&(
                          <img src={feed?.data()?.image} alt='' className={styles.postImg} />
                        )
                      }
                      <div >
                        <div className={styles.row}>
                            <div>
                                <span id={styles.comments}><i  className="bi bi-chat-dots" onClick={()=> {setShow(!show);
                                setPostId(feed.id);}
                                }></i></span>
                                {comments.length > 0 &&
                                <span className={styles.comment}>{comments.length}</span>
                                }
                                </div>
                                <div>
                                {session?.user.name === feed?.data().name ? (
                                    <span id={styles.comments} ><i  className="bi bi-trash3" onClick={deletePost}></i></span>
                                )
                                :(
                                    <span id={styles.comments} ><i  className="bi bi-trash3"  disabled={!''}> </i></span>
                                )}
                            </div>
                        
                            <div>
                              {hasLiked? 
                              ( <span id={styles.comments}> <HeartIcon   onClick={likePost} className={styles.heart}></HeartIcon></span>)
                              :( <span id={styles.comments}> <i  className="bi bi-heart" onClick={likePost}></i></span>)}
                              {likes.length > 0 &&
                                <span className={styles.likes}>{likes.length}</span>
                              }
                            </div>
                            <span id={styles.comments}><i  className="bi bi-share"></i></span>               
                      </div>
            </div>
            </div>
                  </div>
              </div>
            </div >
            
       
      
    </div>
  )
}
