

window.onload = () => {
    let socket = io.connect();

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
            //  socket = socket

        }
        _handler() {
            document.documentElement.addEventListener('click', e => {
                e.preventDefault()
                this.befoVal = this.currentVal
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

                socket.emit('touchstart_soket', { x: e.touches[0].pageX })
            })

            socket.on('touchstart_soket_server', (data) => {
                start = data.data.x
                console.log(data.data.x)

            })


            document.documentElement.addEventListener('touchmove', (e) => {

                if (e.pointerType == "touch" && !e.isPrimary) {
                    return
                }

                socket.emit('touchmove_soket', { x: e.touches[0].pageX })

                //  finish = e
            })

            socket.on('touchmove_soket_server', (data) => {

                finish = data.data.x

                console.log(data.data.x)

            })


            document.documentElement.addEventListener("touchend", (e) => {

                if (e.pointerType == "touch" && !e.isPrimary) {
                    return
                }

                socket.emit('touchend_soket')

            });

            socket.on('touchend_soket_server', ()=>{
                if (start && finish) {
                    this.befoVal = this.currentVal
                    if (start < finish) {

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
            })
        }

        _addDataId() {
            this.list.forEach((e, i) => {
                e.setAttribute('data-id', i)
            })
        }
        _slide(cl) {


            d.querySelector(`div[data-id="${this.currentVal}"]`).classList.add(cl)
            setTimeout(() => {
                d.querySelector(`div[data-id="${this.befoVal}"]`).classList.remove('right')
                d.querySelector(`div[data-id="${this.befoVal}"]`).classList.remove('left')

            }, 1)


        }

    }


    new Slider('.slide', '.back', '.next')
}