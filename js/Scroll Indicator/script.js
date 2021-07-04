let scrollInd = document.querySelector('.indicator-scrill');
let centerScreen = window.innerHeight / 2,
    fullHeight = document.body.clientHeight;

window.addEventListener('scroll', scr => {  
    // coorect value of height
    sizeOffestCorrect = window.pageYOffset / (fullHeight - window.innerHeight) * 100;
    
    // get size correct
    edit = window.innerHeight / fullHeight * sizeOffestCorrect;
  
    // set width
    scrollInd.style.width = window.pageYOffset / fullHeight * 100 + edit + '%'
})
   