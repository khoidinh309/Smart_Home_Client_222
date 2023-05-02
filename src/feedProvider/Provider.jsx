import { useReducer } from 'react';
import Context from './Context';
import reducer, { initState } from './reducer';
import socket from './socket';

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    return <Context.Provider value={[state, dispatch, socket]}>{children}</Context.Provider>;
}

export default Provider;
