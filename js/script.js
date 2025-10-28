// 🌐 Select elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// 🍔 Toggle icon navbar
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// 📜 Sticky header + Active link highlight on scroll
window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);

    // Close menu when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// 🎬 Intersection Observer for video-column animations + YouTube autoplay control
document.addEventListener("DOMContentLoaded", function () {
    const videoColumns = document.querySelectorAll(".video-column iframe");

    // Initialize YouTube Player API (only if iframes exist)
    function enableYouTubeAPI() {
        if (!window.YT) {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }
    enableYouTubeAPI();

    // Wait for YouTube API to load
    window.onYouTubeIframeAPIReady = function () {
        const players = [];

        videoColumns.forEach((iframe, index) => {
            const player = new YT.Player(iframe, {
                events: {
                    'onReady': () => {
                        // Observe each iframe when API ready
                        observer.observe(iframe);
                    }
                }
            });
            players.push(player);
        });

        // Intersection Observer for autoplay/pause
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const iframe = entry.target;
                const player = players.find(p => p.getIframe() === iframe);
                if (!player) return;

                if (entry.isIntersecting) {
                    player.playVideo();
                    iframe.classList.add("show");
                } else {
                    player.pauseVideo();
                    iframe.classList.remove("show");
                }
            });
        }, { threshold: 0.5 });
    };
});
