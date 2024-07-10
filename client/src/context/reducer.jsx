import { SHOWNAV, FETCH, LOGOUT ,SETCARDS} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SHOWNAV:
      return { ...state, show: !state.show };

    case FETCH:
      return {
        ...state,
        userSlice: { user:action.payload.user, token: action.payload.token },
      };
    case SETCARDS:
      return {
        ...state,
        cards:[...state.cards,action.payload],
      };
    case LOGOUT:
      return { ...state, userSlice: { user: null, token: null } };
    default:
      return state;
  }
};

export default reducer;
