


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

const slider = Vue.component('slider', {
    template: `
    <div class="oneOfMulti" >
            <div class="slideMulti" :class="addClass(i)" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight"
                v-for="(img,i) in pictures" v-touch:swipe.bottom="fullScreenOn">
                <img v-if="(img.teg == 'img')" :src="img.link" alt="img">
                <video v-if="(img.teg == 'video')" :src="img.link" :ref="img.name">
                    <source :src="img.link">
                </video>
            </div>
    </div>
    `,
    data() {
        return {
            currentSlide: 0,
            oldSlide: 0,
            dairection: 'none',
        }
    },

    props: {
        pictures: {
            type: Array,
            required: true
        }
    },
    methods: {
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
            this.dairection = 'left'
            this.currentSlide = --this.currentSlide < 0 ? this.pictures.length - 1 : this.currentSlide
            this.oldSlide = this.currentSlide != this.pictures.length - 1 ? this.currentSlide + 1 : 0

        },
        swipeRight() {

            this.dairection = 'right'
            this.currentSlide = ++this.currentSlide > this.pictures.length - 1 ? 0 : this.currentSlide
            this.oldSlide = this.currentSlide != 0 ? this.currentSlide - 1 : this.pictures.length - 1

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






new Vue({
    el: '#slider',
    components: { slider },
    data: {
        socket: io.connect(),
        /* 
                currentSlide: 0,
                oldSlide: 0, */
        /*   dairection: 'none', */
        path: '',
        id: '',
        isControl: false,
        access: true,
        screen: 'user',
        error: false,
        sliders: [],
        index: 0,
        oldIndex: 0,
        pictures: [],
    },

    beforeMount() {
        this.screen = this.$el.dataset.screen

        console.log(this.screen)
        this.isControl = /сontrol/.test(this.$el.dataset.name)
    },

    mounted() {

        if (!this.isControl && this.$el.dataset.link !== "/getData{link}") {
            let link = '/getData/' + this.$el.dataset.link.replace('/', '_')

            console.log(link)

            return fetch(link, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => data.json())
                .then(data => {
                    if (!data.error) {


                        this.sliders = data.map((sl, i) => { return { pictures: sl, show: false, id: 'id'+i } })

                        this.sliders[0].show = true

                        this.getPictures([...this.sliders[this.index].pictures])

                        this.eventsSoketIo()

                    } else {
                        this.error = true
                    }

                })
        }

    },
    methods: {

        getPictures(arr) {

            arr.forEach(e => e.vudeo = e.teg == 'video' ? true : false)

            this.pictures = arr

        },

        eventsSoketIo() {


            this.socket.on('touchLeftServer', (data) => {

                this.index = --this.index < 0 ? this.sliders.length - 1 : this.index
                this.oldndex = this.index != this.sliders.length - 1 ? this.index + 1 : 0

     
            })

            this.socket.on('touchRightServer', (data) => {

                this.index = ++this.index > this.sliders.length - 1 ? 0 : this.index
                this.oldSlide = this.index != 0 ? this.index - 1 : this.sliders.length - 1

      
            })
        },
        fullScreenOn() {
            toggleFullScreen()
        }

    },
    computed: {

    },
    watch: {
        index() {

            this.sliders.forEach((s, i) => {

                if (i === this.index) {

                    s.show = true

                } else {
                    s.show = false
                }


            })



        }
    }


})