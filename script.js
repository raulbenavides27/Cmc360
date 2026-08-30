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