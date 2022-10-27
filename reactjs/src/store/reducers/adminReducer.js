import actionTypes from '../actions/actionTypes';
import { getAllcodeService } from '../../services/userService';

const initialState = {
    genders: [],
    roloes: [],
    positions: []
}

const adminReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionTypes.FETCH_GENDER_START:
            console.log('hoidanit fire fetch gender start', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            console.log('hoidanit fire fetch gender SS', copyState)

            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('hoidanit fire fetch gender FA', action)
            return {
                ...state
            }


        default:
            return state;
    }
}

export default adminReducer;