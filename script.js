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
    
    console.log('Found CTA buttons:', ctaButtons.length);
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            console.log('CTA button clicked:', this.href);
            
            // Google Analytics tracking
            
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
                // Track Lead event
                fbq('track', 'Lead');
                
                // Debug logging
                console.log('Facebook Pixel event fired: Lead');
            } else {
                console.log('Facebook Pixel not loaded');
            }
            
            // Reddit Pixel conversion tracking
            if (typeof rdt !== 'undefined') {
                rdt('track', 'Lead', {
                    value: 1.00,
                    currency: 'USD'
                });
            }
            
            // Open link without referrer after tracking events
            setTimeout(() => {
                // Method 1: Using window.open with referrer control
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.opener = null; // Remove opener reference
                    newWindow.location.href = this.href;
                } else {
                    // Fallback: Create a temporary link and click it
                    const tempLink = document.createElement('a');
                    tempLink.href = this.href;
                    tempLink.target = '_blank';
                    tempLink.rel = 'noopener noreferrer';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }
            }, 100);
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

    // Verify Facebook Pixel is working
    if (typeof fbq !== 'undefined') {
        console.log('Facebook Pixel loaded successfully');
        // Fire a test event to verify tracking
        fbq('track', 'PageView');
    } else {
        console.log('Facebook Pixel not loaded - check implementation');
    }

    // Prime Savings Calculator Functionality
    function initSavingsCalculator() {
        console.log('Initializing Prime Savings Calculator...');

        const calculateBtn = document.getElementById('calculate-btn');
        const monthlySpendingInput = document.getElementById('monthly-spending');
        const shippingFrequencyInput = document.getElementById('shipping-frequency');
        const dealsPercentageInput = document.getElementById('prime-deals-percentage');

        if (!calculateBtn || !monthlySpendingInput || !shippingFrequencyInput || !dealsPercentageInput) {
            console.error('Calculator elements not found!');
            return;
        }

        console.log('Calculator elements found successfully');

        const monthlySavingsEl = document.getElementById('monthly-savings');
        const yearlySavingsEl = document.getElementById('yearly-savings');
        const breakevenMonthsEl = document.getElementById('breakeven-months');
        const netSavingsEl = document.getElementById('net-savings');

        // Default values for demonstration
        let defaultValues = {
            monthlySpending: 150,
            shippingFrequency: 4,
            dealsPercentage: 15
        };

        function calculateSavings() {
            console.log('Calculate function called');

            // Get input values or use defaults
            const monthlySpending = parseFloat(monthlySpendingInput.value) || defaultValues.monthlySpending;
            const shippingFrequency = parseFloat(shippingFrequencyInput.value) || defaultValues.shippingFrequency;
            const dealsPercentage = parseFloat(dealsPercentageInput.value) || defaultValues.dealsPercentage;

            console.log('Input values:', { monthlySpending, shippingFrequency, dealsPercentage });

            // Calculate savings components
            const shippingSavings = shippingFrequency * 2.5; // Average $2.50 per order saved on shipping
            const dealsSavings = (monthlySpending * dealsPercentage) / 100; // Percentage savings on deals
            const monthlySavings = shippingSavings + dealsSavings;

            // Also include 5% cash back benefit in calculations
            const cashBackSavings = (monthlySpending * 0.05); // 5% cash back
            const totalMonthlySavings = shippingSavings + dealsSavings + cashBackSavings;

            // Calculate yearly totals
            const yearlySavings = totalMonthlySavings * 12;

            // Prime subscription cost (student rate after free trial)
            const primeCostPerMonth = 7.49;
            const primeCostPerYear = primeCostPerMonth * 12;

            // Calculate breakeven point
            const breakevenMonths = Math.ceil(primeCostPerMonth / totalMonthlySavings);

            // Net savings (yearly savings minus Prime cost)
            const netSavings = yearlySavings - primeCostPerYear;

            // Update display with animation
            animateValue(monthlySavingsEl, 0, monthlySavings, 1000, '$');
            animateValue(yearlySavingsEl, 0, yearlySavings, 1000, '$');
            animateValue(netSavingsEl, 0, netSavings, 1000, '$');

            // Update breakeven months
            animateValue(breakevenMonthsEl, 0, breakevenMonths, 1000, ' months', true);

            console.log('Calculator Results:', {
                monthlySpending,
                shippingFrequency,
                dealsPercentage,
                shippingSavings: '$' + shippingSavings.toFixed(2),
                dealsSavings: '$' + dealsSavings.toFixed(2),
                cashBackSavings: '$' + cashBackSavings.toFixed(2),
                totalMonthlySavings: '$' + totalMonthlySavings.toFixed(2),
                yearlySavings: '$' + yearlySavings.toFixed(2),
                primeCost: '$' + primeCostPerYear.toFixed(2),
                netSavings: '$' + netSavings.toFixed(2),
                breakevenMonths
            });

            // Verify elements exist and are being updated
            console.log('Elements check:', {
                monthlySavingsEl: monthlySavingsEl ? monthlySavingsEl.textContent : 'NOT FOUND',
                yearlySavingsEl: yearlySavingsEl ? yearlySavingsEl.textContent : 'NOT FOUND',
                netSavingsEl: netSavingsEl ? netSavingsEl.textContent : 'NOT FOUND',
                breakevenMonthsEl: breakevenMonthsEl ? breakevenMonthsEl.textContent : 'NOT FOUND'
            });
        }

        function animateValue(element, start, end, duration, suffix = '', isMonths = false) {
            if (start === end) {
                if (isMonths) {
                    element.textContent = end + suffix;
                } else {
                    element.textContent = suffix + end.toLocaleString();
                }
                return;
            }

            const range = end - start;
            const minTimer = 50;
            const stepTime = Math.abs(Math.floor(duration / range));
            const timer = stepTime < minTimer ? minTimer : stepTime;

            const startTime = new Date().getTime();
            const endTime = startTime + duration;
            let animationFrame;

            function run() {
                const now = new Date().getTime();
                const remaining = Math.max((endTime - now) / duration, 0);
                const value = Math.round(end - (remaining * range));

                if (isMonths) {
                    element.textContent = value + suffix;
                } else {
                    element.textContent = suffix + value.toLocaleString();
                }

                if (remaining > 0) {
                    animationFrame = requestAnimationFrame(run);
                }
            }

            run();
        }

        // Event listeners
        calculateBtn.addEventListener('click', calculateSavings);

        // Auto-calculate on input changes
        [monthlySpendingInput, shippingFrequencyInput, dealsPercentageInput].forEach(input => {
            input.addEventListener('input', function() {
                // Debounce the calculation
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(calculateSavings, 500);
            });
        });

        // Initialize with default values
        setTimeout(calculateSavings, 1000);
    }

    // Initialize calculator when DOM is ready
    initSavingsCalculator();

    // Make calculator function globally accessible for testing
    window.testCalculator = function(monthlySpending = 150, shippingFreq = 4, dealsPct = 15) {
        console.log('🧮 Testing Calculator with:', { monthlySpending, shippingFreq, dealsPct });

        const shippingSavings = shippingFreq * 2.5;
        const dealsSavings = (monthlySpending * dealsPct) / 100;
        const cashBackSavings = (monthlySpending * 0.05); // 5% cash back
        const totalMonthlySavings = shippingSavings + dealsSavings + cashBackSavings;
        const yearlySavings = totalMonthlySavings * 12;
        const primeCost = 7.49 * 12;
        const netSavings = yearlySavings - primeCost;
        const breakevenMonths = Math.ceil(7.49 / totalMonthlySavings);

        console.log('📊 Test Results:', {
            shippingSavings: '$' + shippingSavings.toFixed(2),
            dealsSavings: '$' + dealsSavings.toFixed(2),
            cashBackSavings: '$' + cashBackSavings.toFixed(2),
            totalMonthlySavings: '$' + totalMonthlySavings.toFixed(2),
            yearlySavings: '$' + yearlySavings.toFixed(2),
            primeCost: '$' + primeCost.toFixed(2),
            netSavings: '$' + netSavings.toFixed(2),
            breakevenMonths: breakevenMonths
        });

        return { totalMonthlySavings, yearlySavings, netSavings, breakevenMonths };
    };
});
