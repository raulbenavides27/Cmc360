document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MENÚ MÓVIL
    ========================= */

    const toggle = document.querySelector(".toggle");
    const links = document.querySelector(".links");

    if (!toggle || !links) {
        return;
    }

    toggle.addEventListener("click", function () {

        const isOpen = links.classList.toggle("open");

        toggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* =========================
       CERRAR MENÚ AL SELECCIONAR
       UNA OPCIÓN
    ========================= */

    links.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            links.classList.remove("open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});

// ============================================
// GEOLOCALIZACIÓN CON ipinfo.io (gratis, SIN TOKEN)
// ============================================
let locationLoaded = false;

async function getLocation() {
    if (locationLoaded) return;

    try {
        const response = await fetch('https://ipinfo.io/json');
        if (!response.ok) throw new Error('Error al obtener ubicación');
        const data = await response.json();

        document.getElementById('ubicacion_pais').value = data.country || '';
        document.getElementById('ubicacion_region').value = data.region || '';
        document.getElementById('ubicacion_ciudad').value = data.city || '';
        document.getElementById('ubicacion_codigo_postal').value = data.postal || '';

        locationLoaded = true;
        console.log('Ubicación cargada:', data);
    } catch (e) {
        console.log('Geolocalización no disponible:', e.message);
        locationLoaded = true;
    }
}

document.addEventListener('DOMContentLoaded', getLocation);

const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', async function(e) {
        if (!locationLoaded) {
            e.preventDefault();
            await getLocation();
            form.submit();
        }
    });
}


// ============================================
// APARICIÓN SUAVE DE CONTENIDOS AL DESPLAZARSE
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealTargets = [
        ".about > div",
        ".statsg .stat",
        ".service",
        ".sol",
        ".ctop > div",
        ".std",
        ".assessment > div",
        ".case",
        ".contactg > *"
    ];

    const elements = document.querySelectorAll(revealTargets.join(","));

    if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("is-visible");
        });
        return;
    }

    elements.forEach(function (element, index) {
        element.classList.add("js-reveal");
        element.dataset.revealDelay = String(index % 4);
    });

    const observer = new IntersectionObserver(function (entries, currentObserver) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });
});
