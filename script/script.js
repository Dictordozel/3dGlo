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

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('active-menu');
    });
    menu.addEventListener('click', (event) => {
        let target = event.target;
        if(target.matches('.close-btn') || target.closest('ul>li')) {
        menu.classList.toggle('active-menu');
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
    top -= 2;
    popupContent.style.top = top + '%';
    if(top > 10) {
        requestAnimationFrame(popupAnim);
        }
    };
    requestAnimationFrame(popupAnim);

    let count = 0.1; 
    let popupOpacity = () => {
        count += 0.01;
        popupContent.style.opacity = count;
        if(count <= 1) {
        requestAnimationFrame(popupOpacity);
        } 
    };
    requestAnimationFrame(popupOpacity);

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

// Slider

const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content'),
    portfolioDots = document.querySelector('.portfolio-dots');
    let dot;

    let currentSlide = 0,
    interval;


    const addDots = () => {
        for(let i = 0; i < slide.length; i++) {
            let dots = document.createElement('li');
            dots.classList.add('dot');
            portfolioDots.appendChild(dots);
            }
            dot = document.querySelectorAll('.dot');
            dot[0].classList.add(('dot-active'));
        };

    addDots();


    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlider = () => {

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if(currentSlide >= slide.length) {
            currentSlide = 0; 
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlider, time);

    };

    const stopSlide = () => {
        clearInterval(interval);
    };


    slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if(!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) {
            currentSlide++;
        } else if(target.matches('#arrow-left')) {
            currentSlide--;
        } else if(target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if(elem === target) {
                    currentSlide = index;
                }
            });
        }

        if(currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if(currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if(event.target.matches('.portfolio-btn, .dot')) {
            stopSlide();
            console.log(event.target);
            }
    });
        

    slider.addEventListener('mouseout', (event) => {
        if(event.target.matches('.portfolio-btn, .dot')) {
            startSlide();
            console.log(event.target);
        }  
    });

    

        startSlide(1500);
    };

slider();

});

