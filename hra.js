let currentPlayer = 'circle';
const gameBox = document.querySelectorAll('.game__box');
//console.log(buttons);

const addPlayer = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
  }
};

gameBox.forEach((box) => {
  box.addEventListener('click', addPlayer);
});
