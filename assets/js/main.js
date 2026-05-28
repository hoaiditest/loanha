/* ==========================================================================
   LOAN HÀ CAMERA & VI TÍNH - MAIN JAVASCRIPT LOGIC
   Author: Minh Đỗ (Senior UI/UX Designer & Frontend Developer)
   ========================================================================== */

// CẤU HÌNH: Dán URL ứng dụng web Google Apps Script của bạn vào đây để lưu dữ liệu và nhận thông báo Telegram.
// Ví dụ: "https://script.google.com/macros/s/AKfycbz..."
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwqt1ApVif_CuyJUcyjK-SShY-k-aGNBp59ifkW3hEvDaU9bgMxHIoOoLYm-CQgvdtP/exec";

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. STICKY NAV HEADER
       -------------------------------------------------------------------------- */
    const mainHeader = document.getElementById('mainHeader');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('sticky');
        } else {
            mainHeader.classList.remove('sticky');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on startup to handle refresh position
    
    /* --------------------------------------------------------------------------
       2. MOBILE MENU OVERLAY
       -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (mobileMenuOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    mobileToggle.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking on nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
    
    /* --------------------------------------------------------------------------
       3. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve after showing to prevent continuous trigger
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        const revealOnScrollFallback = () => {
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight * 0.85) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScrollFallback);
        revealOnScrollFallback();
    }
    
    /* --------------------------------------------------------------------------
       4. PRODUCTS DYNAMIC FILTER SYSTEM
       -------------------------------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            productCards.forEach(card => {
                card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation to take effect
                    card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (btn.getAttribute('data-filter') === filterValue) {
                            card.style.display = 'none';
                        }
                    }, 400); // Wait for transition to complete
                }
            });
        });
    });
    
    /* --------------------------------------------------------------------------
       5. FEEDBACK SLIDER / CAROUSEL
       -------------------------------------------------------------------------- */
    const slider = document.getElementById('feedbackSlider');
    const dots = document.querySelectorAll('#sliderDots .dot');
    let currentSlide = 0;
    const slideCount = dots.length;
    let autoSlideInterval;
    
    const goToSlide = (index) => {
        if (index < 0 || index >= slideCount) return;
        
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    };
    
    const nextSlide = () => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slideCount) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    };
    
    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            goToSlide(index);
            resetAutoSlide(); // Reset timer when manually clicked
        });
    });
    
    // Auto slide interval
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000); // Switch slide every 5 seconds
    };
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };
    
    startAutoSlide();
    
    /* --------------------------------------------------------------------------
       6. CUSTOM TOAST NOTIFICATION CREATOR
       -------------------------------------------------------------------------- */
    const toastContainer = document.getElementById('toastContainer');
    
    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        
        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
            <div class="toast-body">${message}</div>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger slide-in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Close event
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        });
        
        // Auto remove after 4.5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 400);
            }
        }, 4500);
    };
    
    /* --------------------------------------------------------------------------
       7. CONTACT FORM VALIDATION & SUBMISSION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const submitBtnSpinner = submitBtn.querySelector('.spinner');
    
    // Validation helper
    const validateField = (fieldId, errorId, validationFn) => {
        const field = document.getElementById(fieldId);
        const group = field.closest('.form-group');
        const isValid = validationFn(field.value.trim());
        
        if (!isValid) {
            group.classList.add('has-error');
        } else {
            group.classList.remove('has-error');
        }
        
        return isValid;
    };
    
    // Individual field validation rules
    const validateName = (val) => val.length >= 2;
    const validatePhone = (val) => {
        const cleaned = val.replace(/\D/g, '');
        return cleaned.length >= 9 && cleaned.length <= 11 && /^(0[3|5|7|8|9])/.test(cleaned);
    };
    const validateDropdown = (val) => val !== '';
    const validateAddress = (val) => val.length >= 5;
    
    // Add real-time validation feedback on input / blur
    document.getElementById('fullName').addEventListener('blur', () => {
        validateField('fullName', 'fullNameError', validateName);
    });
    document.getElementById('phoneNumber').addEventListener('blur', () => {
        validateField('phoneNumber', 'phoneNumberError', validatePhone);
    });
    document.getElementById('serviceType').addEventListener('change', () => {
        validateField('serviceType', 'serviceTypeError', validateDropdown);
    });
    document.getElementById('address').addEventListener('blur', () => {
        validateField('address', 'addressError', validateAddress);
    });
    
    // Form Submit Event
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField('fullName', 'fullNameError', validateName);
        const isPhoneValid = validateField('phoneNumber', 'phoneNumberError', validatePhone);
        const isServiceValid = validateField('serviceType', 'serviceTypeError', validateDropdown);
        const isAddressValid = validateField('address', 'addressError', validateAddress);
        
        if (isNameValid && isPhoneValid && isServiceValid && isAddressValid) {
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                phoneNumber: document.getElementById('phoneNumber').value.trim(),
                serviceType: document.getElementById('serviceType').value,
                address: document.getElementById('address').value.trim(),
                message: document.getElementById('message').value.trim(),
                submittedAt: new Date().toISOString()
            };
            
            // Disable button & Show spinner loading
            submitBtn.disabled = true;
            submitBtnText.style.display = 'none';
            submitBtnSpinner.style.display = 'inline-block';
            
            if (!GOOGLE_SCRIPT_URL) {
                // CHẾ ĐỘ MÔ PHỎNG (Khi chưa cấu hình URL Google Script)
                setTimeout(() => {
                    console.log('--- YÊU CẦU ĐẶT DỊCH VỤ MỚI (MÔ PHỎNG) ---');
                    console.log(JSON.stringify(formData, null, 2));
                    console.log('--------------------------------');
                    
                    showToast('Yêu cầu đã được gửi thành công! (Chế độ mô phỏng - Chưa cấu hình Google Script)');
                    
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtnText.style.display = 'inline-block';
                    submitBtnSpinner.style.display = 'none';
                    
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('has-error');
                    });
                }, 1500);
            } else {
                // CHẾ ĐỘ THỰC TẾ: Gửi dữ liệu tới Google Apps Script
                try {
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors', // Cần thiết đối với Google Script web app khi chuyển hướng
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    // Do mode 'no-cors' không trả về dữ liệu phản hồi chi tiết từ client (opaque response),
                    // chúng ta giả định nếu không ném ra ngoại lệ (exception) thì kết nối đã truyền dữ liệu thành công.
                    showToast('Yêu cầu đã được gửi thành công! Loan Hà sẽ liên hệ lại ngay trong 15 phút.');
                    contactForm.reset();
                    
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('has-error');
                    });
                } catch (error) {
                    console.error('Lỗi gửi form:', error);
                    showToast('Đã có lỗi xảy ra khi gửi yêu cầu. Vui lòng liên hệ trực tiếp qua Zalo/Hotline.', 'error');
                } finally {
                    submitBtn.disabled = false;
                    submitBtnText.style.display = 'inline-block';
                    submitBtnSpinner.style.display = 'none';
                }
            }
            
        } else {
            // Scroll to the first error
            const firstErrorGroup = document.querySelector('.form-group.has-error');
            if (firstErrorGroup) {
                firstErrorGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Focus on the input
                const input = firstErrorGroup.querySelector('input, select, textarea');
                if (input) input.focus();
            }
            showToast('Vui lòng kiểm tra lại thông tin và điền đầy đủ các trường bắt buộc.', 'error');
        }
    });
    
    /* --------------------------------------------------------------------------
       8. SMOOTH ANCHOR LINK NAVIGATION
       -------------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight Active Link on Scroll
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset header
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === currentSectionId || (href === '' && currentSectionId === 'trang-chu')) {
                link.classList.add('active');
            }
        });
    });
});
