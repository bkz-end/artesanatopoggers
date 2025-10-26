document.addEventListener('DOMContentLoaded', () => {

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
    const activeLine = document.createElement('span');
    activeLine.classList.add('active-line');
    document.querySelector('.navbar-nav').appendChild(activeLine);

    function positionActiveLine() {
        const activeLink = document.querySelector('.navbar-nav .nav-item.active a');
        if (activeLink && window.innerWidth >= 900) {
            activeLine.style.width = activeLink.offsetWidth + 'px';
            activeLine.style.left = activeLink.offsetLeft + 'px';
            activeLine.style.opacity = 1;
        } else {
            activeLine.style.opacity = 0;
        }
    }

    if (navbarToggler && navMenu) {
        navbarToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navbarToggler.setAttribute('aria-expanded', isExpanded);
            navbarToggler.innerHTML = isExpanded ? '×' : '☰';
        });
    }

    // --- LÓGICA DO INTERSECTION OBSERVER (PARA NAVBAR E ANIMAÇÃO) ---
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% da seção precisa estar visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. ATIVA A ANIMAÇÃO SIMPLES
                // Adiciona a classe .is-visible na seção que entrou na tela
                entry.target.classList.add('is-visible');

                // 2. ATIVA O LINK DA NAVBAR
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.closest('.nav-item').classList.remove('active');
                    if (link.getAttribute('href').endsWith(currentSectionId)) {
                        link.closest('.nav-item').classList.add('active');
                        positionActiveLine(); // Atualiza a "barrinha"
                    }
                });
            }
            // Opcional: descomente a linha abaixo se quiser que a animação
            // aconteça toda vez que rolar para cima e para baixo.
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, observerOptions);

    // Observa todas as seções
    sections.forEach(section => {
        observer.observe(section);
    });

    // Posição inicial da linha (no 'Home')
    setTimeout(() => {
        const homeLink = document.querySelector('.navbar-nav .nav-item a[href="#home-section"]');
        if (homeLink) {
            homeLink.closest('.nav-item').classList.add('active');
            positionActiveLine();
        }
    }, 100);

    // Reposiciona a linha ao redimensionar a janela
    window.addEventListener('resize', () => {
        positionActiveLine();
        if (window.innerWidth >= 900 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navbarToggler.setAttribute('aria-expanded', false);
            navbarToggler.innerHTML = '☰';
        }
    });

    // --- Lógica da Galeria de Artesanatos ---
    const galleryItems = [
        { src: 'img/artesanato1.jpg', alt: 'Arranjo floral natural', title: 'Arranjo floral natural', description: 'Flores secas e sementes que trazem o aconchego da natureza pra sua casa. 🍂' },
        { src: 'img/artesanato2.jpg', alt: 'Presépio artesanal', title: 'Presépio artesanal', description: 'Peça feita em madeira, símbolo de fé e tradição com toque maranhense. 🙏' },
        { src: 'img/artesanato3.jpg', alt: 'Brincos artesanais', title: 'Brincos artesanais', description: 'Feitos com madeira e sementes naturais. Leves, sustentáveis e cheios de estilo rústico. 🌿' },
        { src: 'img/artesanato4.jpg', alt: 'Filtro dos sonhos emoldurado', title: 'Filtro dos sonhos emoldurado', description: 'Protege o ambiente e atrai boas energias com um toque artesanal e natural. ✨' }
    ];

    const galleryContainer = document.querySelector('.artesanatos-gallery');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-button');

    if (galleryContainer) {
        galleryItems.forEach((item) => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');
            galleryItemDiv.innerHTML = `<img src="${item.src}" alt="${item.alt}"><h3>${item.title}</h3>`;
            
            galleryItemDiv.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = item.src;
                modalTitle.textContent = item.title;
                modalDescription.textContent = item.description;
            });
            galleryContainer.appendChild(galleryItemDiv);
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // O CÓDIGO DO SCROLLREVEAL FOI REMOVIDO DAQUI

});