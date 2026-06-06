/* KB Medizintechnik — i18n.js */
(function () {
  var translations = {
    fr: {},
    de: {
      'nav.home':        'Startseite',
      'nav.catalog':     'Katalog',
      'nav.specialties': 'Fachgebiete',
      'nav.gyneco':      'Gynäkologie',
      'nav.steril':      'Sterilisation',
      'nav.hospital':    'Spital &amp; Pflegeheim',
      'nav.company':     'Unternehmen',
      'btn.quote':       'Offerte',
      'btn.order':       'Bestellen',
      'btn.account':     'Mein Konto',
      'footer.h.catalog':   'Katalog',
      'footer.see-all':     'Alle anzeigen',
      'footer.audiologie':  'Audiologie',
      'footer.endoscopie':  'Endoscopie',
      'footer.consommables':'Verbrauchsmaterial',
      'footer.hygiene':     'Hygiene',
      'footer.quote-req':   'Offertanfrage',
      'footer.h.company':   'Unternehmen',
      'footer.about':       'Über uns',
      'footer.rdv':         'Termin vereinbaren',
      'footer.team':        'Teambereich',
      'footer.h.legal':     'Rechtliches',
      'footer.mentions':    'Impressum',
      'footer.privacy':     'Datenschutz',
      'footer.cgv':         'AGB',
      'footer.certs':       'Zertifizierungen',
      'footer.swiss':       'Schweizer Unternehmen',
      'footer.legal-link':  'Impressum',
      'footer.privacy-link':'Datenschutzerklärung',
      'footer.cgv-link':    'AGB',
      'footer.team-link':   'Teambereich'
    },
    it: {
      'nav.home':        'Home',
      'nav.catalog':     'Catalogo',
      'nav.specialties': 'Specialità',
      'nav.gyneco':      'Ginecologia',
      'nav.steril':      'Sterilizzazione',
      'nav.hospital':    'Ospedale &amp; RSA',
      'nav.company':     'Azienda',
      'btn.quote':       'Preventivo',
      'btn.order':       'Ordina',
      'btn.account':     'Il mio account',
      'footer.h.catalog':   'Catalogo',
      'footer.see-all':     'Vedi tutto',
      'footer.audiologie':  'Audiologia',
      'footer.endoscopie':  'Endoscopia',
      'footer.consommables':'Materiale di consumo',
      'footer.hygiene':     'Igiene',
      'footer.quote-req':   'Richiesta preventivo',
      'footer.h.company':   'Azienda',
      'footer.about':       'Chi siamo',
      'footer.rdv':         'Appuntamento',
      'footer.team':        'Area team',
      'footer.h.legal':     'Legale',
      'footer.mentions':    'Note legali',
      'footer.privacy':     'Privacy',
      'footer.cgv':         'CGV',
      'footer.certs':       'Certificazioni',
      'footer.swiss':       'Azienda svizzera',
      'footer.legal-link':  'Note legali',
      'footer.privacy-link':'Informativa privacy',
      'footer.cgv-link':    'CGV',
      'footer.team-link':   'Area team'
    },
    en: {
      'nav.home':        'Home',
      'nav.catalog':     'Catalogue',
      'nav.specialties': 'Specialties',
      'nav.gyneco':      'Gynaecology',
      'nav.steril':      'Sterilisation',
      'nav.hospital':    'Hospital &amp; Care',
      'nav.company':     'Company',
      'btn.quote':       'Quote',
      'btn.order':       'Order',
      'btn.account':     'My Account',
      'footer.h.catalog':   'Catalogue',
      'footer.see-all':     'View all',
      'footer.audiologie':  'Audiology',
      'footer.endoscopie':  'Endoscopy',
      'footer.consommables':'Consumables',
      'footer.hygiene':     'Hygiene',
      'footer.quote-req':   'Request a quote',
      'footer.h.company':   'Company',
      'footer.about':       'About us',
      'footer.rdv':         'Book an appointment',
      'footer.team':        'Team Space',
      'footer.h.legal':     'Legal',
      'footer.mentions':    'Legal Notice',
      'footer.privacy':     'Privacy',
      'footer.cgv':         'Terms',
      'footer.certs':       'Certifications',
      'footer.swiss':       'Swiss Company',
      'footer.legal-link':  'Legal Notice',
      'footer.privacy-link':'Privacy Policy',
      'footer.cgv-link':    'Terms &amp; Conditions',
      'footer.team-link':   'Team Space'
    }
  };

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'fr';

    document.documentElement.lang = lang === 'de' ? 'de' : lang === 'it' ? 'it' : lang === 'en' ? 'en' : 'fr';

    var t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!el.dataset.i18nFr) {
        el.dataset.i18nFr = el.innerHTML.trim();
      }
      var key = el.dataset.i18n;
      if (lang === 'fr') {
        el.innerHTML = el.dataset.i18nFr;
      } else if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    try { localStorage.setItem('kb_lang', lang); } catch (e) {}
  }

  window.setLanguage = function (lang) {
    applyLanguage(lang);
    return false;
  };

  window.initLanguage = function () {
    var stored = 'fr';
    try { stored = localStorage.getItem('kb_lang') || 'fr'; } catch (e) {}
    applyLanguage(stored);
  };
})();
