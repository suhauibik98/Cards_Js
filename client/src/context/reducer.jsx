import { SHOWNAV , FETCH } from "./actions";

const reducer =(state,action)=>{
    switch(action.type){
        case SHOWNAV:
     return {...state,show : !state.show};

     case FETCH:
        return {...state , userSlice :action.payload }
     default: return state
    }
}

export default reducer