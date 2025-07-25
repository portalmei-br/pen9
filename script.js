// Função para calcular o segundo sábado a partir de uma data
function getSecondSaturday(startDate) {
    const date = new Date(startDate);
    
    // Encontrar o primeiro sábado estritamente APÓS a data de início
    // Se a data de início for um sábado, o primeiro sábado 'que vem' é o da próxima semana.
    // Se não for sábado, é o próximo sábado.
    
    // Calcular dias até o próximo sábado (6 é sábado no JavaScript: 0=domingo, 1=segunda, ..., 6=sábado)
    let daysUntilNextSaturday = (6 - date.getDay() + 7) % 7;
    
    // Se a data de início já for sábado, daysUntilNextSaturday será 0. 
    // Precisamos que seja 7 para pegar o sábado da próxima semana.
    if (daysUntilNextSaturday === 0) {
        daysUntilNextSaturday = 7;
    }
        
    const firstSaturdayAfterStart = new Date(date);
    firstSaturdayAfterStart.setDate(date.getDate() + daysUntilNextSaturday);
    
    // O segundo sábado é 7 dias depois do primeiro sábado APÓS a data de início
    const secondSaturdayAfterStart = new Date(firstSaturdayAfterStart);
    secondSaturdayAfterStart.setDate(firstSaturdayAfterStart.getDate() + 7);
    
    return secondSaturdayAfterStart.toISOString().split('T')[0]; // Retorna no formato YYYY-MM-DD
}

// Função para atualizar todas as datas das peneiras para o segundo sábado
function updatePeneirasDates() {
    const today = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    const secondSaturday = getSecondSaturday(today);
    
    console.log(`Data atual: ${today}`);
    console.log(`Segundo sábado calculado: ${secondSaturday}`);
    
    // Atualizar todas as peneiras para a data do segundo sábado
    peneirasData.forEach((peneira, index) => {
        const oldDate = peneira.data;
        peneira.data = secondSaturday;
        console.log(`Peneira ${index + 1} (${peneira.clube}): ${oldDate} → ${secondSaturday}`);
    });
    
    return secondSaturday;
}

// Dados simulados de peneiras de futebol - VERSÃO SIMPLIFICADA
const peneirasData = [
    {
        id: 1,
        titulo: "Peneira Sub-15 e Sub-17",
        clube: "Santos FC",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-08-15",
        horario: "14:00",
        categoria: "Sub-15, Sub-17",
        requisitos: "Idade entre 13-17 anos",
        contato: "(13) 3257-4000",
        distancia: 2.5,
        lat: -23.9618,
        lng: -46.3322,
        status: "aberta",
        vagasDisponiveis: 8,
        totalVagas: 50,
        prazoInscricao: "2024-08-10",
        inscricaoEncerrada: false
    },
    {
        id: 2,
        titulo: "Peneira Categoria de Base",
        clube: "São Paulo FC",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-08-20",
        horario: "09:00",
        categoria: "Sub-13, Sub-15",
        requisitos: "Idade entre 11-15 anos",
        contato: "(11) 3670-8100",
        distancia: 5.8,
        lat: -23.5505,
        lng: -46.6333,
        status: "encerrada",
        vagasDisponiveis: 0,
        totalVagas: 40,
        prazoInscricao: "2024-08-15",
        inscricaoEncerrada: true
    },
    {
        id: 3,
        titulo: "Peneira Feminina",
        clube: "Corinthians",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-08-25",
        horario: "15:30",
        categoria: "Sub-16, Sub-18",
        requisitos: "Idade entre 14-18 anos (feminino)",
        contato: "(11) 2095-3000",
        distancia: 8.2,
        lat: -23.5629,
        lng: -46.6544,
        status: "aberta",
        vagasDisponiveis: 3,
        totalVagas: 30,
        prazoInscricao: "2024-08-20",
        inscricaoEncerrada: false
    },
    {
        id: 4,
        titulo: "Peneira Juvenil",
        clube: "Palmeiras",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-09-01",
        horario: "10:00",
        categoria: "Sub-17, Sub-20",
        requisitos: "Idade entre 15-20 anos",
        contato: "(11) 3873-2400",
        distancia: 12.1,
        lat: -23.5629,
        lng: -46.6544,
        status: "aberta",
        vagasDisponiveis: 15,
        totalVagas: 60,
        prazoInscricao: "2024-08-28",
        inscricaoEncerrada: false
    },
    {
        id: 5,
        titulo: "Peneira Regional",
        clube: "Red Bull Bragantino",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-09-05",
        horario: "13:00",
        categoria: "Sub-14, Sub-16",
        requisitos: "Idade entre 12-16 anos",
        contato: "(11) 4034-1900",
        distancia: 45.3,
        lat: -22.9519,
        lng: -46.5428,
        status: "encerrada",
        vagasDisponiveis: 0,
        totalVagas: 25,
        prazoInscricao: "2024-09-01",
        inscricaoEncerrada: true
    },
    {
        id: 6,
        titulo: "Peneira Escolar",
        clube: "Ponte Preta",
        endereco: null, // Será preenchido com o CEP do usuário
        data: "2024-09-10",
        horario: "14:30",
        categoria: "Sub-13, Sub-15",
        requisitos: "Idade entre 11-15 anos",
        contato: "(19) 3231-3444",
        distancia: 35.7,
        lat: -22.9056,
        lng: -47.0608,
        status: "aberta",
        vagasDisponiveis: 22,
        totalVagas: 35,
        prazoInscricao: "2024-09-07",
        inscricaoEncerrada: false
    }
];

