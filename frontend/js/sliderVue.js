
new Vue({
    el: '#slider',
    data: {
        socket: io.connect(),
        pictures: [],
        currentSlide: 0,
        oldSlide: 0,
        dairection: 'none',
        path: '',
        id: ''
    },
    created() {

    },
    mounted() {
        this.getImg((e) => {
            this.getData(e, 'POST')
                .then(data => this.pictures = data)
        })
        this.id = this.$el.dataset.id
        this.eventsSoketIo()
    },
    methods: {
        getImg(f) {
            this.path = '/' + this.$el.dataset.name
            console.log('/' + this.$el.dataset.name)
            f(this.path)
        },
        addClass(i) {
            if (this.dairection == 'left') {
                if (i == this.currentSlide) {
                    return 'comeRight'
                } else if (i == this.oldSlide) {
                    return 'leaveRight'
                } else {
                    return ''
                }

            } else if (this.dairection == 'right') {
                if (i == this.currentSlide) {
                    return 'comeLeft'
                } else if (i == this.oldSlide) {
                    return 'leaveLeft'
                } else {
                    return ''
                }

            } else {
                if (i == this.currentSlide) { return 'first' } else { return '' }
            }

        },
        swipeLeft() {
            this.socket.emit('touchLeft', this.id)
        },
        swipeRight() {
            this.socket.emit('touchRight',  this.id)
        },
        getData(url, type) {
            return fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => data.json())

        },
        eventsSoketIo() {

            this.socket.on('touchLeftServer', (data) => {
                if (data!=this.id) return false
                this.dairection = 'left'
                this.currentSlide = --this.currentSlide < 0 ? this.pictures.length - 1 : this.currentSlide
                this.oldSlide = this.currentSlide != this.pictures.length - 1 ? this.currentSlide + 1 : 0
            })

            this.socket.on('touchRightServer', (data) => {
                if (data!=this.id) return false
                this.dairection = 'right'
                this.currentSlide = ++this.currentSlide > this.pictures.length - 1 ? 0 : this.currentSlide
                this.oldSlide = this.currentSlide != 0 ? this.currentSlide - 1 : this.pictures.length - 1
            })


        }
    }

})