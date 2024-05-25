document.addEventListener('DOMContentLoaded', () => {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('click', () => {
            const email = card.querySelector('.fa-envelope').nextSibling.nodeValue.trim();
            window.location.href = `mailto:${email}`;
        });
    });
});
