import { GET_DOGS } from "../actions/index" 


const initialState = {
    dogs:[]
};


function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return action.payload;
    
        default:
            return state;
    }

}

export default rootReducer;