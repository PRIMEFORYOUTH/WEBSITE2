// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.classList.remove('active');
                    ans.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Toggle current FAQ answer
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                toggle.textContent = '+';
            } else {
                answer.classList.add('active');
                toggle.textContent = '−';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .step, .faq-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Track CTA button clicks for analytics and Google Ads conversions
    const ctaButtons = document.querySelectorAll('a[href*="amzn.to"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Google Analytics tracking
            console.log('CTA button clicked:', this.href);
            
            // Google Ads conversion tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-16512167647/6mP5CNTNn4kbEN_dzsE9',
                    'value': 1.0,
                    'currency': 'USD'
                });
                
                // Also track as a custom event
                gtag('event', 'affiliate_click', {
                    'event_category': 'engagement',
                    'event_label': 'amazon_signup',
                    'value': 1
                });
            }
            
            // Facebook Ads conversion tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    value: 1.00,
                    currency: 'USD'
                });
                
                // Also track as a custom event
                fbq('track', 'CustomizeProduct', {
                    content_name: 'Amazon Prime Signup',
                    content_category: 'Affiliate Marketing',
                    value: 1.00,
                    currency: 'USD'
                });
            }
            
            // Optional: Add a small delay to ensure the click is registered
            // Note: HTML link already opens in new tab, so no need for window.open()
            // setTimeout(() => {
            //     window.open(this.href, '_blank');
            // }, 100);
        });
    });
    
    // Mobile menu toggle (for future mobile navigation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add hover effects to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    
    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: #ff9900;
                z-index: 1001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize tooltips for better UX
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                    z-index: 1000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                this.tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.tooltip) {
                    this.tooltip.remove();
                    this.tooltip = null;
                }
            });
        });
    }
    
    // Initialize tooltips
    initTooltips();
    
    // BULLETPROOF COUNTDOWN - CANNOT BE INTERFERED WITH
    function startBulletproofCountdown() {
        console.log('Starting BULLETPROOF countdown...');
        
        // Store the countdown state in a way that can't be reset
        let countdownState = {
            totalMinutes: 24,
            totalSeconds: 0,
            isRunning: true
        };
        
        // Create a unique identifier for this countdown
        const countdownId = 'bulletproof_' + Date.now();
        window[countdownId] = countdownState;
        
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            // Check if countdown is still running
            if (!window[countdownId] || !window[countdownId].isRunning) {
                clearInterval(countdownInterval);
                return;
            }
            
            const state = window[countdownId];
            
            if (state.totalMinutes > 0 || state.totalSeconds > 0) {
                // Decrease time
                if (state.totalSeconds === 0) {
                    state.totalMinutes--;
                    state.totalSeconds = 59;
                } else {
                    state.totalSeconds--;
                }
                
                // Calculate display values
                const minutes = state.totalMinutes;
                const seconds = state.totalSeconds;
                
                // Force update the display with multiple methods
                const minutesElement = document.getElementById('minutes');
                const secondsElement = document.getElementById('seconds');
                
                if (minutesElement) {
                    // Use multiple methods to ensure update
                    minutesElement.textContent = minutes.toString().padStart(2, '0');
                    minutesElement.innerHTML = minutes.toString().padStart(2, '0');
                    minutesElement.setAttribute('data-value', minutes.toString().padStart(2, '0'));
                }

                if (secondsElement) {
                    // Use multiple methods to ensure update
                    secondsElement.textContent = seconds.toString().padStart(2, '0');
                    secondsElement.innerHTML = seconds.toString().padStart(2, '0');
                    secondsElement.setAttribute('data-value', seconds.toString().padStart(2, '0'));
                }
                
                console.log(`BULLETPROOF Countdown: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                
                // Update urgency message
                const countdownLabel = document.querySelector('.countdown-label');
                if (countdownLabel) {
                    if (state.totalMinutes === 0 && state.totalSeconds <= 30) {
                        countdownLabel.textContent = '🚨 FINAL SECONDS - Don\'t Miss Out!';
                        countdownLabel.style.color = '#ff4444';
                    } else if (state.totalMinutes === 0 && state.totalSeconds <= 60) {
                        countdownLabel.textContent = '⚡ Less Than 1 Minute Left!';
                        countdownLabel.style.color = '#ff9900';
                    } else if (state.totalMinutes <= 30) {
                        countdownLabel.textContent = '⚡ Less Than 30 Minutes Left!';
                        countdownLabel.style.color = '#ff9900';
                    } else {
                        countdownLabel.textContent = 'Limited Time Offer';
                        countdownLabel.style.color = '#333';
                    }
                }
                
            } else {
                // Countdown finished
                clearInterval(countdownInterval);
                console.log('BULLETPROOF Countdown finished!');
                
                const minutesElement = document.getElementById('minutes');
                const secondsElement = document.getElementById('seconds');
                const countdownLabel = document.querySelector('.countdown-label');
                
                if (minutesElement) minutesElement.textContent = '00';
                if (secondsElement) secondsElement.textContent = '00';
                if (countdownLabel) {
                    countdownLabel.textContent = '⏰ Offer Expired!';
                    countdownLabel.style.color = '#ff4444';
                }
                
                // Clean up
                delete window[countdownId];
            }
        }, 1000);
        
        // Store the interval ID so it can't be accidentally cleared
        window[countdownId + '_interval'] = countdownInterval;
    }
    
    // REMOVE ALL OLD COUNTDOWN CODE - START ONLY THIS ONE
    startBulletproofCountdown();
    
    // Exit intent popup
    let popupShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !popupShown) {
            document.getElementById('exit-popup').style.display = 'flex';
            popupShown = true;
        }
    });
    
    // Close popup function (global scope)
    window.closeExitPopup = function() {
        document.getElementById('exit-popup').style.display = 'none';
    };
    
    // Close popup when clicking outside
    document.getElementById('exit-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});
