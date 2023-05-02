import { useContext } from 'react';
import Context from './Context';

export const useFeedContext = () => {
    const [state, dispatch, socket] = useContext(Context);
    return [state, dispatch, socket];
};
