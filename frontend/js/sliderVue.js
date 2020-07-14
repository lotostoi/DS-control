


new Vue({
    el: '#slider',
    data: {
        soket: io.connect(),
        pictures: [],
        currentSlide: 0,
        oldSlide: 0,
        dairection: 'none'
    },
    created() {
        this.getData('/getImg', 'POST')
            .then(data => this.pictures = data)
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
            console.log(this.currentSlide + "  " + this.oldSlide)
        },
        swipeRight() {
            this.dairection = 'right'
            this.currentSlide = ++this.currentSlide > this.pictures.length - 1 ? 0 : this.currentSlide
            this.oldSlide = this.currentSlide != 0 ? this.currentSlide - 1 : this.pictures.length - 1
        },
        getData(url, type) {
            return fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => data.json())
            
        }
    }

})