// Add your javascript here
function loadCard(label, time) {
  const wrapper = document.getElementById('timerList');
  
  const cardWrap = document.createElement('div');
  cardWrap.className = "box";
  
  const cardLabelElt = document.createElement('div');
  cardLabelElt.innerText = label;
  
  const cardTimeElt = document.createElement('div');
  cardTimeElt.innerText = time;

  cardWrap.appendChild(cardLabelElt);
  cardWrap.appendChild(cardTimeElt);
  wrapper.appendChild(cardWrap);
}

function showTimer(label) {
  const popupBox = document.getElementById('popup');
  popupBox.classList.remove('dn');
  const labelElt = document.getElementById('labelHeader');
  labelElt.innerText = label;
  const snoozeElt = document.getElementById('snooze');
  snoozeElt.setAttribute('data-name', label);
}

function snooze(event) {
  const label = event.target.dataset.name;
  const showAlert = showTimer.bind(this, label);
  const popupBox = document.getElementById('popup');
  popupBox.classList.add('dn');
  setTimeout(showAlert, 2000);
}
function dismiss() {
  const popupBox = document.getElementById('popup');
  popupBox.classList.add('dn');
}

function addTimer() {
  const labelElt = document.getElementById('label');
  const label = labelElt.value;
  labelElt.value = '';
  
  const timeElt = document.getElementById('time');
  const time = timeElt.value;
  timeElt.value = '';
  let timeInMilli = 0;
  if (time.indexOf('h') > -1) {
      timeInMilli = parseInt(time.substring(0, time.length - 1), 10) * 60 * 60 * 1000;
  } else  if (time.indexOf('m') > -1) {
      timeInMilli = parseInt(time.substring(0, time.length - 1), 10) * 60 * 1000;
  } else  if (time.indexOf('s') > -1) {
      timeInMilli = parseInt(time.substring(0, time.length - 1), 10) * 1000;
  }
  loadCard(label, time);
  const showAlert = showTimer.bind(this, label);
  setTimeout(showAlert, timeInMilli);
}