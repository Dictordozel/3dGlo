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
    menu = document.querySelector('menu');

    btnMenu.addEventListener('click', () =>{
        menu.classList.toggle('active-menu');
    });
    menu.addEventListener('click', (event) => {
        let target = event.target;
        if(target.matches('.close-btn')) {
        menu.classList.toggle('active-menu');
        } else {
            target = target.closest('ul>li');
            if(target) {
            menu.classList.toggle('active-menu');
            } 
        }
    });
};

toggleMenu();

const togglePopUp = () => {

    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn');
    
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

    popup.addEventListener('click', (event) => {
        let target = event.target;
        if(target.matches('.popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if(!target) {
                popup.style.display = 'none';
            }

        }
        
    });

};

togglePopUp();

// Tabs

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
        for(let i = 0; i < tabContent.length; i++) {
            if(index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tabContent[i].classList.add('d-none');
                tab[i].classList.remove('active');
            }
        }
    };

    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');
        if(target) {
            tab.forEach((item, i) => {
                if(item === target) {
                    toggleTabContent(i);
                    }
             });    
        }
    });
};

tabs();

});

