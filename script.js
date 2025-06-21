// Animation des particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Smooth scroll
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

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Portfolio Modal
const portfolioData = {
    ecommerce: {
        title: "Plateforme E-commerce Futuriste",
        client: "Bank of Africa Côte d'Ivoire",
        description: "Développement d'une plateforme e-commerce révolutionnaire intégrant l'intelligence artificielle pour personnaliser l'expérience utilisateur. La solution comprend un système de recommandations avancé, un chatbot intelligent et une interface utilisateur moderne.",
        technologies: ["React.js", "Node.js", "MongoDB", "IA/ML", "Stripe", "AWS"],
        features: [
            "Interface utilisateur moderne et responsive",
            "Système de recommandations basé sur l'IA",
            "Chatbot intelligent pour le support client",
            "Paiement sécurisé avec Mobile Money",
            "Tableau de bord administrateur avancé",
            "Analytics et rapports en temps réel"
        ],
        duration: "4 mois",
        team: "6 développeurs",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    },
    fintech: {
        title: "Application Mobile Fintech",
        client: "Orange Money Côte d'Ivoire",
        description: "Application mobile complète pour les services financiers digitaux, permettant les transferts d'argent, paiements de factures et gestion de portefeuille électronique avec une sécurité renforcée.",
        technologies: ["Flutter", "Firebase", "Dart", "REST API", "Blockchain", "Biométrie"],
        features: [
            "Transferts d'argent instantanés",
            "Paiement de factures (eau, électricité, téléphone)",
            "Authentification biométrique",
            "Historique détaillé des transactions",
            "Notifications push en temps réel",
            "Support multi-langues (français, anglais, langues locales)"
        ],
        duration: "6 mois",
        team: "8 développeurs",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    },
    dashboard: {
        title: "Dashboard Analytics Avancé",
        client: "Société Générale Côte d'Ivoire",
        description: "Interface de visualisation de données sophistiquée pour l'analyse des performances bancaires, avec des graphiques interactifs, des indicateurs en temps réel et des rapports automatisés.",
        technologies: ["Vue.js", "D3.js", "Python", "Django", "PostgreSQL", "Redis"],
        features: [
            "Visualisations interactives avec D3.js",
            "Indicateurs de performance en temps réel",
            "Rapports automatisés et programmables",
            "Filtres avancés et personnalisables",
            "Exportation de données (PDF, Excel, CSV)",
            "Interface responsive pour mobile et desktop"
        ],
        duration: "3 mois",
        team: "5 développeurs",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    }
};

function openPortfolioModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;

    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <div class="modal-info">
                <h2>${project.title}</h2>
                <p class="modal-client"><strong>Client:</strong> ${project.client}</p>
                <p class="modal-duration"><strong>Durée:</strong> ${project.duration} | <strong>Équipe:</strong> ${project.team}</p>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-description">
                <h3>Description du projet</h3>
                <p>${project.description}</p>
            </div>
            <div class="modal-technologies">
                <h3>Technologies utilisées</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="modal-features">
                <h3>Fonctionnalités principales</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="contactForProject('${projectId}')">Projet similaire</button>
                <button class="btn-secondary" onclick="closeModal()">Fermer</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Service Details Modal
const serviceData = {
    web: {
        title: "Développement Web Avancé",
        description: "Création d'applications web modernes, responsives et performantes utilisant les dernières technologies du marché.",
        price: "À partir de 500,000 FCFA",
        duration: "2-8 semaines",
        technologies: ["React", "Vue.js", "Angular", "Node.js", "PHP", "Python"],
        services: [
            "Sites web vitrine modernes",
            "Applications web complexes (SPA)",
            "E-commerce personnalisés",
            "Systèmes de gestion (CRM, ERP)",
            "APIs et services web",
            "Optimisation SEO avancée"
        ]
    },
    mobile: {
        title: "Applications Mobile Natives & Hybrides",
        description: "Développement d'applications mobiles performantes pour iOS et Android avec une expérience utilisateur exceptionnelle.",
        price: "À partir de 800,000 FCFA",
        duration: "4-12 semaines",
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
        services: [
            "Applications natives iOS/Android",
            "Applications cross-platform",
            "Applications e-commerce mobile",
            "Applications de services (fintech, santé)",
            "Intégration avec APIs externes",
            "Publication sur App Store/Play Store"
        ]
    },
    devops: {
        title: "DevOps & Infrastructure Cloud",
        description: "Automatisation, déploiement et gestion d'infrastructure cloud pour des applications scalables et sécurisées.",
        price: "À partir de 300,000 FCFA",
        duration: "1-4 semaines",
        technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        services: [
            "Configuration serveurs cloud",
            "Automatisation des déploiements (CI/CD)",
            "Monitoring et supervision",
            "Sauvegardes automatisées",
            "Sécurisation infrastructure",
            "Optimisation des performances"
        ]
    },
    ai: {
        title: "Solutions Intelligence Artificielle",
        description: "Intégration de l'IA dans vos applications : chatbots, analyse de données, reconnaissance vocale et plus.",
        price: "À partir de 1,200,000 FCFA",
        duration: "6-16 semaines",
        technologies: ["Python", "TensorFlow", "OpenAI", "Scikit-learn", "NLP"],
        services: [
            "Chatbots intelligents",
            "Analyse prédictive de données",
            "Reconnaissance d'images/voix",
            "Systèmes de recommandation",
            "Automatisation de processus",
            "Traitement du langage naturel"
        ]
    },
    design: {
        title: "Design UI/UX Professionnel",
        description: "Création d'interfaces utilisateur modernes et d'expériences utilisateur optimales pour vos applications.",
        price: "À partir de 200,000 FCFA",
        duration: "1-6 semaines",
        technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision"],
        services: [
            "Audit UX existant",
            "Wireframes et prototypes",
            "Design system complet",
            "Maquettes haute-fidélité",
            "Tests utilisateurs",
            "Design responsive multi-supports"
        ]
    },
    security: {
        title: "Cybersécurité & Audit",
        description: "Protection complète de vos systèmes et données avec des solutions de sécurité avancées.",
        price: "À partir de 600,000 FCFA",
        duration: "2-8 semaines",
        technologies: ["Nessus", "Metasploit", "OWASP", "SSL/TLS", "Firewall"],
        services: [
            "Audit de sécurité complet",
            "Tests de pénétration",
            "Configuration firewall",
            "Chiffrement des données",
            "Formation sécurité équipes",
            "Surveillance continue (SOC)"
        ]
    }
};

