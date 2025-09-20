document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O MENU MOBILE ---
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- LÓGICA PARA O HEADER ENCOLHER AO ROLAR A PÁGINA ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // --- LÓGICA PARA ANIMAÇÕES DE "FADE IN" AO ROLAR ---
    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    elementsToFadeIn.forEach(element => {
        observer.observe(element);
    });

    // --- LÓGICA PARA O CARROSSEL DE JOGADORES (COM AUTOPLAY) ---
    const carouselContainer = document.querySelector('.carousel-container');
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let autoSlideInterval;

    if (track && prevBtn && nextBtn && carouselContainer) {
        const slideNext = () => {
            const cardWidth = track.querySelector('.player-card-v2').offsetWidth;
            const scrollAmount = cardWidth + 20;
            if (track.scrollLeft >= (track.scrollWidth - track.clientWidth - 1)) {
                track.scrollLeft = 0;
            } else {
                track.scrollLeft += scrollAmount;
            }
        };
        const startAutoSlide = () => { autoSlideInterval = setInterval(slideNext, 6500); };
        const stopAutoSlide = () => { clearInterval(autoSlideInterval); };
        nextBtn.addEventListener('click', slideNext);
        prevBtn.addEventListener('click', () => {
            const cardWidth = track.querySelector('.player-card-v2').offsetWidth;
            const scrollAmount = cardWidth + 20;
            track.scrollLeft -= scrollAmount;
        });
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        startAutoSlide();
    }

    // --- LÓGICA PARA O LETREIRO DA TORCIDA DINÂMICO ---
    const taglineElement = document.getElementById('tagline');
    
    if (taglineElement) {
        const slogans = [
            "O Leão da Ilha do Retiro",
            "Pelo Sport Tudo!",
            "Cazá! Cazá!",
            "Uma Razão Para Viver"
        ];
        let sloganIndex = 0;

        setInterval(() => {
            taglineElement.style.opacity = 0;
            setTimeout(() => {
                sloganIndex = (sloganIndex + 1) % slogans.length;
                taglineElement.innerText = slogans[sloganIndex];
                taglineElement.style.opacity = 1;
            }, 500); 
        }, 5000); 
    }
});
