'strict mode';

const inputDay = document.querySelector('.input-day');
const inputMonth = document.querySelector('.input-months');
const inputYear = document.querySelector('.input-year');

const inputHours = document.querySelector('.input-hours');
const inputMinutes = document.querySelector('.input-minutes');
const inputSec = document.querySelector('.input-seconds');

const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');

const resultConteiner = document.querySelector('.result-boxes-container');

const timePeriod = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
};
let setIntervalNumber;

const getInputDate = () =>
    new Date(
        inputYear.value,
        inputMonth.value - 1,
        inputDay.value,
        inputHours.value,
        inputMinutes.value,
        inputSec.value
    ).getTime();

const getPeriod = (inputDate) => {
    const dateNow = Date.now();
    const period = inputDate - dateNow;
    return period;
};

const getTimePeriod = (inputDate) => {
    const period = getPeriod(inputDate);

    timePeriod.days = Math.floor(period / (1000 * 60 * 60 * 24));
    timePeriod.hours = Math.floor((period % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timePeriod.minutes = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
    timePeriod.seconds = Math.floor((period % (1000 * 60)) / 1000);

    return timePeriod;
};
const showTimePeriod = (inputDate) => {
    const { days, hours, minutes, seconds } = getTimePeriod(inputDate);

    document.querySelector('.result-days').textContent = days;
    document.querySelector('.result-hours').textContent = hours;
    document.querySelector('.result-minutes').textContent = minutes;
    document.querySelector('.result-sec').textContent = seconds;
};

const counting = (inputDate) => setInterval(showTimePeriod.bind(null, inputDate), 1000);

const changeVisibility = (element) => {
    element.classList.toggle('hidden');
};

const switchButtons = () => {
    changeVisibility(btnStart);
    changeVisibility(btnReset);
};

btnStart.addEventListener('click', function () {
    const inputDate = getInputDate();
    showTimePeriod(inputDate);
    setIntervalNumber = counting(inputDate);
    changeVisibility(resultConteiner);
    switchButtons();
});

btnReset.addEventListener('click', function () {
    changeVisibility(resultConteiner);
    clearInterval(setIntervalNumber);
    switchButtons();
});
