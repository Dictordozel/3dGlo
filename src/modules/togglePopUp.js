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

export default togglePopUp;