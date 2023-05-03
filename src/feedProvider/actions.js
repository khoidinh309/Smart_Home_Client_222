import constants from './Contants';

export const setLedStatus = (payload) => ({
    type: constants.SET_LED,
    payload,
});

export const setFanStatus = (payload) => ({
    type: constants.SET_FAN,
    payload,
});

export const setLockStatus = (payload) => ({
    type: constants.SET_LOCK,
    payload,
});

export const setShowModal = (payload) => ({
    type: constants.SET_MODAL,
    payload,
});

export const setTempValue = (payload) => ({
    type: constants.SET_TEMP,
    payload,
});

export const setHumiValue = (payload) => ({
    type: constants.SET_HUMI,
    payload,
});

export const setScheduleStatus = (payload) => ({
    type: constants.SET_SCHEDULE,
    payload,
});
