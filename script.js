document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------
  // 1. LIVE CLOCK FUNCTION
  // ------------------------------------------
  function updateTime() {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZoneName: 'short' 
    };
    
    const timeString = now.toLocaleTimeString('en-US', options);
    
    const timeElement = document.getElementById('live-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

  // ------------------------------------------
  // 2. STATS COUNT-UP ANIMATION
  // ------------------------------------------
  function animateCount(id) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const duration = 2000; // 2 seconds
    const start = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1); 
        
        current = progress * target;
        element.textContent = Math.ceil(current);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = target; 
        }
    }

    requestAnimationFrame(step);
  }

  // Start the animation when the page loads
  animateCount('brainrot-count');

  // ------------------------------------------
  // 3. INTERACTIVE GAME TABS FUNCTIONALITY
  // ------------------------------------------
  window.openGame = function(event, gameName) {
    // 1. Hide all tab content
    const tabcontents = document.querySelectorAll(".tab-content");
    tabcontents.forEach(content => content.style.display = "none");

    // 2. Remove 'active' class from all game links (but ignore the 'About Me' link)
    const gameLinks = document.querySelectorAll('.navbar a:not(.right)');
    gameLinks.forEach(link => link.classList.remove('active'));

    // 3. Show the current tab content
    const currentTab = document.getElementById(gameName + "-content");
    if (currentTab) {
        currentTab.style.display = "block";
    }

    // 4. Add 'active' class to the clicked link
    event.currentTarget.classList.add("active");

    // Prevent default anchor jump
    event.preventDefault();
  }
  
  // 4b. Custom function for the 'About Me' link to scroll to the section
  window.showAbout = function(event) {
      event.preventDefault();
      // Scroll smoothly to the 'About Me' section (which is the .side column)
      const aboutSection = document.getElementById('about-me-section');
      if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Optional: Remove active state from game tabs when navigating to about section
      const gameLinks = document.querySelectorAll('.navbar a:not(.right)');
      gameLinks.forEach(link => link.classList.remove('active'));
      event.currentTarget.classList.add('active'); // Keep 'About Me' highlighted
  }


  // ------------------------------------------
  // 4. SMOOTH SCROLL BACK-TO-TOP
  // ------------------------------------------
  const backToTopLink = document.querySelector('.back-to-top');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', function(e) {
      e.preventDefault(); 
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    });
  }
  
  // INITIALIZATION: Ensure Fortnite is shown and active on load
  const initialFortniteLink = document.querySelector('.navbar a[onclick*="fortnite"]');
  const initialFortniteContent = document.getElementById('fortnite-content');
  
  if (initialFortniteLink && initialFortniteContent) {
    // Force set the initial active class and display
    initialFortniteLink.classList.add('active');
    initialFortniteContent.style.display = 'block';
  }
});
