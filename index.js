'strict mode';

const inputDay = document.querySelector('.input-day');
const inputMonth = document.querySelector('.input-months');
const inputYear = document.querySelector('.input-year');

const inputHours = document.querySelector('.input-hours');
const inputMinutes = document.querySelector('.input-minutes');
const inputSec = document.querySelector('.input-seconds');

const btn = document.querySelector('.btn');

btn.addEventListener('click', function () {
    const dateNow = Date.now();
    const inputDate = new Date(
        inputYear.value,
        inputMonth.value - 1,
        inputDay.value,
        inputHours.value,
        inputMinutes.value,
        inputSec.value
    ).getTime();

    const period = inputDate - dateNow;

    let days = Math.floor(period / (1000 * 60 * 60 * 24));
    let hours = Math.floor((period % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((period % (1000 * 60)) / 1000);

    document.querySelector('.result-days').textContent = days;
    document.querySelector('.result-hours').textContent = hours;
    document.querySelector('.result-minutes').textContent = minutes;
    document.querySelector('.result-sec').textContent = seconds;
});
