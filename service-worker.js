'use strict';

var timeoutId = null;

self.addEventListener('message', function(event){
  if (event.data.stop){
    clearTimeout(timeoutId);
    timeoutId = null;
    return;
  }

  var intervalSec = event.data.newIntervalSec;
  console.log('New interval in second: ', intervalSec);
  if (timeoutId){
    clearTimeout(timeoutId);
  }
  timeoutId = keepNotifying(intervalSec);
});

function keepNotifying(intervalSec){
  return setInterval(notify, intervalSec);
}

function notify(){
  if (Notification.permission === 'granted'){
    self.registration.showNotification('Notified from a ServiceWorker!',
      { tag: 'sample' }
    );
  } else if (Notification.permission === 'default'){
    console.warn('The user has not granted nor denied yet! Reload!');
  } else {
    console.warn('The user has denied notification!');
  }
}
