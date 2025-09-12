import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
                                       
//Store Configure
const store = configureStore({
    reducer: {
        users: usersReducer,
    }
})
export default store;