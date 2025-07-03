// Main JavaScript for the blog

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const docEl = document.documentElement;

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = docEl.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                docEl.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                docEl.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Reading progress indicator (for post pages)
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    if (document.querySelector('.post-content')) {
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }



    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Table of contents generation (disabled)
    // const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    // if (headings.length > 3) {
    //     const toc = document.createElement('div');
    //     toc.className = 'table-of-contents';
    //     toc.innerHTML = '<h4>목차</h4><ul></ul>';
    //     
    //     const tocList = toc.querySelector('ul');
    //     
    //     headings.forEach((heading, index) => {
    //         // Add ID to heading if it doesn't have one
    //         if (!heading.id) {
    //             heading.id = `heading-${index}`;
    //         }
    //         
    //         const li = document.createElement('li');
    //         const a = document.createElement('a');
    //         a.href = `#${heading.id}`;
    //         a.textContent = heading.textContent;
    //         a.className = heading.tagName.toLowerCase();
    //         
    //         li.appendChild(a);
    //         tocList.appendChild(li);
    //     });
    //     
    //     // Insert TOC after the first paragraph
    //     const firstParagraph = document.querySelector('.post-content p');
    //     if (firstParagraph) {
    //         firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    //     }
    // }

    // Search functionality (if search input exists)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(query) || excerpt.includes(query)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Project tabs functionality
    const projectTabButtons = document.querySelectorAll('.tab-button');
    const projectTabContents = document.querySelectorAll('.tab-content');

    if (projectTabButtons.length > 0) {
        projectTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all buttons and contents
                projectTabButtons.forEach(btn => btn.classList.remove('active'));
                projectTabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.tab-content[data-category="${category}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Add animation effect
                    const projectCards = targetContent.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    }

    // Archive tabs functionality
    const archiveTabButtons = document.querySelectorAll('.archive-tab-button');
    const archiveTabContents = document.querySelectorAll('.archive-tab-content');

    if (archiveTabButtons.length > 0) {
        archiveTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all buttons and contents
                archiveTabButtons.forEach(btn => btn.classList.remove('active'));
                archiveTabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.archive-tab-content[data-category="${category}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Add animation to elements when they come into view
    const animateElements = document.querySelectorAll('.post-card, .hero');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => animationObserver.observe(el));
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .table-of-contents {
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        margin: var(--spacing-xl) 0;
        border-left: 4px solid var(--primary-color);
    }
    
    .table-of-contents h4 {
        margin-bottom: var(--spacing-md);
        color: var(--text-primary);
    }
    
    .table-of-contents ul {
        list-style: none;
        padding: 0;
    }
    
    .table-of-contents li {
        margin-bottom: var(--spacing-sm);
    }
    
    .table-of-contents a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color var(--transition-fast);
    }
    
    .table-of-contents a:hover {
        color: var(--primary-color);
    }
    
    .table-of-contents .h3 {
        padding-left: var(--spacing-md);
        font-size: 0.9em;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(style);
