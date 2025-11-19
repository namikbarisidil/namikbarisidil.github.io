const Layout = {
    renderNavbar: (containerId, basePath = '', activePage = '') => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isIndex = activePage === 'home';

        const links = [
            { 
                name: 'Home', href: 'index.html#home', id: 'home', 
                lang: { en: 'Home', de: 'Startseite', tr: 'Ana Sayfa' } 
            },
            { 
                name: 'About', href: 'index.html#about', id: 'about', 
                lang: { en: 'About', de: 'Über mich', tr: 'Hakkımda' } 
            },
            { 
                name: 'Skills', href: 'index.html#skills', id: 'skills', 
                lang: { en: 'Skills', de: 'Fähigkeiten', tr: 'Yetenekler' } 
            },
            { 
                name: 'Experience', href: 'index.html#projects', id: 'projects', 
                lang: { en: 'Experience', de: 'Erfahrung', tr: 'Deneyim' } 
            },
            { 
                name: 'Achievements', 
                id: 'achievements',
                dropdown: [
                    { name: 'Education', href: 'index.html#education', id: 'education', lang: { en: 'Education', de: 'Bildung', tr: 'Eğitim' } },
                    { name: 'Certifications', href: 'index.html#certifications', id: 'certifications', lang: { en: 'Certifications', de: 'Zertifizierungen', tr: 'Sertifikalar' } },
                    { name: 'Books', href: 'index.html#publications', id: 'publications', lang: { en: 'Books', de: 'Bücher', tr: 'Kitaplar' } },
                    { name: 'Articles', href: 'index.html#articles', id: 'articles', lang: { en: 'Articles', de: 'Artikel', tr: 'Makaleler' } }
                ],
                lang: { en: 'Achievements', de: 'Erfolge', tr: 'Başarılar' }
            },
            { 
                name: 'Blog', href: 'blog.html', id: 'blog', 
                lang: { en: 'Blog', de: 'Blog', tr: 'Blog' } 
            },
            { 
                name: 'Contact', href: 'index.html#contact', id: 'contact', 
                lang: { en: 'Contact', de: 'Kontakt', tr: 'İletişim' } 
            },
        ];

        const generateLangAttrs = (langObj) => {
            if (!langObj) return '';
            return `data-lang-en="${langObj.en}" data-lang-de="${langObj.de}" data-lang-tr="${langObj.tr}"`;
        };

        const navLinksHtml = links.map(link => {
            const isActive = activePage === link.id ? 'class="active"' : '';
            
            if (link.dropdown) {
                const dropdownItems = link.dropdown.map(item => {
                    let itemHref = basePath + item.href;
                    if (isIndex && item.href.startsWith('index.html#')) {
                        itemHref = item.href.replace('index.html', '');
                    }
                    return `<li><a href="${itemHref}" ${generateLangAttrs(item.lang)}>${item.name}</a></li>`;
                }).join('');
                
                return `
                    <li class="dropdown">
                        <a href="javascript:void(0)" ${generateLangAttrs(link.lang)}>${link.name}</a>
                        <ul class="dropdown-menu">
                            ${dropdownItems}
                        </ul>
                    </li>
                `;
            } else {
                let href = basePath + link.href;
                if (isIndex && link.href.startsWith('index.html#')) {
                    href = link.href.replace('index.html', '');
                }
                return `<li><a href="${href}" ${isActive} ${generateLangAttrs(link.lang)}>${link.name}</a></li>`;
            }
        }).join('');

        container.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">
                        <a href="${basePath}index.html" style="text-decoration: none; color: inherit;">
                            <span class="logo-line1" data-lang-en="Building the Future" data-lang-de="Die Zukunft wird gebaut" data-lang-tr="Gelecek İnşa Ediliyor">Building the Future</span><br>
                            <span class="logo-line2" data-lang-en="> Execute? (Y/N)" data-lang-de="> Ausführen? (J/N)" data-lang-tr="> Çalıştır? (E/H)">&gt; Execute? (Y/N)</span><span class="cursor">_</span>
                        </a>
                    </div>
                    <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links">
                        ${navLinksHtml}
                    </ul>
                    <div class="language-switcher">
                        <button class="lang-btn active" data-lang="en">EN</button>
                        <button class="lang-btn" data-lang="de">DE</button>
                        <button class="lang-btn" data-lang="tr">TR</button>
                    </div>
                    <div class="theme-switch-wrapper">
                        <label class="theme-switch" for="checkbox" aria-label="Toggle Dark Mode">
                            <input type="checkbox" id="checkbox" class="theme-toggle-checkbox" />
                            <div class="slider round">
                                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </div>
                        </label>
                    </div>
                </div>
            </nav>
        `;
    },

    renderFooter: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const year = new Date().getFullYear();
        container.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <p>&copy; <span class="current-year">${year}</span> Baris Idil. All rights reserved.</p>
                    <p class="footer-links">
                        <span class="version" id="site-version">local</span>
                        <span class="separator">•</span>
                        <a href="https://www.githubstatus.com/" target="_blank" rel="noopener noreferrer" class="status-link">
                            <span class="status-indicator" id="status-indicator"></span>
                            <span data-lang-en="GitHub Status" data-lang-de="GitHub-Status" data-lang-tr="GitHub Durumu">GitHub Status</span>
                        </a>
                    </p>
                </div>
            </footer>
        `;
    },

    initFooter: (basePath = '') => {
        // Load version dynamically
        fetch(basePath + 'version.json')
            .then(response => response.json())
            .then(data => {
                const versionElement = document.getElementById('site-version');
                if (versionElement) {
                    versionElement.textContent = `v${data.version}`;
                }
            })
            .catch(() => console.log('Using default version'));

        // Fetch GitHub status
        fetch('https://www.githubstatus.com/api/v2/status.json')
            .then(response => response.json())
            .then(data => {
                const statusLink = document.querySelector('.status-link');
                const indicator = document.getElementById('status-indicator');
                if (statusLink && indicator) {
                    const status = data.status.indicator;
                    const description = data.status.description;
                    
                    indicator.className = 'status-indicator';
                    if (status === 'none') {
                        indicator.classList.add('status-operational');
                        statusLink.title = 'All Systems Operational';
                    } else {
                        indicator.classList.add('status-' + status);
                        statusLink.title = description || 'Issues Detected';
                    }
                }
            })
            .catch(() => console.log('Could not fetch GitHub status'));
    }
};
