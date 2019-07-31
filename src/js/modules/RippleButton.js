class RippleButton{
    constructor(){
       this.buttons = document.querySelectorAll('.innerRipple');
       this.events();
    }
    
    events(){
        const btnArray = Array.prototype.slice.call(this.buttons);   
        console.log(btnArray);
        btnArray.forEach((b) => {
            b.addEventListener('click', this.createRipple);
        })    
    }
    
    createRipple(e) {
        console.log(e, this)
        const btn = this;
        const circle = document.createElement('div');
        btn.appendChild(circle);
    
        let d = Math.max(btn.clientWidth, btn.clientHeight);
        circle.style.width = circle.style.height = d + 'px';
    
        let rect = btn.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left -d/2 + 'px';
        circle.style.top = e.clientY - rect.top - d/2 + 'px';
        circle.classList.add('ripple') 
    }
}
 
export default RippleButton;
