
import { LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESSFULLY, LOGIN_LOGOUT } from '../constants/types';

export const INITIAL_STATE = {
    userData: {},
    isLoading: false,
    isLogged: false,
    lastError: false,
    hasError: false,
    token: undefined,
    resetNavigation: undefined
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case LOGIN_SUCCESSFULLY:
            return {
                ...state,
                userData: action.userData,
                isLogged: true
            };
        case LOGIN_FAILED:
            return {
                ...state,
                lastError: action.lastError,
                hasError: action.hasError
            };
        case LOGIN_ATTEMPT:
            return {
                ...state,
                isLoading: action.isLoading,
                isLogged: false
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                hasError: false,
                isLogged: false
            };
        default:
            return state;
    }
}
