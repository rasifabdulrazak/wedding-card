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
});
