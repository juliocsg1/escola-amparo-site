// ============================================
// NAVBAR — glassmorphism ao rolar
// ============================================
(function () {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 70);
    }, { passive: true });
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function () {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    els.forEach(function (el) { obs.observe(el); });
})();

// ============================================
// COUNTER ANIMATION (apenas index.html)
// ============================================
(function () {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1800;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * target);
            if (progress < 1) {
                el.textContent = current >= 1000 ? Math.floor(current / 1000) + 'k' : current;
                requestAnimationFrame(step);
            } else {
                el.textContent = target >= 1000 ? (target / 1000).toFixed(0) + '.000+' : target + '+';
            }
        }

        requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                animateCount(e.target);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { obs.observe(el); });
})();
