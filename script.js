// Load saved state
let hasSpoon = localStorage.getItem('hasSpoon') === 'true';
let count = parseInt(localStorage.getItem('count')) || 0;

// --- Cell page ---
if (document.getElementById('spoon')) {

    if (hasSpoon) {
        const spoon = document.getElementById('spoon');
        spoon.style.opacity = '0';
        spoon.style.pointerEvents = 'none';
        document.getElementById('inventory').textContent = 'Spoon';
        document.getElementById('title').textContent = 'what is that hole in the wall doing?';
        document.body.style.backgroundImage = "url('assets/cell_with_hole.jpeg')";
    }

    document.getElementById('counter_display').textContent = count;

    if (count >= 20) {
        document.getElementById('title').textContent = 'the hole is now an exit';
        document.getElementById('dig').style.pointerEvents = 'none';
        document.getElementById('escape').style.display = 'block';
        document.getElementById('escape_cell').style.display = 'block';
    }

    const spoon = document.getElementById('spoon');
    spoon.addEventListener('click', () => {
        hasSpoon = true;
        spoon.style.opacity = '0';
        spoon.style.pointerEvents = 'none';
        document.getElementById('inventory').textContent = 'Spoon';
        document.getElementById('title').textContent = 'what is that hole in the wall doing?';
        document.body.style.backgroundImage = "url('assets/cell_with_hole.jpeg')";
        localStorage.setItem('hasSpoon', 'true');
    });

    const MAX_DIG = 20;
    const digHole = document.getElementById('dig');
    digHole.addEventListener('click', () => {
        if (!hasSpoon) return;
        count++;
        document.getElementById('counter_display').textContent = count;
        localStorage.setItem('count', count);
        if (count >= MAX_DIG) {
            document.getElementById('title').textContent = 'the hole is now an exit';
            digHole.style.pointerEvents = 'none';
            document.getElementById('escape').style.display = 'block';
            document.getElementById('escape_cell').style.display = 'block';
        }
    });

    document.getElementById('escape').addEventListener('click', () => {
        document.getElementById('title').textContent = '(move to cafeteria now)';
    });
}


////Cafeteria page
if (document.getElementById('bread')) {

    const bread = document.getElementById('bread');
    const cafeteriaDiv = document.querySelector('.body_cafeteria');

    // Restore state on page load
    const breadThrown = localStorage.getItem('breadThrown') === 'true';
    if (breadThrown) {
        bread.style.display = 'none';
        cafeteriaDiv.style.backgroundImage = "url('assets/cafeteria_broken.png')";
    }

    bread.addEventListener('click', () => {
        bread.style.left = '48%';
        bread.style.top  = '25%';
        bread.style.pointerEvents = 'none';

        setTimeout(() => {
            bread.style.display = 'none';
            cafeteriaDiv.style.backgroundImage = "url('assets/cafeteria_broken.png')";
            localStorage.setItem('breadThrown', 'true'); // save it
        }, 1000);
    });
}