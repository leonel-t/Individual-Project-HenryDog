import { GET_DOGS, GET_TEMPERAMENTS } from "../actions/index" 


const initialState = {
    dogs:[],
    temperaments:[]
};


function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {...state, dogs: action.payload}
        case GET_TEMPERAMENTS:
            return {...state, temperaments: action.payload}
        default:
            return state;
    }

}

export default rootReducer;