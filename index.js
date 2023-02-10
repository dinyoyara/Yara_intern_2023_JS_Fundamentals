'strict mode';

const mainMessage = document.querySelector('.main-message');
const inputForm = document.querySelector('.input-forms');

const inputDay = document.querySelector('.input-day');
const inputMonth = document.querySelector('.input-months');
const inputYear = document.querySelector('.input-year');
const inputHours = document.querySelector('.input-hours');
const inputMinutes = document.querySelector('.input-minutes');
const inputSec = document.querySelector('.input-seconds');

const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');

const resultConteiner = document.querySelector('.result-boxes-container');

const resultDays = document.querySelector('.result-days');
const resultHours = document.querySelector('.result-hours');
const resultMinutes = document.querySelector('.result-minutes');
const resultSeconds = document.querySelector('.result-sec');

const message = document.querySelector('.message');
const bomb = document.querySelector('.bomb');
const dateNow = document.querySelector('.time-now');

const timePeriod = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
};
const currentDate = {
    day: 0,
    month: 0,
    yaer: 0
};

let setIntervalNumber;

//Initial default states
const getCurrentDate = () => {
    const dateNow = new Date();
    currentDate.day = dateNow.getDate();
    currentDate.month = dateNow.getMonth();
    currentDate.yaer = dateNow.getFullYear();

    return currentDate;
};

const showCurrentDate = () => {
    const { day, month, yaer } = getCurrentDate();
    inputDay.value = day;
    inputMonth.value = month + 1;
    inputYear.value = yaer;
    inputHours.value = '00';
    inputMinutes.value = '00';
    inputSec.value = '00';
};
showCurrentDate();

const generateDateNowString = (date) => {
    return `${date.getDate()} ${getMonthsByIndex(date.getMonth() + 1)} ${date.getFullYear()} - ${getTwoDigitsValue(
        date.getHours()
    )}:${getTwoDigitsValue(date.getMinutes())}:${getTwoDigitsValue(date.getSeconds())}`;
};

setInterval(() => {
    dateNow.textContent = generateDateNowString(new Date());
}, 1000);

//Work with Inputs
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
    console.log(period);
    if (period < 1000) {
        console.log('💣');
        finish();
    }

    timePeriod.days = Math.floor(period / (1000 * 60 * 60 * 24));
    timePeriod.hours = Math.floor((period % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timePeriod.minutes = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
    timePeriod.seconds = Math.floor((period % (1000 * 60)) / 1000);

    return timePeriod;
};

const setDaysValue = (days) => {
    if (days.toString().length > 6) {
        days = 'millions';
    }
    return days;
};

const showTimePeriod = (inputDate) => {
    const { days, hours, minutes, seconds } = getTimePeriod(inputDate);

    resultDays.textContent = setDaysValue(days);
    resultHours.textContent = hours;
    resultMinutes.textContent = minutes;
    resultSeconds.textContent = seconds;
};

const setMainMessage = () => {
    const months = getMonthsByIndex(inputMonth.value);
    const hour = getTwoDigitsValue(inputHours.value);
    const minutes = getTwoDigitsValue(inputMinutes.value);
    const sec = getTwoDigitsValue(inputSec.value);
    mainMessage.querySelector(
        '.text'
    ).textContent = `⏳ ${inputDay.value} ${months} ${inputYear.value} - ${hour}:${minutes}:${sec}`;
};

const counting = (inputDate) => setInterval(showTimePeriod.bind(null, inputDate), 1000);

//Change elements visibility
const changeVisibility = (element) => {
    element.classList.toggle('hidden');
};

const switchButtons = () => {
    changeVisibility(btnStart);
    changeVisibility(btnReset);
};

const switchInputFormsAndMainMessage = () => {
    changeVisibility(inputForm);
    changeVisibility(mainMessage);
};

const showMessage = (messageText) => {
    message.querySelector('.text').textContent = messageText;
    changeVisibility(message);
};

//Helpers
const getMonthsByIndex = (ind) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[ind - 1];
};

const getTwoDigitsValue = (value) => {
    return value.toString().length == 1 ? `0${value}` : value;
};

//Chek inputs value
const getMaxDayByMonth = (monthIndex) => {
    let maxDays = 31;
    switch (monthIndex) {
        case '2':
            maxDays = 28;
            break;
        case ('4', '6', '9', '11'):
            maxDays = 30;
            break;
    }
    return maxDays;
};

const isInputDayCorrect = (day, monthIndex) => {
    const maxDayValue = getMaxDayByMonth(monthIndex);
    return Number(day) >= 1 && Number(day) <= maxDayValue ? true : false;
};

const isInputDateCorrect = () => {
    const validDay = isInputDayCorrect(inputDay.value, inputMonth.value);
    const validHours = Number(inputHours.value) >= 0 && Number(inputHours.value) <= 23;
    const validMinutes = Number(inputMinutes.value) >= 0 && Number(inputMinutes.value) <= 59;
    const validSeconds = Number(inputSec.value) >= 0 && Number(inputSec.value) <= 59;
    return validDay && validHours && validMinutes && validSeconds ? true : false;
};

//Finish counting
const finish = () => {
    changeVisibility(bomb);
    changeVisibility(resultConteiner);
    clearInterval(setIntervalNumber);
    setTimeout(() => {
        showCurrentDate();
        switchInputFormsAndMainMessage();
        switchButtons();
        changeVisibility(bomb);
    }, 1500);
};

//Events
btnStart.addEventListener('click', () => {
    const inputDate = getInputDate();
    if (!isInputDateCorrect()) {
        showMessage('This Date/Time might exist only in a parallel universe 👽');
        return;
    }
    if (getPeriod(inputDate) <= 0) {
        showMessage('Forget about the past, you can`t change it! ❌');
        return;
    }
    showTimePeriod(inputDate);
    setIntervalNumber = counting(inputDate);
    changeVisibility(resultConteiner);
    setMainMessage();
    switchInputFormsAndMainMessage();
    switchButtons();
});

btnReset.addEventListener('click', () => {
    changeVisibility(resultConteiner);
    clearInterval(setIntervalNumber);
    showCurrentDate();
    switchInputFormsAndMainMessage();
    switchButtons();
});

inputForm.addEventListener('change', (e) => {
    if (!e.target.classList.contains('input')) return;
    message.classList.contains('hidden') == false && changeVisibility(message);
});
