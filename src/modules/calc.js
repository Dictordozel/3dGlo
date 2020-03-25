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

export default calc;