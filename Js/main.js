// AEON ONLINE SHOPPING - JAVASCRIPT
// ============================================

// Product Data
 const products = [
            {
                id: 1,
                name: "Fresh Australian Beef Steak",
                price: 28.90,
                unit: "per 500g",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IuqJ3jvr1JJeIPJsyLOewlEcpclv_pbAxQ&s",
                category: "Meat & Poultry"
            },
            {
                id: 2,
                name: "Organic Bananas",
                price: 6.50,
                unit: "per kg",
                image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",
                category: "Fresh Produce"
            },
            {
                id: 3,
                name: "Fresh Salmon Fillet",
                price: 35.90,
                unit: "per 500g",
                image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=500",
                category: "Seafood"
            },
            {
                id: 4,
                name: "Whole Grain Bread",
                price: 4.90,
                unit: "per loaf",
                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500",
                category: "Bakery"
            },
            {
                id: 5,
                name: "Fresh Milk",
                price: 8.90,
                unit: "per 1L",
                image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500",
                category: "Dairy & Eggs"
            },
            {
                id: 6,
                name: "Orange Juice",
                price: 12.90,
                unit: "per 1L",
                image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500",
                category: "Beverages"
            },
            {
                id: 7,
                name: "Free Range Eggs",
                price: 9.90,
                unit: "per dozen",
                image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500",
                category: "Dairy & Eggs"
            },
            {
                id: 8,
                name: "Fresh Strawberries",
                price: 15.90,
                unit: "per 500g",
                image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500",
                category: "Fresh Produce"
            }
        ];


        // Cart data
        let cart = [];

  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initScrollEffects();
    initHeroSlider();
    renderProducts();
    initSearch();
    initCartBadgeAnimation();
    loadCartFromStorage();
});

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.50,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements when they come into view
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.product-card, .category-item, .promo-card');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }, 100);

    // Animate section titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-50px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header shadow effect
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// HERO SLIDER
// ============================================
function initHeroSlider() {
    const heroSlide = document.querySelector('.hero-slide');
    const backgrounds = [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600',
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1600',
        'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1600'
    ];
    let currentBg = 0;
    
    setInterval(() => {
        currentBg = (currentBg + 1) % backgrounds.length;
        heroSlide.style.transition = 'background-image 1s ease-in-out';
        heroSlide.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
    }, 5000);
}

// ============================================
// CART BADGE ANIMATION
// ============================================
function initCartBadgeAnimation() {
    const cartBadge = document.getElementById('cartCount');
    
    setInterval(() => {
        if (cart.length > 0) {
            cartBadge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }
    }, 3000);
}

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts();
            updateCartCount();
            
            // Add event listener for checkout button
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Your cart is empty. Add some products before checkout.');
                } else {
                    alert('Thank you for your order! Your items will be delivered soon.');
                    cart = [];
                    updateCart();
                    updateCartCount();
                }
            });
        });

        // Display products on the page
        function displayProducts() {
            const productsContainer = document.getElementById('productsContainer');
            //  Cart   product   add  Text  add  buttom  oder
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-lg-3 col-md-4 col-sm-6  ';
                productCard.innerHTML = `
                    <div class="product-card ">
                        <div class="product-image" style="background-image: url('${product.image}')"></div>
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">Price ${product.price.toFixed(2)}$</div>
                            <div class="product-unit">${product.unit}</div>
                            <div class="product-actions mt-3">
                                <div class="quantity-selector">
                                    <button class="quantity-btn minus" onclick="decreaseQuantity(${product.id})">-</button>
                                    <input type="text" class="quantity-input" id="quantity-${product.id}" value="0" readonly>
                                    <button class="quantity-btn plus" onclick="increaseQuantity(${product.id})">+</button>
                                </div>
                                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                                    <i class="fas fa-cart-plus me-1"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
        }

        // Increase product quantity
        function increaseQuantity(productId) {
            const quantityInput = document.getElementById(`quantity-${productId}`);
            quantityInput.value = parseInt(quantityInput.value) +1;
        }

        // Decrease product quantity
        function decreaseQuantity(productId) {
            const quantityInput = document.getElementById(`quantity-${productId}`);
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            
            // Reset quantity to 1
            document.getElementById(`quantity-${productId}`).value = 1;
            
            updateCart();
            updateCartCount();
            
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'position-fixed bottom-0 end-0 p-3';
            toast.style.zIndex = '11';
            toast.innerHTML = `
                <div class="toast show" role="alert">
                    <div class="toast-header">
                        <i class="fas fa-check-circle text-success me-2"></i>
                        <strong class="me-auto">Added to Cart</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        ${quantity} x ${product.name} added to your cart.
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Chack   out  oder
        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center p-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <p class="text-muted">Your cart is empty</p>
                    </div>
                `;
                cartTotal.textContent = 'Price 0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">Price ${item.price.toFixed(2)}$</div>
                        <div class="cart-item-actions">
                            <div class="cart-quantity">
                                <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <input type="text" class="cart-quantity-input" value="${item.quantity}" readonly>
                                <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = `Price ${total.toFixed(2)}`;
        }

        // Update cart item quantity
        function updateCartQuantity(productId, newQuantity) {
            if (newQuantity < 1) {
                removeFromCart(productId);
                return;
            }
            
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
                updateCartCount();
            }
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
            updateCartCount();
        }

        // Update cart count badge
        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        //==================================================================
         document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.promo-card');
            
            cards.forEach(card => {
                const delay = card.getAttribute('data-delay');
                setTimeout(() => {
                    card.classList.add('animate');
                }, delay);
            });

            // Copy promo code functionality
            const promoCodes = document.querySelectorAll('.promo-code');
            const notification = document.getElementById('copyNotification');

            promoCodes.forEach(code => {
                code.addEventListener('click', function() {
                    const codeText = this.getAttribute('data-code');
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(codeText).then(() => {
                        // Show notification
                        notification.classList.add('show');
                        
                        // Hide notification after 2 seconds
                        setTimeout(() => {
                            notification.classList.remove('show');
                        }, 2000);
                    });
                });
            });
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.promo-card').forEach(card => {
            observer.observe(card);
        });