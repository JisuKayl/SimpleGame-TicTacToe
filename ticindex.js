window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = Array(9).fill("");
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const announce = (type) => {
    const messages = {
      [PLAYERO_WON]:
        'Player <span class="playerO" style="margin-inline: 0.5rem">O</span> Won',
      [PLAYERX_WON]:
        'Player <span class="playerX" style="margin-inline: 0.5rem">X</span> Won',
      [TIE]: "Tie",
    };
    announcer.innerHTML = messages[type];
    announcer.classList.remove("hide");
  };

  const handleResultValidation = () => {
    const roundWon = winningConditions.some((condition) => {
      const [a, b, c] = condition.map((index) => board[index]);
      return a && a === b && b === c;
    });

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
    } else if (!board.includes("")) {
      announce(TIE);
    }
  };

  const isValidAction = (tile) => !tile.innerText;

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.replace(
      `player${currentPlayer}`,
      `player${currentPlayer === "X" ? "O" : "X"}`
    );
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      if (isGameActive) changePlayer();
    }
  };

  const resetBoard = () => {
    board.fill("");
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.className = "tile";
    });
  };

  tiles.forEach((tile, index) =>
    tile.addEventListener("click", () => userAction(tile, index))
  );

  resetButton.addEventListener("click", resetBoard);
});
