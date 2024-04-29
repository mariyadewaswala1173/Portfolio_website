// header start
// const header = document.querySelector("header");
// window.addEventListener("scroll", function () {
//    header.classList.toggle("sticky", window.scrollY > 80)
// });
// header end 

// typewriting effect start
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 8);
      this.type();
      this.isDeleting = false;
    }

    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];

      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      // change color for data-text
      this.txtElement.innerHTML = `<span class="txt" style="color: ffffff;">${this.txt}</span>`;

      // Initial Type Speed
      let typeSpeed = 100;

      if(this.isDeleting) {
        typeSpeed /= 2;
      }

      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 300;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);

  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
// typewriting effect end


// counter start

// Function to start counting when the element is in the viewport
function startCounterWhenVisible(element, callback) {
  var options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.7 // Trigger when 50% of the element is visible
  };

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        callback(); // Call the provided callback when the element is visible
        observer.unobserve(entry.target); // Stop observing once the callback is triggered
      }
    });
  }, options);

  observer.observe(element);
}

// Counter function
function runCounter() {
  $('.counting').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');

    $({ countNum: $this.text() }).animate({
      countNum: countTo
    },

    {
      duration: 4000,
      easing: 'linear',
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
      }
    });
  });
}
// Call the startCounterWhenVisible function with the section as the element and runCounter as the callback
startCounterWhenVisible(document.getElementById('counter-stats'), runCounter);
//counter end


