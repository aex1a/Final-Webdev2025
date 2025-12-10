document.addEventListener('DOMContentLoaded', () => {
    
    // --- PAGE NAVIGATION (HOME/GALLERY/ETC) ---
    window.navigateTo = (target) => {
        const mainContent = document.getElementById('main-content-wrapper');
        const galleryPage = document.getElementById('project-gallery-page');
        const navLinks = document.querySelectorAll('#navigation li a');
                
        mainContent.classList.remove('hidden');
        galleryPage.classList.remove('active');
        galleryPage.innerHTML = '';
                
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`#navigation li a[href="#${target}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        if (target === 'home') {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
    };
            
    // --- BEFORE / AFTER SLIDER LOGIC ---
    const slider = document.querySelector('.image-slider');
    const beforeImg = document.getElementById('before-img');
    const handle = document.querySelector('.slider-handle');
    
    // Select both labels
    const labelBefore = document.querySelector('.label-before');
    const labelAfter = document.querySelector('.label-after');

    let isDragging = false;

    const updateSlider = (x) => {
        const rect = slider.getBoundingClientRect();
        let width = x - rect.left;

        // Constraint within the box
        width = Math.max(0, Math.min(width, rect.width));

        // Use clip-path for performance
        const insetAmount = rect.width - width;
        beforeImg.style.clipPath = `inset(0 ${insetAmount}px 0 0)`;
        
        // Move the handle
        const percentage = (width / rect.width) * 100;
        handle.style.left = `${percentage}%`;
        handle.setAttribute('aria-valuenow', Math.round(percentage));

        // --- FADE LOGIC FIX ---
        // 1. Fade out "BEFORE" label (Left side) if slider covers it
        if(percentage < 15) {
            labelBefore.style.opacity = '0';
        } else {
            labelBefore.style.opacity = '1';
        }

        // 2. Fade out "AFTER" label (Right side) if slider covers it
        if(percentage > 85) {
            labelAfter.style.opacity = '0';
        } else {
            labelAfter.style.opacity = '1';
        }
    };

    const dragStart = (e) => {
        isDragging = true;
        e.preventDefault();
    };

    const dragEnd = () => {
        isDragging = false;
    };

    const dragMove = (e) => {
        if (!isDragging) return;

        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (clientX !== undefined) {
            updateSlider(clientX);
        }
    };

    // Mouse events
    handle.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', dragMove);

    // Touch events
    handle.addEventListener('touchstart', dragStart);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', dragMove);
            
    // Initialize slider at 50%
    beforeImg.style.clipPath = 'inset(0 50% 0 0)';
    handle.style.left = '50%';

    // --- TABS LOGIC ---
    const bnaNavLinks = document.querySelectorAll('.bna-nav a');
    const afterImg = document.getElementById('after-img');
            
    bnaNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
                    
            // Toggle Active Class
            bnaNavLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
                    
            // Swap Images
            const beforeSrc = link.getAttribute('data-before');
            const afterSrc = link.getAttribute('data-after');
                    
            beforeImg.src = beforeSrc;
            afterImg.src = afterSrc;

            // Reset Slider Position
            beforeImg.style.clipPath = 'inset(0 50% 0 0)';
            handle.style.left = '50%';
            
            // Reset Label Opacity
            labelBefore.style.opacity = '1';
            labelAfter.style.opacity = '1';
        });
    });

    // --- PROJECT GALLERY VIEW LOGIC ---
    window.viewProjectGallery = (projectId) => {
        const mainContent = document.getElementById('main-content-wrapper');
        const galleryPage = document.getElementById('project-gallery-page');
        const template = document.getElementById(`gallery-template-${projectId}`);
            
        if (template) {
            mainContent.classList.add('hidden');
                
            galleryPage.innerHTML = '';
            const content = template.content.cloneNode(true);
            galleryPage.appendChild(content);

            galleryPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            document.querySelectorAll('#navigation li a').forEach(link => link.classList.remove('active'));
            const galleryLink = document.querySelector('#navigation li a[href="#gallery"]');
            if(galleryLink) galleryLink.classList.add('active');
        }
    };

    window.closeProjectGallery = () => {
        const mainContent = document.getElementById('main-content-wrapper');
        const galleryPage = document.getElementById('project-gallery-page');

        galleryPage.classList.remove('active');
        galleryPage.innerHTML = '';

        mainContent.classList.remove('hidden');
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });

        document.querySelectorAll('#navigation li a').forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('#navigation li a[href="#home"]');
        if(homeLink) homeLink.classList.add('active');
    };
});