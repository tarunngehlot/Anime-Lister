const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");

//END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 2000,
  triggerElement: intro,
  triggerHook: 0
})
  .setPin(intro)
  .addTo(controller);

//TextAnimation
const textAnim = TweenMax.fromTo(text,3,{css:{color:"white",opacity:1}},{css:{color:"red",opacity:0}});

let scene2 = new ScrollMagic.Scene({
  duration:3000,
  triggerElement: intro,
  triggerHook: 0
}).setTween(textAnim)
.addTo(controller);


let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e=>{
  scrollpos = e.scrollPos/1000;
});

setInterval(()=>{
  delay+=(scrollpos - delay)*accelamount;
  video.currentTime = delay;
}, 33.3);


$(window).on('scroll',function(){
  if($(window).scrollTop()){
    $('nav').addClass('black');
  }
  else{
    $('nav').removeClass('black');
  }
})
