import Tweet from "./Tweet";
import { useSelector } from "react-redux";
import styles from '../styles/Feeds.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import {db} from '../firebase';
import { onSnapshot, query , collection , orderBy, setDoc, doc } from "firebase/firestore";
import Moment from "react-moment";
import {HeartIcon} from "@heroicons/react/solid"
import Post from './Post'
export default function Feeds() {
  
  var [feeds , setFeeds] = useState([]);
        
  useEffect(()=>{
    onSnapshot(
     (query(collection(db, "posts"),orderBy("time" , "desc"))),
   (snapshot)=> {setFeeds(snapshot.docs);}
)},[])
        
  return (
    <div className={styles.conatinerr}>
     <div className="row" id={styles.tweet}> <Tweet /> </div>
      <div className={styles.container}>
        <div className="row" id={styles.feed}>
            { feeds.map((feed)=>(
              <Post key={feed.id}  id={feed.id} feed={feed}  />
            ))}
        </div> 
      </div>
    </div>
  )
}

