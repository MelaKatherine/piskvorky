let currentPlayer = 'circle';
const gameBox = document.querySelectorAll('.game__box');
const iconPlayer = document.querySelector('.game__icon--player');
//console.log(buttons);

const addPlayer = (event) => {
  event.target.disabled = true;
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    iconPlayer.src = 'podklady/circle.svg';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    iconPlayer.src = 'podklady/cross.svg';
  }
};

gameBox.forEach((box) => {
  box.addEventListener('click', addPlayer);
});
