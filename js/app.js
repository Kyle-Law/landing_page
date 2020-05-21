const sliderSections = document.querySelectorAll('section')

const navLists = document.querySelectorAll('.section_nav')

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}


function checkSlide() {
    sliderSections.forEach(sliderSection => {
      // half way through the section
      const slideInAt = (window.scrollY + window.innerHeight) - sliderSection.offsetHeight / 2;
      // bottom of the section
      const sectionBottom = sliderSection.offsetTop + sliderSection.offsetHeight;
      const isHalfShown = slideInAt > sliderSection.offsetTop;
      const isNotScrolledPast = window.scrollY < sectionBottom -200;
      if (isHalfShown && isNotScrolledPast) {
        sliderSection.classList.add('your-active-class');
      } else {
        sliderSection.classList.remove('your-active-class');
      }
    });
  }

window.addEventListener("scroll",debounce(checkSlide));

for (let i = 0; i < navLists.length;i++) {
    navLists[i].addEventListener("click",()=>{
        setTimeout(()=>window.scrollTo(0, window.pageYOffset+1),400)
    })
}

