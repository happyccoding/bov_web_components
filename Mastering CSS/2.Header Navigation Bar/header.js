(function(window) {  
    var topnavMenus = document.getElementsByClassName("topnav__menu");
    var contents = document.getElementsByClassName("content-panel__content");
    
    for (i=0; i<topnavMenus.length; i++) {
        topnavMenus[i].addEventListener("click", function (event) {
            openContent(event.target.innerText.toLowerCase());
            this.classList.add("active");
        });
    }

    
    function openContent(id) {
        for (i=0; i<topnavMenus.length; i++) {
            topnavMenus[i].classList.remove("active");
        }

        for (i=0; i<contents.length; i++) {
           contents[i].classList.remove("hidden");
            if (id !== contents[i].id) {
                contents[i].classList.add("hidden");
            }
        }
    }
  })()