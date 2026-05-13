localStorage.clear();
let hasSpoon = false;

const spoon = document.getElementById('spoon');

spoon.addEventListener('click', () => {
    hasSpoon = true;
    spoon.style.opacity = '0';
    spoon.style.pointerEvents = 'none';

    document.getElementById('inventory').textContent = 'Spoon';
    sessionStorage.setItem('hasSpoon', 'true');
    document.getElementById('title').textContent = 'what is that hole in the wall doing?'

    document.body.style.backgroundImage = "url('assets/cell_with_hole.jpeg')";
});


console.log(sessionStorage.getItem('hasSpoon'));


//hide hole untill spoon is true
if (hasSpoon === false) {
    document.getElementById('dig').style.display = 'none';
    if (hasSpoon === true) {
        document.getElementById('dig').style.display = 'block';
    }
}


let digHole = document.getElementById('dig')
let count = 0;
const MAX_DIG = 20;

digHole.addEventListener('click', () => {
    if (hasSpoon) {
        count++;
    }
    document.getElementById('counter_display').textContent = count;

    if (count >= MAX_DIG) {
        document.getElementById('title').textContent = 'the hole is now an exit';
        digHole.style.pointerEvents = 'none';
    }
});