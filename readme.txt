var revapi = revapi42
var sliderId = '4'

var ioScript = document.createElement('script')
ioScript.src = 'https://dscontrol.org/socket.io/socket.io.js'
ioScript.onload = function () {
  var socket = io('https://dscontrol.org')
  var maxSlide = revapi.revmaxslide()
  var ioEvtFired = false
  var revEvtCount = 0
  
  function ioEvtHandle(data) {
    if (revEvtCount > 0) {
      --revEvtCount
      return false
    }
    if (data == sliderId) {
      ioEvtFired = true
      return true
    }
  }
  socket.on('touchLeftServer', function (data) {
    if (ioEvtHandle(data)) {
      revapi.revnext()
    }
  })
  socket.on('touchRightServer', function (data) {
    if (ioEvtHandle(data)) {
      revapi.revprev()
    }
  })
  
  revapi.bind("revolution.slide.onchange", function (e, data) {
    if (ioEvtFired) {
      ioEvtFired = false
      return
    }
    if (!data.prevSlideIndex) {
      return
    }
    
    var diff = data.slideIndex - data.prevSlideIndex
    if (data.slideIndex === 1 && data.prevSlideIndex === maxSlide) {
      diff = 1
    }
    if (data.slideIndex === maxSlide && data.prevSlideIndex === 1) {
      diff = -1
    }
    
    var evtName = diff < 0 ? 'touchRight' : 'touchLeft'
    diff = Math.abs(diff)
    for (var i = 0; i < diff; ++i) {
      ++revEvtCount
      socket.emit(evtName, sliderId)
    }
  });
}
document.body.appendChild(ioScript)



sudo docker restart ds3097 

lotostoi
Dns2IetxavuYVCQ

https://dscontrol.org/tp/multi1


https://controlds.net/apps/files/?dir=/&fileid=6
