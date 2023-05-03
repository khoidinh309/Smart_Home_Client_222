import constants from './Contants';

const initState = {
    ledStatus: 0,
    fanStatus: 0,
    lockStatus: false,
    scheduleStatus: localStorage.getItem('scheduleStatus') ? JSON.parse(localStorage.getItem('scheduleStatus')) : false,
    showModal: false,
    temp: 0,
    humi: 0,
};

const reducer = function (state, action) {
    switch (action.type) {
        case constants.SET_LED:
            const ledValue = action.payload === true ? 1 : action.payload === false ? 0 : action.payload;
            return {
                ...state,
                ledStatus: ledValue,
            };
        case constants.SET_FAN:
            const fanValue = action.payload === true ? 1 : action.payload === false ? 0 : action.payload;
            return {
                ...state,
                fanStatus: fanValue,
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
        case constants.SET_SCHEDULE:
            localStorage.setItem('scheduleStatus', JSON.stringify(action.payload));
            return {
                ...state,
                scheduleStatus: action.payload,
            };

        default:
            throw new Error('Invalid action type');
    }
};

export { initState };
export default reducer;
