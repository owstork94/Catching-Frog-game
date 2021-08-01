const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gamescore = document.querySelector('.game__score');
const icon = document.querySelector('.fa-play');

const popUp = document.querySelector('.pop-up');
const popUp_text = document.querySelector('.pop-up__message');
const popUp_Btn = document.querySelector('.pop-up__refresh');

const defaultsize = 90;
const default_count = 10;
const punch_count = 10;

let started = false;
let score = 0;
let timer = undefined;
let GAME_DURATION_TIME = 15;

field.addEventListener('click', onfileldClick);

function onfileldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.default')) {
        target.remove();
        score++;
        updateScroeBoard();
        if (score === default_count) {
            finishGame(true);
        }
    } else if (target.matches('.punch')) {

        finishGame(false);
    }
}
function updateScroeBoard() {
    gamescore.innerHTML = default_count - score;
}
gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})
function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    started = false;
    hideGameButton();
    stopGameTimer();
    showPopupWithText('개굴 개굴 개구ㄹ..찍!');
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopupWithText(win ? '개굴 개굴 개굴(니가 이겼어)' : '퍽퍽! 퍽퍽퍽!(니가 졌어)')
}

popUp_Btn.addEventListener('click', () => {
    score = 0;
    startGame();
    hidePopupWithText();
    showStopButton();
    gameBtn.style.visibility = 'visible';

})

function showPopupWithText(text) {
    popUp.classList.remove('hide');
    popUp_text.innerHTML = `${text}`;
}

function hidePopupWithText() {
    popUp.classList.add('hide');
}


function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}
function showGameButton() {
    gameBtn.style.visibility = 'visible';
}
function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_TIME;
    updateTimeText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(default_count === score);
            return;
        }
        updateTimeText(--remainingTimeSec);
    }, 1000);
}
function updateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconns = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconns}`;
}

function stopGameTimer() {
    clearInterval(timer)
}

function showPlayButton() {
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gamescore.style.visibility = 'visible';
}
function showStopButton() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function initGame() {
    field.innerHTML = '';
    score = 0;
    console.log(fieldRect);
    addItem('default', default_count, 'img/Default.png')
    addItem('punch', punch_count, 'img/Punch.png')
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - defaultsize;
    const y2 = fieldRect.height - defaultsize;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
