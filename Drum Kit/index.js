
for (var i = 0; i < document.querySelectorAll(".drum").length; i++){
document.querySelectorAll("button")[i].addEventListener("click", function () {

 makeSound(this.innerHTML);

 buttonAnimation(this.innerHTML);

});

}

document.addEventListener("keydown", function (e) {

  makeSound(e.key);

  buttonAnimation(e.key);

});


function makeSound(key) {
  var audio;
   switch(key) {
     case "w": audio = new Audio("sounds/tom-1.mp3");
       break;
     case "a": audio = new Audio("sounds/tom-2.mp3");
       break;
     case "s": audio = new Audio("sounds/tom-3.mp3");
       break;
     case "d": audio = new Audio("sounds/tom-4.mp3");
       break;
     case "j": audio = new Audio("sounds/snare.mp3");
       break;
     case "l": audio = new Audio("sounds/kick-bass.mp3");
       break;
     case "k": audio = new Audio("sounds/crash.mp3");
       break;
   }
  audio.play();
}
function buttonAnimation(key){
  var activeButton = document.querySelector("." + key);
  activeButton.classList.add("pressed");

  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100);


}
