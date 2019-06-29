// Add your javascript here
function loadCard(label, time) {
  const wrapper = document.getElementById('timerList');
  
  const cardWrap = document.createElement('li');
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
  let backDrop = document.getElementById('backDrop');
  if (!backDrop) {
    const wrapper = document.getElementById('timerList');
    const backDropElt = document.createElement('div');
    backDropElt.id = 'backDrop';
    backDropElt.className = 'popup box w100';
    wrapper.parentNode.appendChild(backDropElt);
    backDrop = backDropElt;

  }
  const popup = document.createElement('div');
  popup.id = label;
  popup.className = 'box whiteBg middle';
  popup.innerHTML = `<div class="padB10">${label}</div>
                    <button type="button" id="snooze" class="btn greenBg white" onclick="snooze(event)" data-name=${label}>Snooze</button>
                    <button type="button" id="dismiss" class="btn redBg white" onclick="dismiss(event)" data-name=${label}>Done</button> `;
  backDrop.appendChild(popup);
}

function snooze(event) {
  dismiss(event);
  const label = event.target.dataset.name;
  const showAlert = showTimer.bind(this, label);
  setTimeout(showAlert, 2000);
}

function dismiss(event) {
  const backDropElt = document.getElementById('backDrop');
  if (backDropElt.childNodes.length === 1) {
    backDropElt.parentNode.removeChild(backDropElt);
  } else {
    const targetNode = document.getElementById(event.target.dataset.name);
    targetNode.parentNode.removeChild(targetNode);
  }
}

function addTimer() {
  const labelElt = document.getElementById('timerName');
  const label = labelElt.value;
  
  const timeElt = document.getElementById('time');
  const time = timeElt.value;

  if (label.trim() === '' || time.trim() === '') {
    return null;
  }
  //Reset
  labelElt.value = '';
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