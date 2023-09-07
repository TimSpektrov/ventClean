// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'
document.addEventListener('DOMContentLoaded', () => {
    let workWithSwiper = null;
    let whySwiper = null;
    let reviewsSwiper = null;

    function mobileSliderEvent() {
        if (window.innerWidth < 768) {
            if(!workWithSwiper) {
                workWithSwiper = new Swiper('.work-with__swiper', {
                    loop: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    pagination: {
                        el: '.work-with__swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.work-with__swiper-button-next',
                        prevEl: '.work-with__swiper-button-prev',
                    },
                })
            }

            if(!whySwiper) {
                whySwiper = new Swiper('.why__swiper', {
                    loop: true,
                    spaceBetween: 30,

                    pagination: {
                        el: '.why__swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.why__swiper-button-next',
                        prevEl: '.why__swiper-button-prev',
                    },
                })
            }
            if(!reviewsSwiper) {
                reviewsSwiper = new Swiper('.reviews__swiper', {
                    loop: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    pagination: {
                        el: '.reviews__swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.reviews__swiper-button-next',
                        prevEl: '.reviews__swiper-button-prev',
                    },
                })
            }

        }


        if (window.innerWidth >= 768) {
            if(workWithSwiper) {
                workWithSwiper.destroy()
                workWithSwiper = null
            }
            if(whySwiper) {
                whySwiper.destroy()
                whySwiper = null
            }

            if(reviewsSwiper) {
                reviewsSwiper.destroy()
                reviewsSwiper = null
            }

        }


        let clientsSwiper  = new Swiper('.clients__swiper', {
                loop: true,
                pagination: {
                    el: '.clients__swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.clients__swiper-button-next',
                    prevEl: '.clients__swiper-button-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        centeredSlides: false,
                        spaceBetween: 20,
                    },
                    1024: {

                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    1400: {

                        slidesPerView: 7,
                        spaceBetween: 20,
                    },
                    1800: {

                        slidesPerView: 9,
                        spaceBetween: 20,
                    },
                    1900: {

                        slidesPerView: 10,
                        spaceBetween: 20,
                    },
                },
            })

        let stagesSwiper = new Swiper('.stages__swiper', {
            pagination: {
                el: '.stages__swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.stages__swiper-button-next',
                prevEl: '.stages__swiper-button-prev',
            },
            breakpoints: {
                320: {
                    // loop: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                550: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        })
    }
    mobileSliderEvent();

    window.addEventListener('resize', () => {
        mobileSliderEvent();
    });








})