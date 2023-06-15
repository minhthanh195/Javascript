const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navList = document.querySelectorAll(".nav-item")
// Control Navigation Animation
function navAnimation(direc1,direc2) {
    navList.forEach((nav,i)=>{
        nav.classList.replace(`slide-${direc1}-${i+1}`,`slide-${direc2}-${i+1}`)
    })
}
function toggleNav(){
    // toggle: menu bars open/ closed
    menuBars.classList.toggle('change');
    // toggle: Menu Active
    overlay.classList.toggle('overlay-active');
    if( overlay.classList.contains('overlay-active')){
        // animate in - overlay
        overlay.classList.replace('overlay-slide-left','overlay-slide-right')
        // animate in - nav items
        navAnimation('out','in')
    }else{
        // animate out - overlay
        overlay.classList.replace('overlay-slide-right','overlay-slide-left')
        // animate out - nav items
        navAnimation('in','out')
    }
}
// Event Listeners
menuBars.addEventListener('click',toggleNav);
navList.forEach((nav)=>{
    nav.addEventListener('click',toggleNav)
})