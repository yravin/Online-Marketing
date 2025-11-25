// ============================================
// AEON ONLINE SHOPPING - JAVASCRIPT
// ============================================

// Product Data
 const products = [
            {
                id: 1,
                name: "UFC ORANGE JUICE 100%",
                price: 2.90,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20230727/1690451648-8850025519016.jpg",
                category: "Meat & Poultry"
            },
            {
                id: 2,
                name: "ORANGE PRESERVES",
                price: 1.50,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20240622/1719043900-8935118302222.jpg",
                category: "Fresh Produce"
            },
            {
                id: 3,
                name: "MILO",
                price: 35.90,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20240620/1718881132-8850127010213.jpg",
                category: "Seafood"
            },
            {
                id: 4,
                name: "COCA-COLA ",
                price: 8.90,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20230124/qDoVSIYQH1fAoIl3bQkg7VUvcSf0yOuQbjT1PD0q.jpg",
                category: "Bakery"
            },
            {
                id: 5,
                name: "7 UP CAN ",
                price: 8.50,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20231223/1703321513-8846000010098.jpg",
                category: "Dairy & Eggs"
            },
            {
                id: 6,
                name: "PERRIER PEACH FLAVOR CAN 250ML",
                price: 2.00,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/products/20251021/1761035591-Untitled-design-(10).webp",
                category: "Beverages"
            },
            {
                id: 7,
                name: "PERRIER LIME SLIM ",
                price: 1.00,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/catalog/product/7613036669412-a.jpg",
                category: "Dairy & Eggs"
            },
            {
                id: 8,
                name: "MALEE",
                price: 2.90,
                image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/product/phpFRdVfk-1643436545.png",
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
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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
                productCard.className = 'col-lg-3 col-md-4 col-sm-6';
                productCard.innerHTML = `
                    <div class="product-card">
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
            quantityInput.value = parseInt(quantityInput.value) + 1;
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