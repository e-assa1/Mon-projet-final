// Animations avancées et effets visuels
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect pour les sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const parallaxElements = document.querySelectorAll('.hero-visual');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Animation de typing pour les titres
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeEffect() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 100);
            }
        }
        
        // Observer pour déclencher l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeEffect();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });

    // Effet de hover 3D sur les cartes
    const cards = document.querySelectorAll('.service-card, .package-card, .portfolio-item-full');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Effet de révélation progressive
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // Animation des graphiques et statistiques
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const progressFill = bar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        });
    }

    // Effet de particules interactives
    function createInteractiveParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Ajouter des particules qui suivent la souris
        setInterval(() => {
            if (Math.random() > 0.8) {
                const particle = document.createElement('div');
                particle.className = 'interactive-particle';
                particle.style.left = mouseX + 'px';
                particle.style.top = mouseY + 'px';
                particle.style.position = 'fixed';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '-1';
                particle.style.animation = 'fadeOut 2s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }
        }, 100);
    }

    // CSS pour l'animation fadeOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) translateY(-50px);
            }
        }
        
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .reveal-on-scroll.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Initialiser les animations
    animateProgressBars();
    createInteractiveParticles();
});

// Fonction pour créer des effets de transition entre pages
function createPageTransition() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                
                // Effet de fade out
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
}

// Initialiser les transitions de page
createPageTransition();

// Gestionnaire pour les animations au défilement
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-animation]');
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-scroll-animation');
                entry.target.classList.add(`animate-${animation}`);
                this.observer.unobserve(entry.target);
           }
       });
   }
}

// Initialiser les animations de scroll
new ScrollAnimations();

// Gestionnaire pour les effets de hover avancés
class HoverEffects {
   constructor() {
       this.init();
   }
   
   init() {
       // Effet de magnetic hover sur les boutons
       const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .service-card');
       
       magneticElements.forEach(el => {
           el.addEventListener('mousemove', this.magneticEffect.bind(this));
           el.addEventListener('mouseleave', this.resetMagnetic.bind(this));
       });
   }
   
   magneticEffect(e) {
       const element = e.currentTarget;
       const rect = element.getBoundingClientRect();
       const x = e.clientX - rect.left - rect.width / 2;
       const y = e.clientY - rect.top - rect.height / 2;
       
       const distance = Math.sqrt(x * x + y * y);
       const maxDistance = Math.max(rect.width, rect.height) / 2;
       
       if (distance < maxDistance) {
           const strength = (maxDistance - distance) / maxDistance;
           const moveX = x * strength * 0.1;
           const moveY = y * strength * 0.1;
           
           element.style.transform = `translate(${moveX}px, ${moveY}px)`;
       }
   }
   
   resetMagnetic(e) {
       const element = e.currentTarget;
       element.style.transform = 'translate(0px, 0px)';
   }
}

// Initialiser les effets de hover
new HoverEffects();

// Système de notifications toast amélioré
class NotificationSystem {
   constructor() {
       this.container = this.createContainer();
       this.notifications = [];
   }
   
   createContainer() {
       const container = document.createElement('div');
       container.className = 'notification-container';
       container.style.cssText = `
           position: fixed;
           top: 20px;
           right: 20px;
           z-index: 10000;
           display: flex;
           flex-direction: column;
           gap: 10px;
           pointer-events: none;
       `;
       document.body.appendChild(container);
       return container;
   }
   
