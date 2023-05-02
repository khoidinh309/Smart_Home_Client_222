import constants from './Contants';
import socket from './socket';

const initState = {
    ledStatus: false,
    fanStatus: false,
    lockStatus: false,
    showModal: false,
    temp: 0,
    humi: 0,
};

const reducer = function (state, action) {
    switch (action.type) {
        case constants.SET_LED:
            return {
                ...state,
                ledStatus: action.payload,
            };
        case constants.SET_FAN:
            return {
                ...state,
                fanStatus: action.payload,
            };
        case constants.SET_LOCK:
            return {
                ...state,
                lockStatus: action.payload,
            };
        case constants.SET_MODAL:
            return {
                ...state,
                showModal: action.payload,
            };
        case constants.SET_TEMP:
            return {
                ...state,
                temp: action.payload,
            };
        case constants.SET_HUMI:
            return {
                ...state,
                humi: action.payload,
            };

        default:
            throw new Error('Invalid action type');
    }
};

export { initState };
export default reducer;
