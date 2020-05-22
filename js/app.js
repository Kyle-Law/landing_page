const sliderSections = document.querySelectorAll('section');

function addList() {
  const ul = document.querySelector('ul');
  const title = ['Home', 'Section 1','Section 2','Section 3','Section 4'];

  for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(title[i]));
    li.setAttribute("class", "section_nav");
    ul.appendChild(li);
  }
}

addList()

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

function scrollToSection() {
  navLists[0].addEventListener("click", ()=> {
    window.scrollTo(0, 0);
  })
  for (let i = 1; i < navLists.length;i++) {
    navLists[i].addEventListener("click",()=>{
        sliderSections[i-1].scrollIntoView();

        setTimeout(()=>window.scrollTo(0, window.pageYOffset+1),400)
    })
  }
}

scrollToSection()