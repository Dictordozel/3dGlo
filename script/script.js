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
    
    // Menu
    
    const toggleMenu = () => {
    
        const menu = document.querySelector('menu');
    
        document.body.addEventListener('click', (event) => {
            let target = event.target;
            if(target && target.closest('.menu')){
            menu.classList.add('active-menu');
            } else if(target.tagName === 'A' || !target.classList.contains('active-menu')) {
                menu.classList.remove('active-menu');
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
            }
        });
            
    
        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }  
        });
    
        
    
            startSlide(1500);
        };
    
    slider();
    
    
    
    // Command
    
        const command = () => {
    
            const img = document.querySelectorAll('.command__photo');
            img.forEach((elem) => {
                let tmp;
                elem.addEventListener('mouseover', (event) => {
                    tmp = event.target.src;
                    event.target.src = event.target.dataset.img;        
                    });
    
                elem.addEventListener('mouseout', (event) => {
                    event.target.src = tmp;
                });
    
            });
    };
    
    command();
    
    const validCalcValue = () => {
        const number = document.querySelectorAll('.calc-block [type = "text"]');
    
        number.forEach(item => {
            item.addEventListener('input', function() {
                this.value = this.value.replace(/\D/, '');
            });
        });
    };
    
    validCalcValue();
    
    // Калькулятор
    
    const calc = (price = 100) => {
    
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');
    
            const countSum = () => {
                let total = 0,
                countValue = 1,
                dayValue = 1;
                
                const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
                
                if(calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                } else if (calcCount.value === '0') {
                    countValue = 0;
                }
                if (calcDay.value === '0') {
                    dayValue = 0;
                } else if(calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }
                
                if(typeValue && squareValue) {
                    total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
                } 
                
                totalValue.textContent = total;
            };
    
            calcBlock.addEventListener('change', (event) => {
            const target = event.target;
    
            if(target.matches('input') || target.matches('select')) {
                countSum();
            }
    
            });   
    };
    
    calc(100);
    
    // Send-ajax-form
    
    const sendForm = () => {
    
        const errorMessage = 'Что-то пошло не так!',
            loadMessage = 'Загрузка...',
            successeMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
        const allForms = document.querySelectorAll('form');
        
        
        const validForms = () => {
    
            const formPhone = document.querySelectorAll('.form-phone'),
            userMessage = document.querySelectorAll('.mess'),
            userForm = document.querySelectorAll('form [type="text"]');
    
            formPhone.forEach(elem => {
                elem.addEventListener('input', () => {
                    elem.value = elem.value.replace(/[^)(0-9\+\-]/g, '');    
                    });
                });
    
            userMessage.forEach(elem => {
                elem.addEventListener('input', () => {
                    elem.value = elem.value.replace(/[^?!\-,.а-яА-ЯёЁ\s]+$/g, '');
                    });
                });
    
            userForm.forEach(elem => {
                elem.addEventListener('input', () => {
                    elem.value = elem.value.replace(/[^?!\-,.а-яА-ЯёЁ\s]+$/g, '');                     
                    });
                });
        };
    
        validForms();
    
        const resetForms = () => {
            const formInputs = document.querySelectorAll('input');    
            formInputs.forEach((elem) => {
                elem.value = '';
            });   
        };

        const postData = (formData) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        };
                 
        const statusMessage = document.createElement('div');
            statusMessage.style.cssText = 'font-size: 2rem;';
            statusMessage.style.color = "#fff";
    
    allForms.forEach((elem) => {
        elem.addEventListener('submit', (event) => {
            event.preventDefault();
    
            elem.appendChild(statusMessage);
            setTimeout(() => {
            statusMessage.remove();
            }, 3000);
            
            const formData = new FormData(elem);
            let body = {};
    
            formData.forEach((val, key) => {
                body[key] = val;
            });
          
            statusMessage.textContent = loadMessage;

            postData(body)
            .then((response) => {
                if(response.status !== 200) { 
                throw new Error('Status network: ' + response.status);
                }
                statusMessage.textContent = successeMessage;
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
                      
            resetForms();
            
        });
    
    });
    
    };
    
    sendForm();
    
    
    
    
    
    
    
    
    });