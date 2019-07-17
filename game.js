//variables
var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var lastKnownButtonId = undefined;
var lastKnownButtonNumber = undefined;
var wait = false;
var matches = 0;

//elements
var buttons = document.querySelectorAll("button");

//code
shuffle(numbers);
distributeNumbers();

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (e) {
    var turnable = e.target.dataset.turnable;

    //first click
    if (!wait && lastKnownButtonId == undefined && lastKnownButtonNumber == undefined && turnable == 'true') {
      e.target.dataset.turnable = 'false';

      e.target.innerHTML = getgImage(event.target.dataset.number);
      e.target.style.backgroundColor = 'orange';

      lastKnownButtonId = e.target.id;
      lastKnownButtonNumber = e.target.dataset.number;
    }

    //second click
    else if (!wait && lastKnownButtonId != undefined && lastKnownButtonNumber != undefined && turnable == 'true' && e.target.id != lastKnownButtonId) {
      e.target.dataset.turnable = 'false';

      e.target.innerHTML = getgImage(event.target.dataset.number);

      //match
      if (e.target.dataset.number == lastKnownButtonNumber) {
        e.target.style.backgroundColor = 'green';
        document.getElementById(lastKnownButtonId).style.backgroundColor = 'green';

        lastKnownButtonId = undefined;
        lastKnownButtonNumber = undefined;

        matches++;

        if (matches == 8) {
          showWinScreen();
        }

      }

      //no match
      else {
        document.getElementById(lastKnownButtonId).style.backgroundColor = 'red';
        e.target.style.backgroundColor = 'red';
        wait = true;

        setTimeout(() => {
          e.target.dataset.turnable = 'true';
          e.target.style.backgroundColor = 'white'
          e.target.innerHTML = getgImage(0);


          var tempLastClickedButton = document.getElementById(lastKnownButtonId);

          tempLastClickedButton.dataset.turnable = 'true';
          tempLastClickedButton.style.backgroundColor = 'white';
          tempLastClickedButton.innerHTML = getgImage(0);

          lastKnownButtonId = undefined;
          lastKnownButtonNumber = undefined;
          wait = false;
        }, 1000);


      }
    }

  });
}

// showWinScreen();


//functions
function reset() {
  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;
  wait = false;
  shuffle(numbers);
  distributeNumbers();
  matches = 0;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = getgImage(0);
    buttons[i].style.backgroundColor = 'white';

    document.querySelector('.win-container').style.display = 'none';

    document.getElementById("6").style.display = 'block';
    document.getElementById("7").style.display = 'block';
    document.getElementById("10").style.display = 'block';
    document.getElementById("11").style.display = 'block';

  }
}


function showWinScreen() {
  document.querySelector('.win-container').style.display = 'flex';

  document.getElementById("6").style.display = 'none';
  document.getElementById("7").style.display = 'none';
  document.getElementById("10").style.display = 'none';
  document.getElementById("11").style.display = 'none';


}

function getgImage(number) {
  switch (number) {
    case '1':
      return '<img src="resources/card_1.jpg">';
    case '2':
      return '<img src="resources/card_2.jpg">';
    case '3':
      return '<img src="resources/card_3.jpg">';
    case '4':
      return '<img src="resources/card_4.jpg">';
    case '5':
      return '<img src="resources/card_5.jpg">';
    case '6':
      return '<img src="resources/card_6.jpg">';
    case '7':
      return '<img src="resources/card_7.jpg">';
    case '8':
      return '<img src="resources/card_8.jpg">';
    default:
      return '<img src="resources/card_back.jpg">';

  }
}

function distributeNumbers() {
  for (i = 0; i < buttons.length; i++) {
    buttons[i].dataset.number = numbers[i];
  }
}

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}