let loadingMenu = document.querySelector('.loading-menu');
let startButton = document.querySelector('.start-button');
let retryButton = document.querySelector('.retry-button');
let quitButton = document.querySelector('.quit-button');
let gameOver = document.querySelector('.game-over');


startButton.addEventListener('click', function(){
    document.body.replaceChildren();
});

retryButton.addEventListener('click', function() {
    document.body.replaceChildren();
});

// vers la div game over
function displayGameOver() {
    document.body.replaceChildren(gameOver);
}

quitButton.addEventListener('click', function() {
    document.body.replaceChildren(loadingMenu);
});