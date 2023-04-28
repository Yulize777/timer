const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    let intervalId = null;
    let remainingTime = 0;

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    const tick = () => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            intervalId = null;
        }
        timerEl.textContent = formatTime(remainingTime);
    };

    return (seconds) => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        remainingTime = seconds;
        timerEl.textContent = formatTime(remainingTime);
        intervalId = setInterval(tick, 1000);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
    inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
});


buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});
