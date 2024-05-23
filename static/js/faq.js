document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const email = item.querySelector('.btn-primary').href;
            window.location.href = email;
        });
    });
});
