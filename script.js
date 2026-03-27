// ===== Tab Switching =====
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Deactivate all
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Activate clicked
        tab.classList.add('active');
        const target = document.getElementById('tab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
    });
});

// ===== Comparison Tab Switching =====
document.querySelectorAll('.compare-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.compare-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.compare-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const target = document.getElementById('compare-' + tab.dataset.compare);
        if (target) target.classList.add('active');
    });
});

// ===== Card Click → Switch Tab =====
document.querySelectorAll('.card[data-color]').forEach(card => {
    card.addEventListener('click', () => {
        const color = card.dataset.color;
        const tabBtn = document.querySelector(`.tab[data-tab="${color}"]`);
        if (tabBtn) {
            tabBtn.click();
            // Scroll to detail section
            document.querySelector('.detail-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    card.style.cursor = 'pointer';
});

// ===== Intersection Observer for Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .detail-card, .rec-card, .compare-chart, .stain-compare, .carrier-compare, .water-impact-card, .water-data-card, .water-actions-card, .cause-card, .trouble-scenario, .trouble-summary-card, .cl-method, .cl-root-cause, .cl-plan-card, .cl-trend-card, .cl-compare-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.4s ease, box-shadow 0.4s ease';
    observer.observe(el);
});

// ===== Stain bar animation on scroll =====
const stainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.stain-bar');
            bars.forEach((bar, i) => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, i * 150);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stain-bars').forEach(el => {
    stainObserver.observe(el);
});

// ===== Smooth color dot clicks =====
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        document.querySelector('.summary-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('dianix-theme');

// Apply saved theme on load
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('dianix-theme', isLight ? 'light' : 'dark');
});

// ===== PDF Export for Chloride Section =====
function exportChloridePDF() {
    const btn = document.getElementById('clPdfBtn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ กำลัง Export...'; }
    document.body.classList.add('pdf-exporting');
    setTimeout(() => {
        window.print();
        document.body.classList.remove('pdf-exporting');
        if (btn) { btn.disabled = false; btn.innerHTML = '<span class="cl-pdf-icon">📄</span> Export PDF'; }
    }, 300);
}