function showServiceDetails(serviceId) {
    const service = serviceData[serviceId];
    if (!service) return;

    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('serviceModalContent');
    
    modalContent.innerHTML = `
        <div class="service-modal-content">
            <h2>${service.title}</h2>
            <p class="service-description">${service.description}</p>
            
            <div class="service-info-grid">
                <div class="service-info-item">
                    <h4>💰 Tarif</h4>
                    <p>${service.price}</p>
                </div>
                <div class="service-info-item">
                    <h4>⏱️ Durée</h4>
                    <p>${service.duration}</p>
                </div>
            </div>
            
            <div class="service-details">
                <h3>🛠️ Technologies</h3>
                <div class="tech-tags">
                    ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <h3>📋 Services inclus</h3>
                <ul class="service-list">
                    ${service.services.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="service-actions">
                <button class="btn-primary" onclick="requestQuote('${serviceId}')">Demander un devis</button>
                <button class="btn-secondary" onclick="closeServiceModal()">Fermer</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function requestQuote(serviceId) {
    const whatsappMsg = `Bonjour WebNova! Je suis intéressé(e) par vos services de ${serviceData[serviceId].title}. Pouvez-vous me fournir un devis personnalisé?`;
    const whatsappUrl = `https://wa.me/2250777090037?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappUrl, '_blank');
}

function contactForProject(projectId) {
    const project = portfolioData[projectId];
    const whatsappMsg = `Bonjour WebNova! J'ai vu votre projet "${project.title}" et j'aimerais discuter d'un projet similaire pour mon entreprise.`;
    const whatsappUrl = `https://wa.me/2250777090037?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappUrl, '_blank');
}

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Animation de soumission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'envoi (remplace par une vraie API)
        setTimeout(() => {
            // Création du message WhatsApp
            const whatsappMsg = `🚀 *Nouveau projet WebNova*
            
*Nom:* ${data.name}
*Email:* ${data.email}
*Téléphone:* ${data.phone}
*Service:* ${data.service}

*Message:*
${data.message}

_Envoyé depuis le site WebNova_`;
            
            const whatsappUrl = `https://wa.me/2250777090037?text=${encodeURIComponent(whatsappMsg)}`;
            
            // Afficher message de succès
            showNotification('Message envoyé avec succès! Vous allez être redirigé vers WhatsApp.', 'success');
            
            // Redirection vers WhatsApp
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 2000);
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
        }, 1500);
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Fermeture des modals en cliquant à l'extérieur
window.addEventListener('click', function(e) {
    const portfolioModal = document.getElementById('portfolioModal');
    const serviceModal = document.getElementById('serviceModal');
    
    if (e.target === portfolioModal) {
        closeModal();
    }
    if (e.target === serviceModal) {
        closeServiceModal();
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Animation du logo
    const logo = document.querySelector('.logo');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
});

// Scroll effects pour le header
// Scroll effects pour le header
window.addEventListener('scroll', function() {
   const header = document.querySelector('header');
   if (window.scrollY > 100) {
       header.style.background = 'rgba(10, 10, 10, 0.95)';
       header.style.backdropFilter = 'blur(25px)';
   } else {
       header.style.background = 'rgba(10, 10, 10, 0.8)';
       header.style.backdropFilter = 'blur(20px)';
   }
});

// Effet de typing pour le titre hero
function typeWriter(element, text, speed = 100) {
   let i = 0;
   element.innerHTML = '';
   
   function type() {
       if (i < text.length) {
           element.innerHTML += text.charAt(i);
           i++;
           setTimeout(type, speed);
       }
   }
   type();
}

// Animation des compteurs
function animateCounter(element, start, end, duration) {
   let startTime = null;
   
   function animation(currentTime) {
       if (startTime === null) startTime = currentTime;
       const timeElapsed = currentTime - startTime;
       const progress = Math.min(timeElapsed / duration, 1);
       
       const value = Math.floor(progress * (end - start) + start);
       element.textContent = value;
       
       if (progress < 1) {
           requestAnimationFrame(animation);
       }
   }
   
   requestAnimationFrame(animation);
}

// Géolocalisation pour services locaux
function getLocationServices() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           // Ici on pourrait adapter les services selon la localisation en CI
           console.log('Position détectée en Côte d\'Ivoire');
       });
   }
}