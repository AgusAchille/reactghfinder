import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types'

export default function AlertState (props) {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    function setAlert(message, type) {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })

        setTimeout(removeAlert, 3000);
    }

    function removeAlert(){
        dispatch({ type: REMOVE_ALERT });
    }

    return (
        <AlertContext.Provider
            value = {{
                alert: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};