   show(message, type = 'info', duration = 5000) {
       const notification = document.createElement('div');
       notification.className = `notification-toast ${type}`;
       notification.style.cssText = `
           background: rgba(0, 0, 0, 0.9);
           border: 1px solid rgba(255, 255, 255, 0.2);
           border-radius: 10px;
           padding: 15px 20px;
           color: #ffffff;
           transform: translateX(100%);
           transition: transform 0.3s ease;
           max-width: 400px;
           pointer-events: auto;
           position: relative;
           overflow: hidden;
       `;
       
       // Types de notification
       const colors = {
           success: 'rgba(0, 255, 0, 0.5)',
           error: 'rgba(255, 0, 0, 0.5)',
           warning: 'rgba(255, 255, 0, 0.5)',
           info: 'rgba(0, 255, 255, 0.5)'
       };
       
       notification.style.borderColor = colors[type] || colors.info;
       
       // Icônes pour chaque type
       const icons = {
           success: '✅',
           error: '❌',
           warning: '⚠️',
           info: 'ℹ️'
       };
       
       notification.innerHTML = `
           <div style="display: flex; align-items: center; gap: 10px;">
               <span style="font-size: 1.2rem;">${icons[type] || icons.info}</span>
               <span>${message}</span>
               <button onclick="this.parentElement.parentElement.remove()" 
                       style="background: none; border: none; color: #ffffff; font-size: 1.2rem; cursor: pointer; margin-left: auto; padding: 0;">×</button>
           </div>
           <div class="progress-bar" style="position: absolute; bottom: 0; left: 0; height: 3px; background: ${colors[type]}; width: 100%; transform-origin: left; animation: progressShrink ${duration}ms linear forwards;"></div>
       `;
       
       this.container.appendChild(notification);
       
       // Animation d'entrée
       setTimeout(() => {
           notification.style.transform = 'translateX(0)';
       }, 100);
       
       // Suppression automatique
       setTimeout(() => {
           notification.style.transform = 'translateX(100%)';
           setTimeout(() => {
               if (notification.parentNode) {
                   notification.parentNode.removeChild(notification);
               }
           }, 300);
       }, duration);
       
       return notification;
   }
}

// Créer une instance globale du système de notifications
window.notificationSystem = new NotificationSystem();

// Ajouter le CSS pour la barre de progression
const progressStyle = document.createElement('style');
progressStyle.textContent = `
   @keyframes progressShrink {
       from { transform: scaleX(1); }
       to { transform: scaleX(0); }
   }
`;
document.head.appendChild(progressStyle);

// Système de gestion des formulaires avancé
class FormManager {
   constructor() {
       this.forms = document.querySelectorAll('form');
       this.init();
   }
   
   init() {
       this.forms.forEach(form => {
           this.setupForm(form);
       });
   }
   
   setupForm(form) {
       // Validation en temps réel
       const inputs = form.querySelectorAll('input, select, textarea');
       inputs.forEach(input => {
           input.addEventListener('blur', () => this.validateField(input));
           input.addEventListener('input', () => this.clearErrors(input));
       });
       
       // Sauvegarde automatique dans localStorage (si disponible)
       if (typeof(Storage) !== "undefined") {
           inputs.forEach(input => {
               // Restaurer les valeurs sauvegardées
               const savedValue = localStorage.getItem(`form_${form.id}_${input.name}`);
               if (savedValue && input.type !== 'password') {
                   input.value = savedValue;
               }
               
               // Sauvegarder lors de la frappe
               input.addEventListener('input', () => {
                   if (input.type !== 'password') {
                       localStorage.setItem(`form_${form.id}_${input.name}`, input.value);
                   }
               });
           });
       }
   }
   
   validateField(field) {
       const errors = [];
       
       // Validation requis
       if (field.required && !field.value.trim()) {
           errors.push('Ce champ est requis');
       }
       
       // Validation email
       if (field.type === 'email' && field.value) {
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (!emailRegex.test(field.value)) {
               errors.push('Format d\'email invalide');
           }
       }
       
       // Validation téléphone
       if (field.type === 'tel' && field.value) {
           const phoneRegex = /^\+225\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;
           if (!phoneRegex.test(field.value)) {
               errors.push('Format: +225 XX XX XX XX XX');
           }
       }
       
       this.displayErrors(field, errors);
       return errors.length === 0;
   }
   
   displayErrors(field, errors) {
       // Supprimer les anciennes erreurs
       this.clearErrors(field);
       
       if (errors.length > 0) {
           field.style.borderColor = '#ff0000';
           
           const errorDiv = document.createElement('div');
           errorDiv.className = 'field-errors';
           errorDiv.style.cssText = `
               color: #ff4444;
               font-size: 0.8rem;
               margin-top: 5px;
               animation: slideDown 0.3s ease;
           `;
           errorDiv.innerHTML = errors.map(error => `<div>• ${error}</div>`).join('');
           
           field.parentNode.appendChild(errorDiv);
       } else {
           field.style.borderColor = '';
       }
   }
   
   clearErrors(field) {
       const errorDiv = field.parentNode.querySelector('.field-errors');
       if (errorDiv) {
           errorDiv.remove();
       }
       field.style.borderColor = '';
   }
}

// Initialiser le gestionnaire de formulaires
new FormManager();

