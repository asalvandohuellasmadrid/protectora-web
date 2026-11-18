document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const nav = header && header.querySelector('nav');

    if (header && nav) {
        if (!nav.id) nav.id = 'navegacion-principal';

        nav.querySelectorAll('a.activo').forEach(function (link) {
            link.setAttribute('aria-current', 'page');
        });

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'menu-toggle';
        toggle.textContent = '☰';
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        toggle.setAttribute('aria-controls', nav.id);
        toggle.setAttribute('aria-expanded', 'false');
        nav.parentNode.insertBefore(toggle, nav);

        function closeMenu() {
            header.classList.remove('menu-abierto');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }

        toggle.addEventListener('click', function () {
            const isOpen = header.classList.toggle('menu-abierto');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });
    }

    const callLink = document.createElement('a');
    callLink.className = 'boton-llamada-flotante';
    callLink.href = 'tel:+34624808250';
    callLink.setAttribute('aria-label', 'Llamar a APA Salvando Huellas Madrid al 624 808 250');
    callLink.title = 'Llamar por teléfono';
    callLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.57.56.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.19 2.45.56 3.57.11.36.02.76-.25 1.03l-2.19 2.19Z"/></svg>';
    document.body.appendChild(callLink);

    const form = document.querySelector('[data-contact-form]');
    if (form) {
        const estado = document.getElementById('estadoFormulario');
        const parametros = new URLSearchParams(window.location.search);

        if (estado && parametros.get('enviado') === '1') {
            estado.textContent = 'Gracias, tu mensaje se ha enviado. La asociación se pondrá en contacto contigo.';
        }
    }
});
