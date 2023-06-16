import { createSlice } from "@reduxjs/toolkit";
import styles from '../styles/Sidebar.module.css'
import styless from '../styles/Tweet.module.css'

const slice = createSlice({
    name: "Slice1",
    initialState:{
     profileImg :<img src='https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?k=20&m=1300972574&s=170667a&w=0&h=gqOEm96x85QEVJxkgdwbSpmCG1c6XS_l-9amLtuIjFE=' alt='' className={styles.imge}  /> ,
     profileImgInput :<img src='https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?k=20&m=1300972574&s=170667a&w=0&h=gqOEm96x85QEVJxkgdwbSpmCG1c6XS_l-9amLtuIjFE=' alt=''  id={styless.imge}/>,
     username:'tarek khater',
     email:"@tarekkhater18",
     time: 0,
    },
    reducers:{
        Number:(state , action)=>{ state.number += action.payload},
        

    }
})

export const {Number} = slice.actions;
export default slice.reducer;