// Système de lazy loading pour les images
class LazyImageLoader {
   constructor() {
       this.images = document.querySelectorAll('img[data-src]');
       this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this));
       this.init();
   }
   
   init() {
       this.images.forEach(img => {
           this.imageObserver.observe(img);
       });
   }
   
   handleImageIntersection(entries) {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               const img = entry.target;
               img.src = img.dataset.src;
               img.classList.add('loaded');
               this.imageObserver.unobserve(img);
           }
       });
   }
}

// Initialiser le lazy loading
new LazyImageLoader();

// Gestionnaire de performance et optimisation
class PerformanceManager {
   constructor() {
       this.init();
   }
   
   init() {
       // Preload des pages importantes
       this.preloadPages();
       
       // Optimisation des animations
       this.optimizeAnimations();
       
       // Mise en cache des ressources
       this.setupCaching();
   }
   
   preloadPages() {
       const importantPages = ['services.html', 'portfolio.html', 'contact.html'];
       
       importantPages.forEach(page => {
           const link = document.createElement('link');
           link.rel = 'prefetch';
           link.href = page;
           document.head.appendChild(link);
       });
   }
   
   optimizeAnimations() {
       // Réduire les animations si l'utilisateur préfère moins de mouvement
       if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
           document.documentElement.style.setProperty('--animation-duration', '0.1s');
       }
       
       // Pause des animations quand l'onglet n'est pas visible
       document.addEventListener('visibilitychange', () => {
           const animations = document.querySelectorAll('.particle, .floating-cube');
           animations.forEach(el => {
               el.style.animationPlayState = document.hidden ? 'paused' : 'running';
           });
       });
   }
   
   setupCaching() {
       // Mise en cache des données du formulaire
       window.addEventListener('beforeunload', () => {
           const forms = document.querySelectorAll('form');
           forms.forEach(form => {
               const formData = new FormData(form);
               const data = {};
               for (let [key, value] of formData.entries()) {
                   data[key] = value;
               }
               sessionStorage.setItem(`form_backup_${form.id}`, JSON.stringify(data));
           });
       });
   }
}

// Initialiser le gestionnaire de performance
new PerformanceManager();

// Système de tracking des interactions utilisateur (pour analytics)
class UserInteractionTracker {
   constructor() {
       this.interactions = [];
       this.init();
   }
   
   init() {
       // Tracker les clics sur les boutons importants
       document.addEventListener('click', (e) => {
           if (e.target.matches('.btn-primary, .btn-secondary, .service-card, .portfolio-item')) {
               this.trackInteraction('click', e.target.className, e.target.textContent.trim());
           }
       });
       
       // Tracker le temps passé sur la page
       this.startTime = Date.now();
       
       // Tracker les soumissions de formulaire
       document.addEventListener('submit', (e) => {
           this.trackInteraction('form_submit', e.target.id, 'Form submitted');
       });
   }
   
   trackInteraction(type, element, description) {
       const interaction = {
           type,
           element,
           description,
           timestamp: Date.now(),
           page: window.location.pathname
       };
       
       this.interactions.push(interaction);
       
       // Ici vous pourriez envoyer les données à votre service d'analytics
       console.log('Interaction tracked:', interaction);
   }
   
   getSessionSummary() {
       return {
           duration: Date.now() - this.startTime,
           interactions: this.interactions.length,
           pages_visited: [window.location.pathname],
           interactions_detail: this.interactions
       };
   }
}

// Initialiser le tracker d'interactions
const interactionTracker = new UserInteractionTracker();

// Fonction utilitaire pour déboguer les performances
function debugPerformance() {
   if (performance.getEntriesByType) {
       const entries = performance.getEntriesByType('navigation')[0];
       console.log('Page Performance:', {
           'DNS Lookup': entries.domainLookupEnd - entries.domainLookupStart,
           'TCP Connection': entries.connectEnd - entries.connectStart,
           'Request': entries.responseStart - entries.requestStart,
           'Response': entries.responseEnd - entries.responseStart,
           'DOM Processing': entries.domContentLoadedEventStart - entries.responseEnd,
           'Total Load Time': entries.loadEventEnd - entries.navigationStart
       });
   }
}

// Appeler le debug en mode développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
   window.addEventListener('load', debugPerformance);
}

// Export des fonctions utiles pour usage global
window.WebNovaUtils = {
   showNotification: (message, type, duration) => window.notificationSystem.show(message, type, duration),
   trackInteraction: (type, element, description) => interactionTracker.trackInteraction(type, element, description),
   getSessionSummary: () => interactionTracker.getSessionSummary()
};