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
export default command;