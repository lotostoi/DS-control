


function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}



new Vue({
    el: '#slider',
    data: {
        socket: io.connect(),
        pictures: [],
        currentSlide: 0,
        oldSlide: 0,
        dairection: 'none',
        path: '',
        id: '',
        isControl: false,
        access: true,
        screen: 'user'

    },

    beforeMount() {
        this.screen = this.$el.dataset.screen

        console.log(this.screen)
        this.isControl = /Control/.test(this.$el.dataset.name)
    },

    mounted() {

        if (!this.isControl) {
            this.getImg((e) => {
                this.getData(e)
                    .then(data => {
                        this.pictures = data
                        this.pictures.forEach(e => e.vudeo = e.teg == 'video' ? true : false)
                    })

            })
        }

        this.id = this.$el.dataset.id
        this.eventsSoketIo()

    },
    methods: {
        getImg(f) {
            this.path = '/getData' + this.$el.dataset.link
            console.log(this.path)
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

            if (this.screen !== 'nocontrol') {
                this.socket.emit('touchLeft', this.id)
            } else {
                this.dairection = 'left'
                this.currentSlide = --this.currentSlide < 0 ? this.pictures.length - 1 : this.currentSlide
                this.oldSlide = this.currentSlide != this.pictures.length - 1 ? this.currentSlide + 1 : 0
            }
        },
        swipeRight() {
            if (this.screen !== 'nocontrol') {
                this.socket.emit('touchRight', this.id)
            } else {
                this.dairection = 'right'
                this.currentSlide = ++this.currentSlide > this.pictures.length - 1 ? 0 : this.currentSlide
                this.oldSlide = this.currentSlide != 0 ? this.currentSlide - 1 : this.pictures.length - 1
            }

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

                if (data != this.id || this.isControl || this.screen === 'nocontrol') return false

                this.dairection = 'left'
                this.currentSlide = --this.currentSlide < 0 ? this.pictures.length - 1 : this.currentSlide
                this.oldSlide = this.currentSlide != this.pictures.length - 1 ? this.currentSlide + 1 : 0
            })

            this.socket.on('touchRightServer', (data) => {

                if (data != this.id || this.isControl || this.screen === 'nocontrol') return false

                this.dairection = 'right'
                this.currentSlide = ++this.currentSlide > this.pictures.length - 1 ? 0 : this.currentSlide
                this.oldSlide = this.currentSlide != 0 ? this.currentSlide - 1 : this.pictures.length - 1
            })
        },
        fullScreenOn() {
            toggleFullScreen()
        }

    },
    watch: {
        currentSlide() {
            let el = this.pictures[this.currentSlide]
            if (el.vudeo) {
                let video = this.$refs[el.name][0]
                video.play()
                video.volume = 0
                let chengVolume = setInterval(() => {
                    video.volume += 0.03
                    if (video.volume > 0.95) {
                        clearInterval(chengVolume)
                    }
                }, 500)
            }
        },
        oldSlide() {
            let el = this.pictures[this.oldSlide]
            if (el.vudeo) {
                this.$refs[el.name][0].pause()
            }

        },


    }

})