import 'bootstrap/dist/css/bootstrap.css';
import {  useState } from 'react';
import styles from '../styles/Sidebar.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';
import {useSession , signOut} from 'next-auth/react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
function Sidebar() {
  const {data : session} = useSession();
  
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[])
    const {profileImg , username , email } = useSelector(state => state.info)
    const router = useRouter();
    const [profile , setProfile] = useState();
  
  return (
    <div className={styles.container}>
      <div><img className={styles.logo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553' alt='logo'  />
      <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <p className="nav-link  " id={styles.home}      ><i className="bi bi-house-door-fill"></i><span>&nbsp; Home</span></p>
          <p className="nav-link" id="v-pills-profile-tab"><i className="bi bi-hash"></i><span>&nbsp; Explore</span></p>
          <p className="nav-link" id="v-pills-profile-tab"><i className="bi bi-bell"></i><span>&nbsp; Notification </span></p>
          <p className="nav-link" id="v-pills-messages-tab"><i className="bi bi-envelope"></i><span>&nbsp; Messages</span></p>
          <p className="nav-link" id="v-pills-profile-tab"><i className="bi bi-bookmark"></i><span>&nbsp; Bookmarks</span></p>
          <p className="nav-link" id="v-pills-profile-tab"><i className="bi bi-person"></i><span>&nbsp; Profile</span></p>
          <p className="nav-link" id="v-pills-settings-tab"  type=" button"  ><i className="bi bi-gear" ></i><span>&nbsp; Settings </span></p>
          <button className="btn btn-info" id={styles.tweet} onClick={()=>{signOut() ; router.push('/signin')}} ><i className="bi bi-box-arrow-up"></i><span>&nbsp; Sign out </span></button>
      </div>
      <div className={styles.prof}> 
        <img src={session?.user?.image} alt='' width='50px' height='50px' className={styles.imge}  />
        <h4 className={styles.username}>{session?.user?.name}</h4>
        <h6 className={styles.emaill}>{session?.user?.email}</h6>
        
    </div></div>
    </div>
  )
}
export default Sidebar;
