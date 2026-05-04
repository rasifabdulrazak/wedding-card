// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Countdown Timer ---
    const countdownDate = new Date("Jul 11, 2026 11:30:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<p class='wedding-date'>The Big Day is Here!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    };

    // Initial call and interval
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- 2. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.section-reveal, .slide-up');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. Audio Toggle ---
    const audioBtn = document.getElementById('audio-toggle');
    const bgAudio = document.getElementById('bg-audio');
    const audioIcon = audioBtn.querySelector('i');
    let isPlaying = false;

    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            audioIcon.classList.remove('fa-pause');
            audioIcon.classList.add('fa-music');
            audioBtn.classList.remove('playing');
        } else {
            bgAudio.play().catch(error => console.log("Audio playback failed:", error));
            audioIcon.classList.remove('fa-music');
            audioIcon.classList.add('fa-pause');
            audioBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // --- 4. Floating Particles (Canvas) ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1; // Size between 1 and 6
            this.speedX = Math.random() * 1 - 0.5; // -0.5 to 0.5
            this.speedY = Math.random() * 1 + 0.5; // Falling down 0.5 to 1.5
            // Soft gold/cream colors
            this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wobble effect
            this.x += Math.sin(this.y * 0.05) * 0.5;

            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particlesArray = [];
        const numberOfParticles = Math.min(window.innerWidth / 10, 100); // Max 100 particles
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();

    // --- 5. Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 6. Language Toggle (English/Malayalam) ---
    const translations = {
        nav_home: { en: "Home", ml: "പ്രധാന താൾ" },
        nav_events: { en: "Events", ml: "പരിപാടികൾ" },
        nav_location: { en: "Location", ml: "വേദികൾ" },
        rasif: { en: "Rasif", ml: "റസിഫ്" },
        ragda: { en: "Ragda", ml: "റഗ്‌ദ" },
        subtitle: { en: "Together with their families, invite you to celebrate their wedding", ml: "ഞങ്ങളുടെ കുടുംബത്തോടൊപ്പം, ഈ വിവാഹ ആഘോഷത്തിലേക്ക് നിങ്ങളെ ഹൃദയപൂർവ്വം ക്ഷണിക്കുന്നു" },
        groom_parents: { en: "S/O Abdul Razak & Rahina", ml: "മകൻ: അബ്ദുൽ റസാഖ് & റഹീന" },
        bride_parents: { en: "D/O Abdulla Saeed & Sajida", ml: "മകൾ: അബ്ദുള്ള സയീദ് & സാജിദ" },
        save_date: { en: "Save the Date", ml: "തീയതി ഓർക്കുക" },
        days: { en: "Days", ml: "ദിവസങ്ങൾ" },
        hours: { en: "Hours", ml: "മണിക്കൂറുകൾ" },
        mins: { en: "Mins", ml: "മിനിറ്റുകൾ" },
        secs: { en: "Secs", ml: "സെക്കൻഡുകൾ" },
        date_full: { en: "July 11, 2026", ml: "ജൂലൈ 11, 2026" },
        quote: { en: '"And We created you in pairs"', ml: '"നിങ്ങളെ നാം ഇണകളായി സൃഷ്ടിച്ചു"' },
        quote_ref: { en: "— Quran 78:8", ml: "— ഖുർആൻ 78:8" },
        nikkah_title: { en: "Nikkah", ml: "നിക്കാഹ്" },
        nikkah_time: { en: "11:30 AM", ml: "രാവിലെ 11:30" },
        kp_lounge: { en: "KP Lounge", ml: "കെ.പി ലോഞ്ച്" },
        kondotty_address: { en: "Kondotty, Malappuram, Kerala", ml: "കൊണ്ടോട്ടി, മലപ്പുറം, കേരളം" },
        view_location: { en: "View Location", ml: "സ്ഥലം കാണുക" },
        reception_title: { en: "Reception", ml: "സൽക്കാരം" },
        reception_time: { en: "4:00 PM onwards", ml: "വൈകുന്നേരം 4:00 മുതൽ" },
        palace_auditorium: { en: "PALACE AUDITORIUM", ml: "പാലസ് ഓഡിറ്റോറിയം" },
        event_locations: { en: "Event Locations", ml: "വേദികൾ" },
        nikkah_venue: { en: "Nikkah Venue", ml: "നിക്കാഹ് വേദി" },
        reception_venue: { en: "Reception Venue", ml: "സൽക്കാര വേദി" },
        closing_msg: { en: "We request the honor of your presence and prayers on our special day.", ml: "ഞങ്ങളുടെ ഈ സുദിനത്തിൽ നിങ്ങളുടെ സാന്നിധ്യവും പ്രാർത്ഥനയും പ്രതീക്ഷിക്കുന്നു." }
    };

    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'en';

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ml' : 'en';
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[key] && translations[key][lang]) {
                el.innerText = translations[key][lang];
            }
        });
        
        if (langToggleBtn) {
            langToggleBtn.innerText = lang === 'ml' ? "En" : "മ";
        }
    }
});
