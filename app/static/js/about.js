let currentProfileIndex = 0;
let slideDirection = 'horizontal';

function slideProfiles(direction) {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        profile.style.display = 'none';
    });

    currentProfileIndex = (currentProfileIndex + 1) % profiles.length;

    if (direction === 'horizontal') {
        slideDirection = 'horizontal';
        profiles.forEach(profile => {
            profile.style.display = 'inline-block';
        });
        document.querySelector('.profiles').style.flexDirection = 'row';
    } else {
        slideDirection = 'vertical';
        profiles.forEach(profile => {
            profile.style.display = 'block';
        });
        document.querySelector('.profiles').style.flexDirection = 'column';
    }

    profiles[currentProfileIndex].style.display = 'block';
}

// Initialize by displaying the first profile in horizontal mode
document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        profile.style.display = 'none';
    });

    profiles[0].style.display = 'block';
});
