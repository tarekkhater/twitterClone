import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import {SessionProvider} from 'next-auth/react'
import { RecoilRoot,} from 'recoil'
function MyApp({ Component, pageProps :{session , ...pageProps} }) {
  return  (
    <SessionProvider session={session}>
      <RecoilRoot>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </RecoilRoot>
    </SessionProvider>
  )
    
  
 
}

export default MyApp
