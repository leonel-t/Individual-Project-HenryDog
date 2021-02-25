import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";


export function searchDogs(dog){
    return async function (dispatch) {
        return axios(`http://localhost:3001/dogs?name=${dog}`)
            .then(dogs => {
                dispatch({ type: "GET_DOGS", payload: dogs.data });
            });
    };
}

export function getTemperaments(){
    return async function (dispatch) {
        return axios(`http://localhost:3001/temperament`)
            .then(temp => {
                dispatch({ type: "GET_TEMPERAMENTS", payload: temp.data });
            });
    };
}