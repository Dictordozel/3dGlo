const validCalcValue = () => {
    const number = document.querySelectorAll('.calc-block [type = "text"]');

    number.forEach(item => {
        item.addEventListener('input', function() {
            this.value = this.value.replace(/\D/, '');
        });
    });
};

export default validCalcValue;