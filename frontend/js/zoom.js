
let d = document
class Slider {
    constructor(el, back, next) {
        this.el = el;
        this.list = document.querySelectorAll(`${el}`)
        this.back = document.querySelector(`${back}`)
        this.next = document.querySelector(`${next}`)
        this.currentVal = 0
        this.befoVal = 0
        this.cl_right = 'right'
        this.cl_left = 'left'
        this._handler()
        this._addDataId()
        
    }
    _handler() {
        document.documentElement.addEventListener('click', e => {
            e.preventDefault()
            this.befoVal=this.currentVal
            if (e.target.parentNode.className == this.next.className) {
                if (++this.currentVal > this.list.length - 1) {
                    this.currentVal = 0      
                } 

                this._slide(this.cl_right)
            }
            if (e.target.parentNode.className == this.back.className) {
                if (--this.currentVal < 0) {
                    this.currentVal = this.list.length - 1
                } 
                this._slide(this.cl_left)

            }
        })

        let start = null, finish = null

        document.documentElement.addEventListener('touchstart', (e) => {
           
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }
            start = e;
        })


        document.documentElement.addEventListener('touchmove', (e) => {
            
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }

            finish = e


        })


        document.documentElement.addEventListener("touchend", (e) => {
         
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }
        
            if (start && finish) {
                this.befoVal=this.currentVal
                if (start.touches[0].pageX < finish.touches[0].pageX) {
                   
                    if (++this.currentVal > this.list.length - 1) {
                        this.currentVal = 0      
                    } 
    
                    this._slide(this.cl_right)

                } else {
                    if (--this.currentVal < 0) {
                        this.currentVal = this.list.length - 1
                    } 
                    this._slide(this.cl_left)

                }
            }
            
        });
    }

    _addDataId() {
        this.list.forEach((e, i) => {
            e.setAttribute('data-id', i)
        })
    }
    _slide(cl) {
  
      
        d.querySelector(`div[data-id="${this.currentVal}"]`).classList.add(cl)
         setTimeout(()=>{
            d.querySelector(`div[data-id="${this.befoVal}"]`).classList.remove('right')
            d.querySelector(`div[data-id="${this.befoVal}"]`).classList.remove('left')
         
        }, 1)  
       

    }

}



window.onload = () => {

    new Slider('.slide', '.back', '.next')
}