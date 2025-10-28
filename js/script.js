// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Sticky header and active link highlight on scroll
window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(Links => {
                Links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);
};

// ✅ Corrected Intersection Observer (placed outside `onscroll`)
document.addEventListener("DOMContentLoaded", function () {
    const videoColumns = document.querySelectorAll(".video-column");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add the class when visible
            } else {
                entry.target.classList.remove("show"); // Remove the class when out of view
            }
        });
    }, { threshold: 0.3 });

    videoColumns.forEach(column => {
        observer.observe(column);
    });
});
