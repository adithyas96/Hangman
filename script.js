const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let selectedWord;

function getRandomword(){
    let value = '';
    fetch('https://random-word-api.herokuapp.com//word?number=1')
    .then(res => res.json())
    .then(data => {
        //console.log(data[0]);
        selectedWord = data[0];
        value = data[0];
        console.log(value);
       // return data[0].word;
    });
    selectedWord = value;
    
}


// function getRandomword(){
//     let response = fetch('https://random-word-api.herokuapp.com//word?number=1');
//     console.log(response.data);
    //onsole.log(fetch('https://random-word-api.herokuapp.com//word?number=1').data);
    //.then(res => res.json())
    // .then(data => {
    //     console.log(data[0]);
    //     selectedWord = data[0].toLowerCase().replace('-','').replace(' ','');
    //     console.log(selectedWord);
    //     value = data[0];
    //    // return data[0].word;
    // });
    // selectedWord = value;
//}


//const words = ['application', 'programming', 'interface', 'wizard'];

//let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//console.log(selectedWord);

function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `).join('')
        }
    `;
    
    //console.log(selectedWord);
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!';
        popup.style.display = 'flex';
    }
    
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost. The word was ${selectedWord}`;
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


window.addEventListener('keydown', e => {
    if(e.keyCode >=65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    getRandomword();

    //console.log(selectedWord);
    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

getRandomword();


