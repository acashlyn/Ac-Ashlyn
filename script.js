// Toggle menu icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link highlight
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
                let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            });

            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header effect
    let header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);

    // Hide menu when clicking on a navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Modal popup for extra images
const modal = document.createElement('div');
modal.classList.add('image-modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-images"></div>
    </div>
`;
document.body.appendChild(modal);

const modalImagesContainer = modal.querySelector('.modal-images');
const closeModalButton = modal.querySelector('.close');

// Function to show modal with images
document.querySelectorAll('.room').forEach(room => {
    room.addEventListener('click', () => {
        let extraImagesContainer = room.querySelector('.extra-images');

        // Check if the room has extra images
        if (extraImagesContainer) {
            modalImagesContainer.innerHTML = ''; // Clear previous images

            // Loop through the images inside extra-images container and append to modal
            extraImagesContainer.querySelectorAll('img').forEach(img => {
                let clonedImg = img.cloneNode(); // Clone each <img> element
                modalImagesContainer.appendChild(clonedImg); // Add the cloned image to the modal
            });

            // Show the modal
            modal.style.display = 'flex';

            // Zoom-in effect
            setTimeout(() => {
                modal.classList.add('show');
            }, 50);
        } else {
            console.log('No extra images found in this room.');
        }
    });
});

// Close modal when clicking the close button
closeModalButton.addEventListener('click', () => {
    closeModal();
});

// Close modal when clicking outside the content
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Function to close modal
function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}
