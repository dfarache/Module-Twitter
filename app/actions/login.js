import { LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESSFULLY, LOGIN_LOGOUT } from '../constants/types';
import { INITIAL_STATE } from '../reducers/login';

export function logginIsLoading(isLoading) {
    return {
        type: LOGIN_ATTEMPT,
        isLoading: isLoading,
        lastError: null
    };
}

export function loginSuccess(userData) {
    return {
        type: LOGIN_SUCCESSFULLY,
        userData,
        lastError: null
    };
}

export function loginFailed(lastError) {
    return {
        type: LOGIN_FAILED,
        lastError,
        hasError: lastError !== undefined
    };
}