// Cache para armazenar endereços já consultados
const enderecoCache = new Map();

// Função para buscar endereço por CEP via ViaCEP
async function buscarEnderecoPorCEP(cep) {
    // Limpar CEP (remover hífen e espaços)
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Verificar se já está no cache
    if (enderecoCache.has(cepLimpo)) {
        console.log(`CEP ${cep} encontrado no cache:`, enderecoCache.get(cepLimpo));
        return enderecoCache.get(cepLimpo);
    }
    
    // Validar formato do CEP
    if (cepLimpo.length !== 8) {
        console.error(`CEP inválido: ${cep} (deve ter 8 dígitos)`);
        return 'CEP inválido';
    }
    
    try {
        console.log(`Buscando CEP ${cep} (${cepLimpo}) na API ViaCEP...`);
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Resposta da API para CEP ${cep}:`, data);
        
        if (data.erro) {
            throw new Error('CEP não encontrado na base de dados');
        }
        
        if (!data.localidade || !data.uf) {
            throw new Error('Dados incompletos retornados pela API');
        }
        
        const endereco = `${data.localidade}, ${data.uf}`;
        console.log(`Endereço formatado para CEP ${cep}: ${endereco}`);
        
        // Armazenar no cache
        enderecoCache.set(cepLimpo, endereco);
        
        return endereco;
    } catch (error) {
        console.error(`Erro ao buscar CEP ${cep}:`, error.message);
        // Retornar um endereço padrão em caso de erro
        return 'Localização não disponível';
    }
}

// Variáveis globais
let userLocation = null;
let currentResults = [];
let currentFilter = 'all';

// Elementos DOM
const cepInput = document.getElementById('cep-input');
const getLocationBtn = document.getElementById('get-location-btn');
const searchBtn = document.getElementById('search-btn');
const resultsSection = document.getElementById('results');
const resultsContainer = document.getElementById('results-container');
const noResults = document.getElementById('no-results');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingAddress = document.getElementById('loading-address');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const backToTopBtn = document.getElementById('back-to-top');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar as datas das peneiras para o segundo sábado ao carregar a página
    updatePeneirasDates();
    
    initializeApp();
});

function initializeApp() {
    console.log('Inicializando aplicação...');
    
    // Event listeners para busca
    searchBtn.addEventListener('click', handleSearch);
    cepInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Event listener para obter localização atual
    getLocationBtn.addEventListener('click', getCurrentLocation);
    
    // Event listeners para sugestões
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            cepInput.value = location;
            handleSearch();
        });
    });
    
    // Event listeners para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
            applyFilter(filter);
        });
    });
    
    // Event listener para menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Event listener para botão voltar ao topo
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', handleScroll);
    
    // Animações de scroll
    setupScrollAnimations();
    
    // Animação dos números das estatísticas
    animateStats();
    
    // Configurar indicador de scroll
    setupScrollIndicator();
}

// Função para alternar menu mobile
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Função para fechar menu mobile
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Função para lidar com scroll
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header com efeito de scroll
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Botão voltar ao topo
    if (scrollY > 500) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (window.scrollY <= 500) {
                backToTopBtn.style.display = 'none';
            }
        }, 300);
    }
}

// Função para voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para configurar indicador de scroll
function setupScrollIndicator() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.getElementById('como-funciona').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Função para animar estatísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Função para animar números
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'k+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Função para obter localização atual do usuário
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('Geolocalização não é suportada pelo seu navegador', 'error');
        return;
    }
    
    showLoading();
    getLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            // Simular busca de endereço reverso
            reverseGeocode(userLocation.lat, userLocation.lng)
                .then(address => {
                    cepInput.value = address;
                    hideLoading();
                    getLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                    handleSearch();
                })
                .catch(error => {
                    hideLoading();
                    getLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                    showNotification('Erro ao obter endereço', 'error');
                });
        },
        function(error) {
            hideLoading();
            getLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
            
            let message = 'Erro ao obter localização';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Permissão de localização negada';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Localização indisponível';
                    break;
                case error.TIMEOUT:
                    message = 'Tempo limite excedido';
                    break;
            }
            showNotification(message, 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

// Função simulada de geocodificação reversa
function reverseGeocode(lat, lng) {
    return new Promise((resolve, reject) => {
        // Simular delay de API
        setTimeout(() => {
            // Coordenadas aproximadas de algumas cidades brasileiras
            const cities = [
                { name: "São Paulo, SP", lat: -23.5505, lng: -46.6333 },
                { name: "Rio de Janeiro, RJ", lat: -22.9068, lng: -43.1729 },
                { name: "Belo Horizonte, MG", lat: -19.9167, lng: -43.9345 },
                { name: "Porto Alegre, RS", lat: -30.0346, lng: -51.2177 },
                { name: "Salvador, BA", lat: -12.9714, lng: -38.5014 },
                { name: "Brasília, DF", lat: -15.8267, lng: -47.9218 }
            ];
            
            // Encontrar cidade mais próxima
            let closestCity = cities[0];
            let minDistance = calculateDistance(lat, lng, cities[0].lat, cities[0].lng);
            
            cities.forEach(city => {
                const distance = calculateDistance(lat, lng, city.lat, city.lng);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCity = city;
                }
            });
            
            resolve(closestCity.name);
        }, 1000);
    });
}

// Função para calcular distância entre duas coordenadas
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Função principal de busca
async function handleSearch() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        showNotification('Por favor, digite um CEP válido com 8 dígitos.', 'warning');
        cepInput.focus();
        return;
    }

    showLoading(true);

    try {
        console.log(`Buscando endereço para CEP do usuário: ${cep}`);
        
        // Buscar endereço do CEP digitado pelo usuário
        const enderecoUsuario = await buscarEnderecoPorCEP(cep);
        
        if (enderecoUsuario === 'CEP inválido' || enderecoUsuario === 'Localização não disponível') {
            showNotification('CEP não encontrado. Verifique o número digitado.', 'error');
            hideLoading();
            return;
        }

        console.log(`Endereço do usuário encontrado: ${enderecoUsuario}`);
        
        // Aplicar o endereço do usuário a TODAS as peneiras
        peneirasData.forEach(peneira => {
            peneira.endereco = enderecoUsuario;
        });
        
        console.log(`Endereço "${enderecoUsuario}" aplicado a todas as ${peneirasData.length} peneiras`);

        loadingAddress.textContent = `Buscando peneiras próximas a ${enderecoUsuario}`;
        document.getElementById('loading-neighborhood').textContent = `Todas as peneiras mostrarão: ${enderecoUsuario}`;

        // Simular delay de busca
        setTimeout(() => {
            searchPeneiras(enderecoUsuario);
        }, 2500);

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showNotification('Erro ao buscar CEP. Tente novamente.', 'error');
        hideLoading();
    }
}

// Função para buscar peneiras
function searchPeneiras(location) {
    try {
        // Simular geocodificação da localização digitada
        const userCoords = geocodeLocation(location);
        
        // Calcular distâncias e filtrar resultados
        const results = peneirasData.map(peneira => {
            const distance = calculateDistance(
                userCoords.lat, userCoords.lng,
                peneira.lat, peneira.lng
            );
            
            return {
                ...peneira,
                distancia: distance
            };
        }).filter(peneira => peneira.distancia <= 100); // Filtrar peneiras até 100km
        
        currentResults = results;
        
        hideLoading();
        displayResults(results);
        
    } catch (error) {
        console.error('Erro ao buscar peneiras:', error);
        hideLoading();
        showNotification('Erro ao buscar peneiras. Tente novamente.', 'error');
    }
}

// Função simulada de geocodificação
function geocodeLocation(location) {
    // Coordenadas simuladas baseadas na localização
    const locations = {
        'São Paulo, SP': { lat: -23.5505, lng: -46.6333 },
        'Rio de Janeiro, RJ': { lat: -22.9068, lng: -43.1729 },
        'Belo Horizonte, MG': { lat: -19.9167, lng: -43.9345 },
        'Porto Alegre, RS': { lat: -30.0346, lng: -51.2177 }
    };
    
    return locations[location] || { lat: -23.5505, lng: -46.6333 }; // Default para São Paulo
}

// Função para exibir resultados
function displayResults(results) {
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    if (results.length === 0) {
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    resultsContainer.style.display = 'grid';
    noResults.style.display = 'none';
    
    resultsContainer.innerHTML = results.map(peneira => createResultCard(peneira)).join('');
    
    // Adicionar animação aos cards
    const cards = resultsContainer.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Função para criar card de resultado
function createResultCard(peneira) {
    const statusClass = peneira.status === 'aberta' ? 'status-open' : 'status-closed';
    const statusText = peneira.status === 'aberta' ? 'Aberta' : 'Encerrada';
    
    // Formatar data para exibição
    const dataFormatada = new Date(peneira.data).toLocaleDateString('pt-BR');
    
    return `
        <div class="result-card" data-id="${peneira.id}">
            <div class="card-header">
                <div class="card-title-section">
                    <h3 class="card-title">${peneira.titulo}</h3>
                    <p class="card-club">${peneira.clube}</p>
                </div>
                <div class="card-badges">
                    <span class="distance-badge">${peneira.distancia.toFixed(1)} km</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
            
            <div class="card-content">
                <div class="card-info-grid">
                    <div class="info-item">
                        <i class="fas fa-calendar-alt info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Data</span>
                            <span class="info-value">${dataFormatada}</span>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-clock info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Horário</span>
                            <span class="info-value">${peneira.horario}</span>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Local</span>
                            <span class="info-value">${peneira.endereco || 'Endereço não disponível'}</span>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-users info-icon"></i>
                        <div class="info-content">
                            <span class="info-label">Categoria</span>
                            <span class="info-value">${peneira.categoria}</span>
                        </div>
                    </div>
                </div>
                
                <div class="card-details">
                    <p class="card-requirements">
                        <i class="fas fa-info-circle"></i>
                        ${peneira.requisitos}
                    </p>
                    
                    <div class="card-availability">
                        <div class="availability-bar">
                            <div class="availability-fill" style="width: ${(peneira.vagasDisponiveis / peneira.totalVagas) * 100}%"></div>
                        </div>
                        <span class="availability-text">
                            ${peneira.vagasDisponiveis} de ${peneira.totalVagas} vagas disponíveis
                        </span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn-contact" onclick="window.open('tel:${peneira.contato}')">
                        <i class="fas fa-phone"></i>
                        Contato
                    </button>
                    <button class="btn-details" onclick="showPeneiraDetails(${peneira.id})">
                        <i class="fas fa-info-circle"></i>
                        Mais Detalhes
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função para mostrar detalhes da peneira
function showPeneiraDetails(id) {
    const peneira = peneirasData.find(p => p.id === id);
    if (!peneira) return;
    
    // Aqui você pode implementar um modal ou redirecionamento
    alert(`Detalhes da peneira:\n\nClube: ${peneira.clube}\nTítulo: ${peneira.titulo}\nData: ${new Date(peneira.data).toLocaleDateString('pt-BR')}\nHorário: ${peneira.horario}\nContato: ${peneira.contato}`);
}

// Função para definir filtro ativo
function setActiveFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
}

// Função para aplicar filtro
function applyFilter(filter) {
    let filteredResults = [...currentResults];
    
    switch (filter) {
        case 'distance':
            filteredResults.sort((a, b) => a.distancia - b.distancia);
            break;
        case 'date':
            filteredResults.sort((a, b) => new Date(a.data) - new Date(b.data));
            break;
        default:
            // 'all' - manter ordem original
            break;
    }
    
    displayResults(filteredResults);
}

// Função para mostrar loading
function showLoading(withAddress = false) {
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        if (withAddress && loadingAddress) {
            loadingAddress.style.display = 'block';
        }
    }
}

// Função para esconder loading
function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Função para mostrar notificação
function showNotification(message, type = 'info') {
    // Implementação simples com alert - pode ser melhorada com toast/modal
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
}

// Função para configurar animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.step-card, .feature-card, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
}

