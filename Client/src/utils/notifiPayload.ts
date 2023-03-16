export const getNotificationPayload = (message: string) => {
    const uuid = Math.random();
    const dismissTime = 2000;
    return {uuid, dismissTime, message};
;}