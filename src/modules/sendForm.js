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

export default sendForm;