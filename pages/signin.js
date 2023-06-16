import styles from '../styles/signin.module.css';
import { getProviders , signIn } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function signin({providers}) {
  
  return (
    <div className={styles.container} >
      <img className={styles.logo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png' alt='logo'  />
     {Object.values(providers).map((provider)=> (
      <div key={provider.id}>
        <button id={styles.sign} className=" bg-red-400" onClick={()=> signIn(provider.id , {callbackUrl:'/'})}>Sign in with {provider.name}</button>
      </div>
     ))}
     
    </div>
  )
}
export default signin

export async function getServerSideProps(){
  const providers = await getProviders();
  return({
    props:{
      providers,
    }
  })
}