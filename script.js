document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.querySelector(".toggle");
    const links = document.querySelector(".links");

    if (!toggle || !links) {
        return;
    }

    toggle.addEventListener("click", function () {
        links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            links.classList.remove("open");
        });

    });

});