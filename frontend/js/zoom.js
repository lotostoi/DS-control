
let d = document
class Slider {
    constructor(el, back, next) {
        this.el = el;
        this.list = document.querySelectorAll(`${el}`)
        this.back = document.querySelector(`${back}`)
        this.next = document.querySelector(`${next}`)
        this.currentVal = 0
        this.befotVal = this.list.length + 1
        this._handler()
        this._addDataId()
    }
    _handler() {
        document.querySelector('body').addEventListener('click', e => {
            e.preventDefault()
            if (e.target.parentNode.className == this.next.className) {
                if (++this.currentVal > this.list.length - 1) {
                    this.currentVal = 0
                }
                this._next(this.currentVal)
            }
            if (e.target.parentNode.className == this.back.className) {
                if (--this.currentVal < 0) {
                    this.currentVal = this.list.length - 1
                }
                this._back(this.currentVal)
            }
        })

        let start = null, finish = null

        document.querySelector('body').addEventListener('touchstart', (e) => {
            //e.preventDefault()
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }
            start = e;
        })


        document.querySelector('body').addEventListener('touchmove', (e) => {
            // e.preventDefault()
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }

            finish = e
            

        })


        document.querySelector('body').addEventListener("touchend", (e) => {
            e.preventDefault()
            if (e.pointerType == "touch" && !e.isPrimary) {
                return
            }
            console.log(start + " " + finish)
            if (start && finish) {
                if (start.touches[0].pageX < finish.touches[0].pageX) {
                    if (++this.currentVal > this.list.length - 1) {
                        this.currentVal = 0
                    } this._next(this.currentVal)

                } else {
                    if (--this.currentVal < 0) {
                        this.currentVal = this.list.length - 1
                    } this._back(this.currentVal)

                }
            }
            // event = null;
        });
    }

    _addDataId() {
        this.list.forEach((e, i) => {
            e.setAttribute('data-id', i)
        })
    }
    _setZindex() {
        this.list.forEach((e, i) => {
            e.style.zIndex = '10'
            e.classList.remove('right')
            e.classList.remove('left')
        })
    } _next(id) {
        let el = document.querySelector(`div[data-id="${id}"]`)
        this._setZindex()
        el.classList.add('right')
        el.style.zIndex = '30'
    }
    _back(id) {
        let el = document.querySelector(`div[data-id="${id}"]`)
        this._setZindex()
        el.classList.add('left')
        el.style.zIndex = '30'
    }
}



window.onload = () => {

    new Slider('.slide', '.back', '.next')
}