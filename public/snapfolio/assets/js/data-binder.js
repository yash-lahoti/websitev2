/**
 * Data Binder Module
 * Populates HTML elements with data from data.json
 */

class DataBinder {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
        this.data = null;
        this.typedInstance = null; // Store Typed.js instance
    }

    /**
     * Initialize data binding
     */
    async init() {
        try {
            this.data = await this.dataLoader.getData();
            this.bindAll();
        } catch (error) {
            console.error('Failed to initialize data binding:', error);
        }
    }

    /**
     * Bind all sections
     */
    bindAll() {
        this.bindSiteMetadata();
        this.bindNavigation();
        this.bindSocialLinks();
        this.bindFooter();
        
        // Bind all sections since they're all loaded at once
        this.bindHero();
        this.bindAbout();
        this.bindStats();
        this.bindResume();
        this.bindPortfolio();
        this.bindServices();
        this.bindTestimonials();
        this.bindContact();
        this.bindPhilosophy();
        this.bindFullCycle();
        this.bindPricing();
        this.bindFAQ();
        
        // Reinitialize all plugins after binding
        this.reinitializeAllPlugins();
    }

    /**
     * Reinitialize all plugins after all sections are bound
     */
    reinitializeAllPlugins() {
        // Reinitialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Reinitialize PureCounter for stats
        if (typeof PureCounter !== 'undefined') {
            new PureCounter();
        }

        // Reinitialize Isotope for portfolio
        if (typeof Isotope !== 'undefined') {
            const isotopeContainer = document.querySelector('.isotope-container');
            if (isotopeContainer && !isotopeContainer._isotope) {
                const iso = new Isotope(isotopeContainer, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'masonry'
                });
                isotopeContainer._isotope = iso;
            }
        }

        // Reinitialize GLightbox
        if (typeof GLightbox !== 'undefined') {
            const lightbox = GLightbox({
                selector: '.glightbox'
            });
        }
    }

    /**
     * Get current section from URL hash
     */
    getCurrentSection() {
        const hash = window.location.hash.slice(1);
        return hash || 'hero';
    }

    /**
     * Bind a specific section by name
     * @param {string} sectionName - Name of the section to bind
     */
    bindSection(sectionName) {
        // Map section names to bind methods
        const sectionBinders = {
            'hero': () => this.bindHero(),
            'about': () => this.bindAbout(),
            'stats': () => this.bindStats(),
            'skills': () => this.bindSkills(),
            'resume': () => this.bindResume(),
            'portfolio': () => this.bindPortfolio(),
            'services': () => this.bindServices(),
            'testimonials': () => this.bindTestimonials(),
            'contact': () => this.bindContact(),
            'philosophy': () => this.bindPhilosophy(),
            'trust-strip': () => this.bindTrustStrip(),
            'full-cycle': () => this.bindFullCycle(),
            'long-term': () => this.bindLongTerm(),
            'pricing': () => this.bindPricing(),
            'faq': () => this.bindFAQ()
        };

        const binder = sectionBinders[sectionName];
        if (binder) {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                binder();
                // Reinitialize plugins that need it
                this.reinitializePlugins(sectionName);
            }, 50);
        }
    }

    /**
     * Reinitialize plugins for a section
     * @param {string} sectionName - Name of the section
     */
    reinitializePlugins(sectionName) {
        // Reinitialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Reinitialize PureCounter for stats
        if (sectionName === 'stats' && typeof PureCounter !== 'undefined') {
            new PureCounter();
        }

        // Reinitialize Typed.js for hero
        if (sectionName === 'hero') {
            // Typed.js is handled in bindHero
        }

        // Reinitialize Isotope for portfolio
        if (sectionName === 'portfolio' && typeof Isotope !== 'undefined') {
            const isotopeContainer = document.querySelector('.isotope-container');
            if (isotopeContainer && !isotopeContainer._isotope) {
                const iso = new Isotope(isotopeContainer, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'masonry'
                });
                isotopeContainer._isotope = iso;
            }
        }

        // Reinitialize GLightbox
        if (typeof GLightbox !== 'undefined') {
            const lightbox = GLightbox({
                selector: '.glightbox'
            });
        }
    }

    /**
     * Bind site metadata (title, etc.)
     */
    bindSiteMetadata() {
        if (!this.data.site) return;

        // Update page title
        if (this.data.site.title) {
            document.title = this.data.site.title;
        }

        // Update logo text if element exists
        const logoText = document.querySelector('.logo-text, .sitename');
        if (logoText && this.data.site.logo_text) {
            logoText.textContent = this.data.site.logo_text;
        }
    }

    /**
     * Bind navigation menu
     */
    bindNavigation() {
        if (!this.data.navigation) return;

        const navMenu = document.querySelector('#navmenu ul');
        if (!navMenu) return;

        // Clear existing navigation items (except dropdowns)
        const existingNav = navMenu.querySelectorAll('li:not(.dropdown)');
        existingNav.forEach(item => item.remove());

        // Add navigation items from data in reverse order to maintain proper order
        if (this.data.navigation.items) {
            const items = [...this.data.navigation.items].reverse();
            items.forEach((item) => {
                const li = document.createElement('li');
                const icon = item.icon || 'bi-circle';
                
                li.innerHTML = `
                    <a href="${item.link}">
                        <i class="bi ${icon} navicon"></i> ${item.label}
                    </a>
                `;
                navMenu.insertBefore(li, navMenu.firstChild);
            });
        }

        // Update CTA button if exists
        const navCTA = document.querySelector('.nav-cta');
        if (navCTA && this.data.navigation.cta_text) {
            navCTA.textContent = this.data.navigation.cta_text;
            if (this.data.navigation.cta_link) {
                navCTA.href = this.data.navigation.cta_link;
            }
        }
    }

    /**
     * Bind social links
     */
    bindSocialLinks() {
        if (!this.data.social_links) return;

        // Update hero social links
        const heroSocialLinks = document.querySelector('#hero .social-links');
        if (heroSocialLinks) {
            heroSocialLinks.innerHTML = this.data.social_links.map(link => 
                `<a href="${link.url}" title="${link.name}"><i class="bi ${link.icon}"></i></a>`
            ).join('');
        }

        // Update footer social links if exists
        const footerSocialLinks = document.querySelector('#footer .social-links');
        if (footerSocialLinks) {
            footerSocialLinks.innerHTML = this.data.social_links.map(link => 
                `<a href="${link.url}" title="${link.name}"><i class="bi ${link.icon}"></i></a>`
            ).join('');
        }
    }

    /**
     * Bind hero section
     */
    bindHero() {
        if (!this.data.hero) return;

        const hero = this.data.hero;

        // Update hero title (two-line structure)
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle) {
            if (hero.title_top && hero.title_bottom) {
                heroTitle.innerHTML = `${hero.title_top}<br><span class="accent-text">${hero.title_bottom}</span>`;
            } else if (hero.title) {
                // Fallback to single title if old structure exists
                heroTitle.innerHTML = hero.title;
            }
        }

        // Update hero name (h2)
        const heroName = document.querySelector('#hero h2');
        if (heroName && hero.name) {
            heroName.textContent = hero.name;
        }

        // Update role text (replaces the typed items)
        const roleText = document.querySelector('#hero [data-hero-role]');
        if (roleText && hero.role) {
            roleText.textContent = hero.role;
        }

        // Update description
        const heroDesc = document.querySelector('#hero .description');
        if (heroDesc && hero.description) {
            heroDesc.textContent = hero.description;
        }

        // Update CTA buttons
        const primaryCTA = document.querySelector('#hero .btn-primary');
        if (primaryCTA && hero.primary_cta) {
            primaryCTA.textContent = hero.primary_cta;
            if (hero.primary_cta_link) {
                primaryCTA.href = hero.primary_cta_link;
                // Add target="_blank" for external links (like Calendly)
                if (hero.primary_cta_link.startsWith('http')) {
                    primaryCTA.setAttribute('target', '_blank');
                }
            }
        }

        const secondaryCTA = document.querySelector('#hero .btn-outline');
        if (secondaryCTA && hero.secondary_cta) {
            secondaryCTA.textContent = hero.secondary_cta;
            if (hero.secondary_cta_link) {
                secondaryCTA.href = hero.secondary_cta_link;
            }
        }
    }

    /**
     * Bind about section
     */
    bindAbout() {
        if (!this.data.about_me) return;

        const about = this.data.about_me;

        // Update profile image
        const profileImage = document.querySelector('#about .profile-image img');
        if (profileImage && about.profile_image) {
            profileImage.src = about.profile_image;
            profileImage.alt = about.name || 'Profile Image';
        }

        // Update name
        const nameEl = document.querySelector('#about .profile-content h3, #about h3');
        if (nameEl && about.name) {
            nameEl.textContent = about.name;
        }

        // Update tagline
        const taglineEl = document.querySelector('#about .tagline, #about .profile-content p.tagline');
        if (taglineEl && about.tagline) {
            taglineEl.textContent = about.tagline;
        }

        // Update bio - handle multiple paragraphs
        const bioContainer = document.querySelector('#about .description, #about .about-content .description');
        if (bioContainer && about.bio) {
            const paragraphs = about.bio.split('\n').filter(p => p.trim());
            bioContainer.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        }

        // Update section title
        const sectionTitle = document.querySelector('#about .section-header h2');
        if (sectionTitle && about.title) {
            sectionTitle.textContent = about.title;
        }

        // Update section subtitle
        const sectionSubtitle = document.querySelector('#about .section-header .badge-text');
        if (sectionSubtitle && about.subtitle) {
            sectionSubtitle.textContent = about.subtitle;
        }

        // Update degree tabs with links
        if (about.degrees) {
            const degreeTabsContainer = document.querySelector('#about .degree-tabs');
            if (degreeTabsContainer) {
                degreeTabsContainer.innerHTML = about.degrees.map((degree, index) => {
                    const tabContent = `
                        <div class="degree-tab-content">
                            <div class="degree-logo">
                                <img src="${degree.logo}" alt="${degree.alt}" class="school-logo">
                            </div>
                            <div class="degree-info">
                                <div class="degree-name">${degree.degree}</div>
                                <div class="degree-program">${degree.program}</div>
                            </div>
                        </div>
                    `;
                    
                    if (degree.link) {
                        return `<a href="${degree.link}" target="_blank" rel="noopener noreferrer" class="degree-tab ${index === 0 ? 'active' : ''}" data-aos="fade-up" data-aos-delay="${100 + index * 50}">${tabContent}</a>`;
                    } else {
                        return `<div class="degree-tab ${index === 0 ? 'active' : ''}" data-aos="fade-up" data-aos-delay="${100 + index * 50}">${tabContent}</div>`;
                    }
                }).join('');
            }
        }

        // Update stats grid in right column (outside profile card)
        if (about.stats_grid) {
            const aboutStatsGrid = document.querySelector('#about .about-stats-grid');
            if (aboutStatsGrid) {
                aboutStatsGrid.innerHTML = about.stats_grid.map(stat => `
                    <div class="about-stat-item">
                        <i class="bi ${stat.icon || 'bi-circle'}"></i>
                        <div class="stat-content">
                            <div class="stat-number">${stat.number}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update experience list in details-grid
        if (about.experience_list) {
            const experienceContainer = document.querySelector('#about .details-grid');
            if (experienceContainer) {
                experienceContainer.innerHTML = about.experience_list.map(item => 
                    `<div class="detail-item">
                        <span class="detail-value">${item}</span>
                    </div>`
                ).join('');
            }
        }

        // Contact info removed - no longer displayed in profile card

        // Update CTA buttons
        if (about.cta_buttons) {
            const ctaSection = document.querySelector('#about .cta-section');
            if (ctaSection) {
                ctaSection.innerHTML = about.cta_buttons.map(btn => {
                    const btnClass = btn.style === 'primary' ? 'btn btn-primary' : 'btn btn-outline';
                    // Open PDF links in new tab
                    const targetAttr = btn.link.endsWith('.pdf') ? ' target="_blank" rel="noopener noreferrer"' : '';
                    return `<a href="${btn.link}" class="${btnClass}"${targetAttr}>
                        <i class="bi ${btn.icon}"></i> ${btn.text}
                    </a>`;
                }).join('');
            }
        }
    }

    /**
     * Bind stats section (merged into about)
     */
    bindStats() {
        if (!this.data.stats) return;

        // Look for stats container within about section
        const statsContainer = document.querySelector('#about .stats-wrapper, #about .stats-grid');
        if (!statsContainer) return;

        const statsHTML = this.data.stats.map((stat, index) => {
            const icons = ['bi-emoji-smile', 'bi-journal-richtext', 'bi-headset', 'bi-people'];
            const icon = icons[index] || 'bi-circle';
            
            return `
                <div class="stats-item" data-aos="zoom-in" data-aos-delay="${150 + index * 50}">
                    <div class="icon-wrapper">
                        <i class="bi ${icon}"></i>
                    </div>
                    <span data-purecounter-start="0" 
                          data-purecounter-end="${stat.value.replace(/[^0-9]/g, '')}" 
                          data-purecounter-duration="1" 
                          class="purecounter">${stat.value}</span>
                    <p>${stat.label}</p>
                </div>
            `;
        }).join('');

        statsContainer.innerHTML = statsHTML;

        // Reinitialize PureCounter
        if (typeof PureCounter !== 'undefined') {
            new PureCounter();
        }
    }

    /**
     * Bind skills section
     */
    bindSkills() {
        if (!this.data.skills) return;

        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;

        // Update section title
        const sectionTitle = document.querySelector('#skills .section-title h2');
        if (sectionTitle && this.data.skills.title) {
            sectionTitle.textContent = this.data.skills.title;
        }

        const sectionSubtitle = document.querySelector('#skills .section-title p');
        if (sectionSubtitle && this.data.skills.subtitle) {
            sectionSubtitle.textContent = this.data.skills.subtitle;
        }

        // Bind skill categories
        if (this.data.skills.categories) {
            const skillsContainer = document.querySelector('#skills .container .row');
            if (skillsContainer) {
                const categoriesHTML = this.data.skills.categories.map((category, catIndex) => {
                    const skillsHTML = category.skills.map((skill, skillIndex) => `
                        <div class="skill-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4>${skill.name}</h4>
                                <span class="skill-percentage">${skill.percentage}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                     aria-valuenow="${skill.percentage}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100"
                                     style="width: ${skill.percentage}%"></div>
                            </div>
                            ${skill.description ? `<div class="skill-tooltip">${skill.description}</div>` : ''}
                        </div>
                    `).join('');

                    return `
                        <div class="col-lg-6">
                            <div class="skills-category" data-aos="fade-up" data-aos-delay="${200 + catIndex * 100}">
                                <h3>${category.title}</h3>
                                <div class="skills-animation">
                                    ${skillsHTML}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                skillsContainer.innerHTML = categoriesHTML;
            }
        }
    }

    /**
     * Bind resume section
     */
    bindResume() {
        if (!this.data.resume) return;

        const resumeSection = document.querySelector('#resume');
        if (!resumeSection) return;

        // Update professional summary
        const summaryEl = document.querySelector('#resume .resume-side h3 + p');
        if (summaryEl && this.data.resume.professional_summary) {
            summaryEl.textContent = this.data.resume.professional_summary;
        }

        // Update contact info
        if (this.data.resume.contact_info) {
            const contactInfo = document.querySelector('#resume .contact-info');
            if (contactInfo) {
                let contactHTML = '';
                if (this.data.resume.contact_info.location) {
                    contactHTML += `<li><i class="bi bi-geo-alt"></i> ${this.data.resume.contact_info.location}</li>`;
                }
                if (this.data.resume.contact_info.email) {
                    contactHTML += `<li><i class="bi bi-envelope"></i> ${this.data.resume.contact_info.email}</li>`;
                }
                if (this.data.resume.contact_info.phone) {
                    contactHTML += `<li><i class="bi bi-phone"></i> ${this.data.resume.contact_info.phone}</li>`;
                }
                if (this.data.resume.contact_info.linkedin) {
                    contactHTML += `<li><i class="bi bi-linkedin"></i> ${this.data.resume.contact_info.linkedin}</li>`;
                }
                contactInfo.innerHTML = contactHTML;
            }
        }

        // Update technical skills
        if (this.data.resume.technical_skills) {
            const skillsAnimation = document.querySelector('#resume .skills-animation');
            if (skillsAnimation) {
                const skillsHTML = this.data.resume.technical_skills.map(skill => `
                    <div class="skill-item">
                        <div class="d-flex justify-content-between">
                            <span>${skill.name}</span>
                            <span>${skill.percentage}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" 
                                 aria-valuenow="${skill.percentage}" 
                                 aria-valuemin="0" 
                                 aria-valuemax="100"
                                 style="width: ${skill.percentage}%"></div>
                        </div>
                    </div>
                `).join('');
                skillsAnimation.innerHTML = `<h3>Technical Skills</h3>${skillsHTML}`;
            }
        }

        // Update experience
        if (this.data.resume.experience) {
            const resumeSections = document.querySelectorAll('#resume .resume-section');
            let experienceContainer = null;
            resumeSections.forEach(section => {
                const h3 = section.querySelector('h3');
                if (h3 && (h3.textContent.includes('Experience') || h3.textContent.includes('Professional'))) {
                    experienceContainer = section;
                }
            });
            
            if (experienceContainer) {
                const experienceHTML = this.data.resume.experience.map(exp => `
                    <div class="resume-item">
                        <h4>${exp.title}</h4>
                        <h5>${exp.dates}</h5>
                        <p class="company"><i class="bi bi-building"></i> ${exp.company}</p>
                        ${exp.description ? `<p>${exp.description}</p>` : ''}
                        ${exp.bullet_points ? `
                            <ul>
                                ${exp.bullet_points.map(bp => `<li>${bp}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('');
                
                experienceContainer.innerHTML = `
                    <h3><i class="bi bi-briefcase me-2"></i>Professional Experience</h3>
                    ${experienceHTML}
                `;
            }
        }

        // Update education
        if (this.data.resume.education) {
            const resumeSections = document.querySelectorAll('#resume .resume-section');
            let educationContainer = null;
            resumeSections.forEach(section => {
                const h3 = section.querySelector('h3');
                if (h3 && h3.textContent.includes('Education')) {
                    educationContainer = section;
                }
            });
            
            if (educationContainer) {
                const educationHTML = this.data.resume.education.map(edu => `
                    <div class="resume-item">
                        <h4>${edu.degree}</h4>
                        <h5>${edu.dates}</h5>
                        <p class="company"><i class="bi bi-building"></i> ${edu.institution}</p>
                        ${edu.description ? `<p>${edu.description}</p>` : ''}
                    </div>
                `).join('');
                
                educationContainer.innerHTML = `
                    <h3><i class="bi bi-mortarboard me-2"></i>Education</h3>
                    ${educationHTML}
                `;
            }
        }

        // Update certifications
        if (this.data.resume.certifications) {
            const resumeSections = document.querySelectorAll('#resume .resume-section');
            let certContainer = null;
            resumeSections.forEach(section => {
                const h3 = section.querySelector('h3');
                if (h3 && h3.textContent.includes('Certifications')) {
                    certContainer = section;
                }
            });
            
            if (certContainer) {
                const certHTML = this.data.resume.certifications.map(cert => `
                    <div class="resume-item">
                        <h4>${cert.name}</h4>
                        ${cert.institution ? `<h5>${cert.institution}</h5>` : ''}
                        ${cert.date ? `<h5>${cert.date}</h5>` : ''}
                    </div>
                `).join('');
                
                certContainer.innerHTML = `
                    <h3><i class="bi bi-award me-2"></i>Certifications</h3>
                    ${certHTML}
                `;
            }
        }
    }

    /**
     * Bind portfolio section
     */
    bindPortfolio() {
        if (!this.data.portfolio) return;

        const portfolioSection = document.querySelector('#portfolio');
        if (!portfolioSection) return;

        // Update section title
        const sectionTitle = document.querySelector('#portfolio .section-title h2');
        if (sectionTitle && this.data.portfolio.title) {
            sectionTitle.textContent = this.data.portfolio.title;
        }

        const sectionSubtitle = document.querySelector('#portfolio .section-title p');
        if (sectionSubtitle && this.data.portfolio.subtitle) {
            sectionSubtitle.textContent = this.data.portfolio.subtitle;
        }

        // Update filters
        if (this.data.portfolio.filters) {
            const filtersWrapper = document.querySelector('#portfolio .filters-wrapper');
            if (filtersWrapper) {
                const filtersHTML = this.data.portfolio.filters.map(filter => `
                    <button type="button" class="filter-btn ${filter.active ? 'active' : ''}" 
                            data-filter="${filter.filter}">${filter.label}</button>
                `).join('');
                filtersWrapper.innerHTML = filtersHTML;
            }
        }

        // Update portfolio items
        if (this.data.portfolio.items) {
            const portfolioContainer = document.querySelector('#portfolio .isotope-layout .row:not(.filter-sidebar)');
            if (portfolioContainer) {
                const itemsHTML = this.data.portfolio.items.map((item, index) => `
                    <div class="col-lg-4 col-md-6 portfolio-item ${item.filter}" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                        <div class="portfolio-content position-relative">
                            <img src="${item.image}" class="img-fluid" alt="${item.title}">
                            <div class="portfolio-overlay">
                                <div class="portfolio-info">
                                    <h4>${item.title}</h4>
                                    <p>${item.category}</p>
                                    <div class="portfolio-links">
                                        <a href="${item.lightbox_image}" data-glightbox="type: image" title="${item.title}">
                                            <i class="bi bi-zoom-in"></i>
                                        </a>
                                        <a href="${item.details_link}" title="More Details">
                                            <i class="bi bi-link-45deg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                portfolioContainer.innerHTML = itemsHTML;
            }
        }
    }

    /**
     * Bind services section
     */
    bindServices() {
        if (!this.data.core_services) return;

        const servicesContainer = document.querySelector('#services .row.justify-content-center');
        if (!servicesContainer) return;

        // Update section title
        const sectionTitle = document.querySelector('#services .section-title h2');
        if (sectionTitle && this.data.core_services.title) {
            sectionTitle.textContent = this.data.core_services.title;
        }

        const sectionSubtitle = document.querySelector('#services .section-title p');
        if (sectionSubtitle && this.data.core_services.subtitle) {
            sectionSubtitle.textContent = this.data.core_services.subtitle;
        }

        // Generate service cards
        const services = this.data.core_services.services || [];
        const icons = ['bi-palette', 'bi-gem', 'bi-megaphone', 'bi-code-slash', 'bi-graph-up', 'bi-camera-video', 'bi-file-text'];
        
        const servicesHTML = services.map((service, index) => {
            const icon = icons[index] || 'bi-circle';
            return `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${100 + (index % 3) * 100}">
                    <div class="service-card position-relative z-1">
                        <div class="service-icon">
                            <i class="bi ${icon}"></i>
                        </div>
                        <a href="service-details.html" class="card-action d-flex align-items-center justify-content-center rounded-circle">
                            <i class="bi bi-arrow-up-right"></i>
                        </a>
                        <h3>
                            <a href="service-details.html">
                                ${service.title}
                            </a>
                        </h3>
                        <p>${service.desc}</p>
                    </div>
                </div>
            `;
        }).join('');

        servicesContainer.innerHTML = servicesHTML;
    }

    /**
     * Bind testimonials section
     */
    bindTestimonials() {
        if (!this.data.testimonials) return;

        const testimonialsSection = document.querySelector('#testimonials');
        if (!testimonialsSection) return;

        // Update section title
        const sectionTitle = document.querySelector('#testimonials .section-title h2');
        if (sectionTitle && this.data.testimonials.title) {
            sectionTitle.textContent = this.data.testimonials.title;
        }

        const sectionSubtitle = document.querySelector('#testimonials .section-title p');
        if (sectionSubtitle && this.data.testimonials.subtitle) {
            sectionSubtitle.textContent = this.data.testimonials.subtitle;
        }

        // Update testimonial items
        if (this.data.testimonials.items) {
            const testimonialContainer = document.querySelector('#testimonials .testimonial-masonry');
            if (testimonialContainer) {
                const testimonialsHTML = this.data.testimonials.items.map((testimonial, index) => `
                    <div class="testimonial-item" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                        <div class="testimonial-content">
                            <div class="quote-pattern">
                                <i class="bi bi-quote"></i>
                            </div>
                            <p>${testimonial.quote}</p>
                            <div class="client-info">
                                <div class="client-image">
                                    <img src="${testimonial.image}" alt="${testimonial.client_name}">
                                </div>
                                <div class="client-details">
                                    <h3>${testimonial.client_name}</h3>
                                    <span class="position">${testimonial.position}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                testimonialContainer.innerHTML = testimonialsHTML;
            }
        }
    }

    /**
     * Bind contact section
     */
    bindContact() {
        if (!this.data.contact) return;

        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;

        // Update section title
        const sectionTitle = document.querySelector('#contact .section-title h2');
        if (sectionTitle && this.data.contact.title) {
            sectionTitle.textContent = this.data.contact.title;
        }

        const sectionSubtitle = document.querySelector('#contact .section-title p');
        if (sectionSubtitle && this.data.contact.subtitle) {
            sectionSubtitle.textContent = this.data.contact.subtitle;
        }

        // Update contact info box
        if (this.data.contact.info) {
            const infoBox = document.querySelector('#contact .info-box');
            if (infoBox) {
                const info = this.data.contact.info;
                
                // Update title
                const infoTitle = infoBox.querySelector('h3');
                if (infoTitle && info.title) {
                    infoTitle.textContent = info.title;
                }

                // Update description
                const infoDesc = infoBox.querySelector('h3 + p');
                if (infoDesc && info.description) {
                    infoDesc.textContent = info.description;
                }

                // Update contact items
                if (info.items) {
                    const infoItemsContainer = infoBox.querySelector('.info-item')?.parentElement || infoBox;
                    const existingItems = infoBox.querySelectorAll('.info-item');
                    existingItems.forEach(item => item.remove());

                    const itemsHTML = info.items.map(item => {
                        const linesHTML = item.lines.map(line => `<p>${line}</p>`).join('');
                        return `
                            <div class="info-item">
                                <div class="icon-box">
                                    <i class="bi ${item.icon}"></i>
                                </div>
                                <div class="content">
                                    <h4>${item.title}</h4>
                                    ${linesHTML}
                                </div>
                            </div>
                        `;
                    }).join('');

                    const infoTitleEl = infoBox.querySelector('h3');
                    const infoDescEl = infoBox.querySelector('h3 + p');
                    if (infoTitleEl && infoDescEl) {
                        infoDescEl.insertAdjacentHTML('afterend', itemsHTML);
                    }
                }
            }
        }

        // Update contact form
        if (this.data.contact.form) {
            const contactForm = document.querySelector('#contact .contact-form');
            if (contactForm) {
                const form = this.data.contact.form;
                
                // Update form title
                const formTitle = contactForm.querySelector('h3');
                if (formTitle && form.title) {
                    formTitle.textContent = form.title;
                }

                // Update form description
                const formDesc = contactForm.querySelector('h3 + p');
                if (formDesc && form.description) {
                    formDesc.textContent = form.description;
                }

                // Update form action and method
                const formElement = contactForm.querySelector('form');
                if (formElement) {
                    if (form.action) {
                        formElement.action = form.action;
                    }
                    if (form.method) {
                        formElement.method = form.method;
                    }
                }
            }
        }
    }

    /**
     * Bind philosophy section
     */
    bindPhilosophy() {
        if (!this.data.philosophy) return;

        const philosophySection = document.querySelector('#philosophy');
        if (!philosophySection) return;

        const philosophy = this.data.philosophy;

        // Update title
        const title = philosophySection.querySelector('h2, .section-title h2');
        if (title && philosophy.title) {
            title.textContent = philosophy.title;
        }

        // Update subtitle
        const subtitle = philosophySection.querySelector('.badge-text, .section-title .badge-text');
        if (subtitle && philosophy.subtitle) {
            subtitle.textContent = philosophy.subtitle;
        }

        // Update text
        const text = philosophySection.querySelector('p, .philosophy-text');
        if (text && philosophy.text) {
            text.textContent = philosophy.text;
        }
    }

    /**
     * Bind full cycle section (now called Offerings)
     */
    bindFullCycle() {
        if (!this.data.full_cycle) return;

        const fullCycleSection = document.querySelector('#full-cycle');
        if (!fullCycleSection) return;

        const fc = this.data.full_cycle;

        // Update title - use "Offerings" instead of the data title
        const title = fullCycleSection.querySelector('h2, .section-title h2');
        if (title) {
            title.textContent = 'Offerings';
        }

        // Update subtitle
        const subtitle = fullCycleSection.querySelector('.badge-text, .section-title p');
        if (subtitle && fc.subtitle) {
            subtitle.textContent = fc.subtitle;
        }

        // Update features title
        const featuresTitle = fullCycleSection.querySelector('h3');
        if (featuresTitle && fc.features_title) {
            featuresTitle.textContent = fc.features_title;
        }

        // Update features list
        if (fc.features) {
            const featuresList = fullCycleSection.querySelector('ul, .features-list');
            if (featuresList) {
                featuresList.innerHTML = fc.features.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
            }
        }
    }

    /**
     * Bind long term section
     */
    bindLongTerm() {
        if (!this.data.long_term) return;

        const longTermSection = document.querySelector('#long-term');
        if (!longTermSection) return;

        const lt = this.data.long_term;

        // Update title
        const title = longTermSection.querySelector('h2, .section-title h2');
        if (title && lt.title) {
            title.textContent = lt.title;
        }

        // Update subtitle
        const subtitle = longTermSection.querySelector('.badge-text, .section-title p');
        if (subtitle && lt.subtitle) {
            subtitle.textContent = lt.subtitle;
        }

        // Update services
        if (lt.services) {
            const servicesContainer = longTermSection.querySelector('.row, .services-container');
            if (servicesContainer) {
                const servicesHTML = lt.services.map((service, index) => {
                    let contentHTML = '';
                    if (service.items) {
                        contentHTML = `<ul>${service.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                    } else if (service.description) {
                        contentHTML = `<p>${service.description}</p>`;
                        if (service.additional_text) {
                            contentHTML += `<p>${service.additional_text}</p>`;
                        }
                    }

                    return `
                        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                            <div class="service-card" style="border-left: 4px solid var(--${service.border_color || 'teal'}-600);">
                                <h3>${service.title}</h3>
                                ${contentHTML}
                            </div>
                        </div>
                    `;
                }).join('');
                servicesContainer.innerHTML = servicesHTML;
            }
        }
    }

    /**
     * Bind trust strip section
     */
    bindTrustStrip() {
        if (!this.data.trust_strip) return;

        const trustStripSection = document.querySelector('#trust-strip');
        if (!trustStripSection) return;

        const ts = this.data.trust_strip;

        // Update title
        const title = trustStripSection.querySelector('h2, h3');
        if (title && ts.title) {
            title.textContent = ts.title;
        }

        // Update items
        if (ts.items) {
            const itemsContainer = trustStripSection.querySelector('.trust-items, .row');
            if (itemsContainer) {
                const itemsHTML = ts.items.map((item, index) => `
                    <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                        <div class="trust-item">
                            <p>${item}</p>
                        </div>
                    </div>
                `).join('');
                itemsContainer.innerHTML = itemsHTML;
            }
        }
    }

    /**
     * Bind pricing section
     */
    bindPricing() {
        if (!this.data.pricing) return;

        const pricingSection = document.querySelector('#pricing');
        if (!pricingSection) return;

        const pricing = this.data.pricing;

        // Update section title
        const sectionTitle = pricingSection.querySelector('.section-title h2, h2');
        if (sectionTitle && pricing.title) {
            sectionTitle.textContent = pricing.title;
        }

        const sectionSubtitle = pricingSection.querySelector('.section-title p, .subtitle');
        if (sectionSubtitle && pricing.subtitle) {
            sectionSubtitle.textContent = pricing.subtitle;
        }

        // Update packages
        if (pricing.packages) {
            const packagesContainer = pricingSection.querySelector('.row, .pricing-container');
            if (packagesContainer) {
                const packagesHTML = pricing.packages.map((pkg, index) => `
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                        <div class="pricing-card ${pkg.popular ? 'popular' : ''}">
                            ${pkg.popular ? '<span class="popular-badge">Popular</span>' : ''}
                            <h3>${pkg.name}</h3>
                            <div class="price">
                                <span class="amount">${pkg.price}</span>
                                ${pkg.period ? `<span class="period">/${pkg.period}</span>` : ''}
                            </div>
                            <p class="description">${pkg.description}</p>
                            <ul class="features">
                                ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <a href="#contact" class="btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}">${pkg.cta}</a>
                        </div>
                    </div>
                `).join('');
                packagesContainer.innerHTML = packagesHTML;
            }
        }
    }

    /**
     * Bind FAQ section
     */
    bindFAQ() {
        if (!this.data.faq) return;

        const faqSection = document.querySelector('#faq');
        if (!faqSection) return;

        const faq = this.data.faq;

        // Update section title
        const sectionTitle = faqSection.querySelector('.section-title h2, h2');
        if (sectionTitle && faq.title) {
            sectionTitle.textContent = faq.title;
        }

        const sectionSubtitle = faqSection.querySelector('.section-title p, .subtitle');
        if (sectionSubtitle && faq.subtitle) {
            sectionSubtitle.textContent = faq.subtitle;
        }

        // Update FAQ items
        if (faq.items) {
            const faqContainer = faqSection.querySelector('.faq-container, .accordion, .row');
            if (faqContainer) {
                const faqHTML = faq.items.map((item, index) => `
                    <div class="faq-item" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                        <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
                            <h4>${item.question}</h4>
                            <i class="bi bi-chevron-down faq-icon"></i>
                        </div>
                        <div class="faq-answer">
                            <div class="faq-answer-content">
                                <p class="faq-typed-text" data-text="${item.answer.replace(/"/g, '&quot;')}"></p>
                            </div>
                        </div>
                    </div>
                `).join('');
                faqContainer.innerHTML = faqHTML;
                
                // Initialize FAQ accordion functionality after a short delay
                setTimeout(() => {
                    this.initFAQAccordion();
                }, 100);
            }
        }
    }

    /**
     * Initialize FAQ accordion functionality
     */
    initFAQAccordion() {
        const faqItems = document.querySelectorAll('#faq .faq-item');
        let isTyping = false; // Track if any FAQ is currently typing
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (!question || !answer) return;
            
            // Set initial state
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            
            // Click handler
            const toggleFAQ = (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                
                // Close all other items (only one open at a time)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        otherItem.classList.remove('active');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    // Don't allow opening if another item is currently typing
                    if (isTyping) {
                        return;
                    }
                    
                    item.classList.add('active');
                    
                    // Temporarily set to auto to get actual height, then set to that value
                    answer.style.maxHeight = 'none';
                    const actualHeight = answer.scrollHeight;
                    answer.style.maxHeight = '0';
                    
                    // Force reflow
                    answer.offsetHeight;
                    
                    // Now animate to actual height
                    setTimeout(() => {
                        answer.style.maxHeight = actualHeight + 'px';
                        answer.style.opacity = '1';
                    }, 10);
                    
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                    question.setAttribute('aria-expanded', 'true');
                    
                    // Type out the answer text
                    const typedTextEl = answer.querySelector('.faq-typed-text');
                    if (typedTextEl && !typedTextEl.classList.contains('typed-complete')) {
                        isTyping = true;
                        this.typeFAQAnswer(typedTextEl, () => {
                            isTyping = false;
                        });
                    }
                }
            };
            
            question.addEventListener('click', toggleFAQ);
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(e);
                }
            });
        });
    }

    /**
     * Type out FAQ answer text
     */
    typeFAQAnswer(element, onComplete) {
        const text = element.getAttribute('data-text');
        if (!text) {
            if (onComplete) onComplete();
            return;
        }
        
        element.textContent = '';
        element.classList.remove('typed-complete');
        
        let index = 0;
        const typeSpeed = 15; // milliseconds per character
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typeSpeed);
            } else {
                element.classList.add('typed-complete');
                if (onComplete) onComplete();
            }
        };
        
        // Start typing after a small delay to allow animation to begin
        setTimeout(() => {
            typeChar();
        }, 200);
    }

    /**
     * Bind footer
     */
    bindFooter() {
        if (!this.data.footer) return;

        const footer = this.data.footer;
        const footerSection = document.querySelector('#footer');
        if (!footerSection) return;

        // Update copyright
        const copyrightEl = document.querySelector('#footer .copyright p');
        if (copyrightEl && footer.copyright) {
            copyrightEl.innerHTML = footer.copyright;
        }

        // Update site name
        const sitenameEl = document.querySelector('#footer .sitename');
        if (sitenameEl && footer.sitename) {
            sitenameEl.textContent = footer.sitename;
        }

        // Update location
        const locationEl = document.querySelector('#footer .location');
        if (locationEl && footer.location) {
            locationEl.textContent = footer.location;
        }

        // Update credits
        if (footer.credits) {
            const creditsEl = document.querySelector('#footer .credits');
            if (creditsEl) {
                creditsEl.innerHTML = `
                    ${footer.credits.text} 
                    <a href="${footer.credits.link.url}">${footer.credits.link.text}</a>
                `;
            }
        }
    }
}

// Initialize when DOM is ready and dataLoader is available
function initializeDataBinding() {
    if (typeof dataLoader === 'undefined') {
        // Wait for dataLoader to be available
        setTimeout(initializeDataBinding, 50);
        return;
    }
    
    const binder = new DataBinder(dataLoader);
    
    // Listen for all sections loaded event
    document.addEventListener('allSectionsLoaded', () => {
        // Initialize binder after all sections are loaded
        binder.init();
    });
    
    // Also try to initialize immediately in case event already fired
    if (document.querySelector('#hero')) {
        binder.init();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDataBinding);
} else {
    initializeDataBinding();
}
