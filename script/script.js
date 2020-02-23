window.addEventListener('DOMContentLoaded', () => {

'use strict';

// Timer

const countTimer = (deadline) => {

    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {

        let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,

        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
    };

    let idInterval;

    const updateClock = () => {

        let timer = getTimeRemaining();


        if(timer.timeRemaining > 0) {

            timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
         
        } else {
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        }   
        
    };

    idInterval = setInterval(updateClock, 1000);
};

countTimer('23 feb 2020');
//console.log(window);

// Menu

const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        coloseBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
        menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        coloseBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
};

toggleMenu();

const togglePopUp = () => {

    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupCloseBtn = document.querySelector('.popup-close');
    
    const animatePopup = () => {
    const popupContent = document.querySelector('.popup-content');
    popup.style.display = 'block';
    popupContent.style.position = 'relative';

    let top = 100;
    let popupAnim = () => {
    top--;
    popupContent.style.top = top + '%';
    if(top > 10) {
        setTimeout(popupAnim, 0.1);
        }
    };

    let count = 0.1; 
    let popupOpacity = () => {
        count += 0.01;
        popupContent.style.opacity = count;
        if(count <= 1) {
            setTimeout(popupOpacity, 10);
        } 
    };

    popupAnim();
    popupOpacity();
        
    };

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if(window.screen.width >= 768) {
            animatePopup();
            } else {
            popup.style.display = 'block';
            }
        });
        });


    popupCloseBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    });

};

togglePopUp();

});

