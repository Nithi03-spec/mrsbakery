let images = [
      "images/vanilla_cake.jpg", 
      "images/vannila tress.jpeg", 
      "images/white_forest_cake.jpg", 
      "images/red_velvet_cake.jpg"
    ];
    let slideindex = 0;

    function changeSlide(direction) {
      slideindex += direction;
      
      if (slideindex >= images.length) slideindex = 0;
      if (slideindex < 0) slideindex = images.length - 1;

      document.getElementById("slide-image").src = images[slideindex];
    }

    