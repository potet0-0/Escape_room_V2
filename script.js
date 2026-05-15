// grab whatever was saved last time (so refreshing doesn't reset everything)
let hasSpoon = localStorage.getItem('hasSpoon') === 'true';
let count = parseInt(localStorage.getItem('count')) || 0;

// --- Cell page ---
// only run this stuff if we're actually on the cell page
if (document.getElementById('spoon')) {

    // if the player already picked up the spoon, skip the whole pickup thing
    if (hasSpoon) {
        const spoon = document.getElementById('spoon');
        spoon.style.opacity = '0'; // hide it
        spoon.style.pointerEvents = 'none'; // can't click a ghost
        document.getElementById('inventory').textContent = 'Spoon';
        document.getElementById('title').textContent = 'what is that hole in the wall doing?';
        document.body.style.backgroundImage = "url('assets/cell_with_hole.jpeg')"; // swap bg to show the hole
    }

    // show how many times they've dug so far
    document.getElementById('counter_display').textContent = count;

    // if they already dug enough, go ahead and show the escape button right away
    if (count >= 20) {
        document.getElementById('title').textContent = 'the hole is now an exit';
        document.getElementById('dig').style.pointerEvents = 'none'; // no more digging needed
        document.getElementById('escape').style.display = 'block';
        document.getElementById('escape_cell').style.display = 'block';
    }

    // clicking the spoon picks it up
    const spoon = document.getElementById('spoon');
    spoon.addEventListener('click', () => {
        hasSpoon = true;
        spoon.style.opacity = '0'; // make it disappear
        spoon.style.pointerEvents = 'none';
        document.getElementById('inventory').textContent = 'Spoon';
        document.getElementById('title').textContent = 'what is that hole in the wall doing?';
        document.body.style.backgroundImage = "url('assets/cell_with_hole.jpeg')";
        localStorage.setItem('hasSpoon', 'true'); // remember this for next time
    });

    const MAX_DIG = 20; // how many clicks to dig through the wall
    const digHole = document.getElementById('dig');
    digHole.addEventListener('click', () => {
        if (!hasSpoon) return; // can't dig with your bare hands lol
        count++;
        document.getElementById('counter_display').textContent = count;
        localStorage.setItem('count', count); // save progress
        if (count >= MAX_DIG) {
            // hole is big enough, time to escape
            document.getElementById('title').textContent = 'the hole is now an exit';
            digHole.style.pointerEvents = 'none';
            document.getElementById('escape').style.display = 'block';
            document.getElementById('escape_cell').style.display = 'block';
        }
    });

    // just tells the player to go to the next page
    document.getElementById('escape').addEventListener('click', () => {
        document.getElementById('title').textContent = '(move to cafeteria now)';
    });
}

// --- Cafeteria page ---
if (document.getElementById('bread')) {

    const bread = document.getElementById('bread');
    const cafeteriaDiv = document.querySelector('.body_cafeteria');
    const court = document.getElementById('court');

    // if the bread was already thrown, skip the animation and just show the broken window
    const breadThrown = localStorage.getItem('breadThrown') === 'true';
    if (breadThrown) {
        bread.style.display = 'none';
        cafeteriaDiv.style.backgroundImage = "url('assets/cafeteria_broken.png')";
        court.style.display = 'block';
        document.getElementById('cafeteria_text').textContent = 'jump out the broken window!';
    }

    // click the bread to throw it at the window
    bread.addEventListener('click', () => {
        // move bread toward the window (CSS transition handles the animation)
        bread.style.left = '48%';
        bread.style.top  = '25%';
        bread.style.pointerEvents = 'none'; // mid-flight, can't click it again

        // after 1 second, swap to the broken window scene
        setTimeout(() => {
            bread.style.display = 'none';
            cafeteriaDiv.style.backgroundImage = "url('assets/cafeteria_broken.png')";
            court.style.display = 'block';
            document.getElementById('cafeteria_text').textContent = 'jump out the broken window!';
            localStorage.setItem('breadThrown', 'true'); // save so it stays broken on reload
        }, 1000);
    });
}

// --- Hallway page ---
// just mark that the player has seen the code clue
if (document.getElementById('go_back')) {
    localStorage.setItem('seenCode', 'true');
}

// --- Code room page ---
if (document.getElementById('keypad')) {

    const SECRET_CODE = '825'; // shhh
    let entered = ''; // what the player has typed so far

    // update the little display to show _ _ _ or whatever they've entered
    function updateDisplay() {
        const padded = entered.padEnd(3, '_'); // fill remaining digits with underscores
        document.getElementById('code_display').textContent = padded.split('').join(' ');
    }

    // called when a number button is pressed
    window.pressKey = (num) => {
        if (entered.length >= 3) return; // already full, ignore
        entered += num;
        document.getElementById('code_message').textContent = ''; // clear any old error
        updateDisplay();
    };

    // backspace basically
    window.pressDelete = () => {
        entered = entered.slice(0, -1);
        updateDisplay();
    };

    // check if the code is right when they hit enter
    window.pressEnter = () => {
        if (entered.length < 3) {
            document.getElementById('code_message').textContent = 'enter all 3 digits';
            return;
        }
        if (entered === SECRET_CODE) {
            // correct! go to the victory screen after a short pause
            document.getElementById('code_message').style.color = 'green';
            document.getElementById('code_message').textContent = 'correct!';
            localStorage.setItem('codeUnlocked', 'true');
            setTimeout(() => {
                window.location.href = 'victory.html';
            }, 1500);
        } else {
            // wrong, reset and let them try again
            document.getElementById('code_message').style.color = 'red';
            document.getElementById('code_message').textContent = 'wrong code';
            entered = '';
            updateDisplay();
        }
    };
}