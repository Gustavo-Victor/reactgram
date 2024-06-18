import { resetMessage } from "../slices/photoSlice";

export function useResetComponentMessage(dispatch) {
    return () => {
        setTimeout(() => {
            dispatch(resetMessage()); 
        }, 2000);
    }
}