//@format

function maybeScheduleClose(closable, timeout) {
  if (Number.isFinite(timeout)) {
    window.setTimeout(() => closable.close(), timeout);
  }
}

const SUPPORTS_NOTIFICATIONS = !('Notification' in window);
function notify(title, opts, timeout) {
  opts = opts || {};
  opts.icon = opts.icon || './img/car.png';

  if (SUPPORTS_NOTIFICATIONS) {
    console.log('This browser does not support system notifications');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, opts);
    maybeScheduleClose(notification, timeout);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      if (permission === 'granted') {
        const notification = new Notification(title, opts);
        maybeScheduleClose(notification, timeout);
      }
    });
  }
}

export {notify};
