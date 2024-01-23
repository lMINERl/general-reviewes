import { createEffect, createSignal, mergeProps } from "solid-js";
import { useSelector } from "../Store";
import { setUserNotification } from "../Store/Thunk/UserThunk";

const defaultNotificationOptions: NotificationOptions = {
  body: "",
  icon: "",
};
const useNotification = () => {
  const notificationPermission = useSelector(
    (s) => s.user.notificationPermission,
  );

  createEffect(() => {
    if (!window.Notification) {
      // TODO: notification is not supported
    }
    if (
      notificationPermission() == "default" ||
      notificationPermission() == "denied"
    ) {
      Notification.requestPermission().then(function (permission) {
        setUserNotification(permission);
      });
    }
  });

  const makeNotification = <T extends (...args: any) => void>(
    title: string,
    options: NotificationOptions,
    callback?: T,
  ) => {
    const op = mergeProps(defaultNotificationOptions, options);
    const notification = new Notification(title, op);
    notification.onclick = () => {
      if (!callback) {
        notification.close();
        window.parent.focus();
        return;
      }
      callback(notification);
    };
  };

  return { notificationPermission, makeNotification };
};

export default useNotification;
