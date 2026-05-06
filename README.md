[index.html](https://github.com/user-attachments/files/27454881/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oise au Jardin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="logo">Oise au Jardin</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Header -->
    <header id="home" class="hero">
        <div class="container">

            <!-- IMAGE INSERTED HERE -->
            <img src="./images/logo.png" alt="Oise au Jardin logo"
                 style="max-width: 100%; height: auto; margin-bottom: 20px; border-radius: 12px;">

            <h1>Welcome to Oise au Jardin</h1>
            <p>Build something amazing today</p>
            <button class="btn">Get Started</button>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Us</h2>
            <p>My name is Thomas Legros. I am 14 and this is a website I am building.</p>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="service-grid">
                <div class="service-card">
                    <h3>Service 1</h3>
                    <p>Description of your first service goes here.</p>
                </div>
                <div class="service-card">
                    <h3>Service 2</h3>
                    <p>Description of your second service goes here.</p>
                </div>
                <div class="service-card">
                    <h3>Service 3</h3>
                    <p>Description of your third service goes here.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Get in Touch</h2>

            <form class="contact-form"
                  action="https://formspree.io/f/mkoyzggz"
                  method="POST">

                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>

                <button type="submit" class="btn">Send Message</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 My Website. All rights reserved. Need help? Contact: ciril8596@gmail.com</p>
        </div>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
