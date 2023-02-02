import { API,ChannelId } from "./env.js";
(function($) {
  "use strict";
  
 // menu 
  $('.siteBar-btn').click( function (){ 
    $('.mobile-menu').toggleClass('siteBar');   
  }); 

  // show notification
  function ShowNotif() { 
    const TOAST_ME = document.getElementById("notif"); 
    if (TOAST_ME) { 
        TOAST_ME.addEventListener("click", () => { 
            Toastinette.init({
                position: 'top-center',
                title: 'Success',
                message: 'Yes your action is successfull',
                type: 'success',
                autoClose: false,
                // autoClose: 4000,
                progress: true, 
            }); 
        });
    } 
  }
  ShowNotif()

  // owlCarousel
  function Sliders() { 
    if (document.querySelectorAll('.bonusSlider').length > 0) { 
      $(".bonusSlider").owlCarousel({
        loop: true,
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        autoplayTimeout: 5000,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        nav: false,
        dots: true,
      }); 
    }

  }
  Sliders()

  // Fetch data form youtube
  function FetcingVideos() { 
 
    const MaxResult = 12;
    const CaroselLimites = 3;
    const CacheTime = 1; // Hours

    async function Videos() {   
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?order=date&part=id%2Csnippet&channelId=${ChannelId}&type=video&maxResults=${MaxResult}&key=${API}`);
        let data = await res.json()
  
        if (data.items.length > 0) { 
          const setItems = {esTime:new Date().getTime(),items:[...data.items]} 
          localStorage.setItem('vdos',JSON.stringify(setItems))
          ShowDatasByCaching(setItems)
  
        } 
    } 

    
    async function ShowDatasByCaching(data) { 
      let findDiv = document.querySelector('.guid_video')
      // Showing contents in carousel & activing the carousel
        function showCarousels() {
            for (let index = 0; index < CaroselLimites; index++) {
                let div = document.createElement('DIV');
                div.classList.add('guid_item');
                div.innerHTML = ` 
                            <div class="gi_img">
                                <a href="https://youtube.com/watch?v=${data.items[index].id.videoId}" target="_blank">
                                    <img src="${data.items[index].snippet.thumbnails.high.url}" alt=""> 
                                    <img src="assets/img/guids/play_blue.png" alt="" class="play_icon play_blue">
                                    <img src="assets/img/guids/play_yellow.png" alt="" class="play_icon play_yellow">
                                </a>
                                <b>${data.items[index].snippet.title}</b>
                            </div>
                            `;
                findDiv.appendChild(div)
            }
        }
        await showCarousels();  
        await findDiv.classList.add('owl-carousel') 
        function activatedSlider() {

            if (document.querySelectorAll('.guid_video').length > 0) { 
                $(".guid_video").owlCarousel({
                    loop: true,
                    items: 3,
                    active:true,
                    center:true,
                    // autoplay: true,
                    smartSpeed: 1000,
                    autoplayTimeout: 5000,
                    navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>'
                    ],
                    nav: false,
                    dots: true,
                    responsive : {
                        // breakpoint from 0 up
                        0 : {
                            items: 1,
                        }, 
                        // breakpoint from 768 up
                        768 : {
                            items: 3,
                        }
                    }
                });
            }
        }
        await activatedSlider();

        // Showing 12 videos bellow
        function ShowLasts() {
            data.items.forEach(item => {
                let findDiv = document.querySelector('.showTheVideos')
                let div = document.createElement('DIV');
                div.classList.add('col-lg-4');
                div.classList.add('col-md-6');
                div.setAttribute('data-aos','zoom-out')
                div.innerHTML = ` 
                            <div class="vdo_blk">
                                <a href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                    <img src="${item.snippet.thumbnails.high.url}" alt="">
                                    <b>${item.snippet.title}</b>
                                </a>
                            </div>
                            `;
                findDiv.appendChild(div)
            });
        }
        ShowLasts()
    }

    if (document.querySelectorAll('.guid_video').length > 0 && document.querySelectorAll('.showTheVideos').length > 0) {

      if (!localStorage.getItem('vdos')) { 
        Videos()
      }else if(localStorage.getItem('vdos')){
        let datas = JSON.parse(localStorage.getItem('vdos'))
        let Ntm  = (new Date().getTime() - datas.esTime) / 1000 / 60 / 60; 
        
        if (Ntm <= CacheTime) {
          console.log('1',Ntm)
          ShowDatasByCaching(datas)
        }else{
          console.log('2',Ntm)
          localStorage.removeItem('vdos')
          Videos()
        } 
      }
 
 
    }
  }
  FetcingVideos()
 

  function ShowingDetailtext() { 
      if (document.querySelectorAll('.q_a_btn').length > 0) { 
          let Btns = document.querySelectorAll('.q_a_btn') 
          Btns.forEach(btn => {
              btn.addEventListener('click', (e) => { 
                  let btnM = btn.parentElement.parentElement.classList.toggle('show_detail')
              })
          }); 
      }
  }

  ShowingDetailtext()
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    //anchorPlacement: 'top-bottom',  defines which position of the element regarding to window should trigger the animation
  
  });

 
})(jQuery);
