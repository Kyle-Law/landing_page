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
    sliderSections.forEach((sliderSection,index) => {
      // half way through the section
      const slideInAt = (window.scrollY + window.innerHeight) - sliderSection.offsetHeight / 2;
      // bottom of the section
      const sectionBottom = sliderSection.offsetTop + sliderSection.offsetHeight;
      const isHalfShown = slideInAt > sliderSection.offsetTop;
      const isNotScrolledPast = window.scrollY < sectionBottom -200;
      const isTop = window.scrollY < 219;
      if (isHalfShown && isNotScrolledPast) {
        sliderSection.classList.add('your-active-class');
        navLists[index+1].classList.add('li_active');
      } else {
        sliderSection.classList.remove('your-active-class');
        navLists[index+1].classList.remove('li_active');
      }
      if (isTop) {
        navLists[0].classList.add('li_active');
      } else {
        navLists[0].classList.remove('li_active');
      }
    });
  }

// window.addEventListener("scroll",()=>{
//   window.scrollY==0 ? navLists[0].classList.add("li_active") : navLists[0].classList.remove("li_active");
//   debounce(checkSlide);

// });
window.addEventListener("scroll",debounce(checkSlide));


function scrollToSection() {
  navLists[0].addEventListener("click", ()=> {
    window.scrollTo(0, 0);
    setTimeout(()=>window.scrollTo(0, window.pageYOffset+1),700)
  })
  for (let i = 1; i < navLists.length;i++) {
    navLists[i].addEventListener("click",()=>{
        sliderSections[i-1].scrollIntoView({behavior: "smooth"});

        setTimeout(()=>window.scrollTo(0, window.pageYOffset+1),700)
    })
  }
}

scrollToSection()