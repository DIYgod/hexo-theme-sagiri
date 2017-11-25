// import Typed from 'typed.js';

// var typed = new Typed('.site-title', {
//   strings: [window.CONFIG.site.title],
//   typeSpeed: 70
// });
const gsap = require('gsap');
const TweenLite = gsap.TweenLite;

const animatedText = document.getElementById('animate');
const guideText = document.getElementById('guide');

// select the spans in in the guide
const guideSpans = guideText.getElementsByTagName('span');

// select the spans in in the guide
const animatedSpans = animatedText.getElementsByTagName('span');

const textLength = guideSpans.length;

const placeSpans = () => {
  // for each span in the guide
  for (var i = 0; i < textLength; i++) {
    let guide = guideSpans[i];
    let animated = animatedSpans[i];
    // get the guide client rect
    let rect = guide.getBoundingClientRect();
    // set the left property of the animate
    // span to rect.left
    animated.style.left = rect.left + 'px';
  }
}


const animateLetterIn = (i) => {
  setTimeout(() => {
    TweenLite.fromTo(animatedSpans[i], 0.4, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: Power3.easeOut });
    TweenLite.fromTo(animatedSpans[i], 0.4, { scale: 0 }, { scale: 1, ease: Back.easeOut });
  }, i * 200);

  // if (i === textLength - 1) {
  //   setTimeout(() => {
  //     animateOut();
  //   }, (textLength + 3) * 200);
  // }
}

const animateLetterOut = (i) => {
  setTimeout(() => {
    TweenLite.to(animatedSpans[i], 0.4, { opacity: 0, y: 40, scale: 0, ease: Power3.easeIn });
  }, i * 200);

  if (i === textLength - 1) {
    setTimeout(() => {
      animateIn();
    }, (textLength + 3) * 200);
  }
}

const animateIn = () => {
  for (var i = 0; i < textLength; i++) {
    animateLetterIn(i);
  }
}

const animateOut = () => {
  for (var i = 0; i < textLength; i++) {
    animateLetterOut(i);
  }
}

// just to make sure the text will fit the window width
const resizeText = (text, fontSize) => {
  text.style.fontSize = fontSize + 'px';
  text.style.height = fontSize + 'px';
  text.style.lineHeight = fontSize + 'px';
}

const resize = () => {
  let fontSize = window.innerWidth / 9;
  if (fontSize > 100) fontSize = 100;
  (fontSize * -0.5) + 'px';
  resizeText(animatedText, fontSize);
  resizeText(guideText, fontSize);
  placeSpans();
}

setTimeout(() => {
  resize();
  animateIn();
  window.addEventListener('resize', resize);
}, 100);
