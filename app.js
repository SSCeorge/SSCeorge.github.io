document.addEventListener('DOMContentLoaded', function () {
    //Toggle search and mag button
    const searchDiv = document.querySelector('.search-pro');
    const closeSrch = document.querySelector('.close-search');
    const searchBtn = document.querySelector('.mag-btn');
    const portSec = document.getElementById('port-sec');
    const inactive = document.querySelectorAll('.control-btn:not(#port-sec)');

    searchBtn.addEventListener('click', function () {
        searchDiv.style.display = 'flex';
        searchDiv.style.justifyContent = 'space-evenly';
    });

    closeSrch.addEventListener('click', function () {
        searchDiv.style.display = 'none';
    });

    portSec.addEventListener('click', function () {
        searchBtn.style.display = 'flex';
    });

    inactive.forEach(control => {
        control.addEventListener('click', function () {
            searchBtn.style.display = 'none';
        });
    });

    //Search projects function
    const searchInput = document.getElementById('search-input');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        portfolioItems.forEach(item => {
            const projectName = item.querySelector('h2').textContent.toLowerCase();
            item.style.display = projectName.includes(searchTerm) ? 'block' : 'none';
        });
    });

    //Expand project description
    document.querySelectorAll('.expand').forEach(expandButton => {
        expandButton.addEventListener('click', function (event) {
            event.preventDefault();
            const textContainer = this.closest('.por-item-desc');
            textContainer.classList.toggle('expanded');
        });
    });

    //Toggle Dark/Light Mode
    const controls = document.querySelectorAll('.control-btn');
    const themeBtn = document.querySelector('.theme-btn');

    controls.forEach(button => button.addEventListener('click', function () {
        document.querySelector('.active-btn').classList.remove('active-btn');
        this.classList.add('active-btn');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(button.dataset.id).classList.add('active');
    }));

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    //Mail service
    function submitForm() {
        const form = document.getElementById('contactForm');
        const statusMessage = document.getElementById('statusMessage');
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                statusMessage.textContent = data.message;
                form.reset();
            })
            .catch(error => {
                statusMessage.textContent = 'An error occurred while submitting the form.';
            });
    }
});