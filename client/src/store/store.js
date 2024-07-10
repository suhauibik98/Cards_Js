import {configureStore} from "@reduxjs/toolkit"
import { userSlice  }  from "../store/slice/userSlice"
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi, useLoginMutation } from "./apis/AuthApi";

export const store = configureStore({
    reducer: {
        user : userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),

})
setupListeners(store.dispatch)

export {
    useLoginMutation,
    
}