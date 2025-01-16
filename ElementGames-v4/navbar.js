// navbar.js
document.addEventListener("DOMContentLoaded", function () {
    // Authentication check code


    const navbarContent = `
    <nav>
        <ul>
            <li><a href="/ElementGames-v4/index.html">Home</a></li>
            <li><a href="/ElementGames-v4/account.html">Account</a></li>
            <hr>
            <li><a href="/ElementGames-v4/feedback.html">Feedback</a></li>
            <li><a href="/ElementGames-v4/feedback.html">Request a Game</a></li>
            <!-- Add more links as needed -->
        </ul>
        
    </nav>
    <button id="navbar-toggle">
        <img src="/ElementGames-v4/media/nb-icon.png" alt="Toggle Navbar">
    </button>
    
`;

    // Function to inject navbar content into the page
    function loadNavbar() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = navbarContent;
            document.getElementById('navbar-toggle').addEventListener('click', toggleNavbar);
        }
    }

    // Navbar toggle functionality
    function toggleNavbar() {
        var navbar = document.getElementById("navbar");
        var mainContent = document.getElementById("main-content");
        if (navbar.style.left === "0px") {
            navbar.style.left = "-250px";
            mainContent.style.marginLeft = "0";
        } else {
            navbar.style.left = "0px";
            mainContent.style.marginLeft = "250px";
        }
    }

    // Ensure the navbar is correctly positioned on load
    window.onload = function () {
        loadNavbar();
        document.getElementById("navbar").style.left = "0px";
    };
});