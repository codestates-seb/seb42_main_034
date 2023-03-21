import { AppDispatch } from "../redux/store";
import { enqueueNotification, dequeueNotification } from "../redux/notifiCation";
import { getNotificationPayload } from "./notifiPayload";

export const notifi = (dispatch: AppDispatch, message: string) => {
    const payload = getNotificationPayload(message);
    dispatch(enqueueNotification(payload));

    setTimeout(() => {
        dispatch(dequeueNotification());
    }, payload.dismissTime)
}