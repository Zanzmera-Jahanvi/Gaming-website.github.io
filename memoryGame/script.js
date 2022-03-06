
document.addEventListener("DOMContentLoaded", () => {
  // card options

  const cardArray = [
    {
      name: "fries",
      img: "img/fries.png",
    },
    {
      name: "fries",
      img: "img/fries.png",
    },
    {
      name: "pizza",
      img: "img/pizza.png",
    },
    {
      name: "pizza",
      img: "img/pizza.png",
    },
    {
      name: "milkshake",
      img: "img/milkshake.png",
    },
    {
      name: "milkshake",
      img: "img/milkshake.png",
    },
    {
      name: "cheeseburger",
      img: "img/cheeseburger.png",
    },
    {
      name: "cheeseburger",
      img: "img/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "img/hotdog.png",
    },
    {
      name: "hotdog",
      img: "img/hotdog.png",
    },
    {
      name: "icecream",
      img: "img/ice-cream.png",
    },
    {
      name: "icecream",
      img: "img/ice-cream.png",
    },
  ];

  //set randomly img for refresh or complete the game or loosing the game
  cardArray.sort(()=> 0.5 - Math.random());

  // grab the grid to make a game board
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardWon = [];
  //   creating a function to make  game Board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "img/blank.png");
      card.setAttribute("data-id", i);
      // i for card's length in this case it is 12

      card.addEventListener("click", flipcard);
      grid.appendChild(card);
    }
  }
  createBoard();
  //   check for matching
  function checkForMatch() {
    let card = document.querySelectorAll("img");
    const optionIdOne = cardsChosenId[0];
    const optionIdtwo = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert("Great You Found The Match !");
      card[optionIdOne].setAttribute("src", "img/white.png");
      card[optionIdtwo].setAttribute("src", "img/white.png");
      cardWon.push(cardsChosen);
    } else {
      card[optionIdOne].setAttribute("src", "img/blank.png");
      card[optionIdtwo].setAttribute("src", "img/blank.png");
      alert("Sorry , Try Again ...!");
    }

    // for fliping again
    cardsChosen = [];
    cardsChosenId = [];

    resultDisplay.textContent = cardWon.length;
    // card won == 6(total cards are 12 then)
    if (cardWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulation ! You Found Them All...";
    }
  }

  // flip your card
  function flipcard() {
    let cardId = this.getAttribute("data-id");
    // cardchosen is an empty array i try to push the card array with its id and name(name because it will help me to find mathing card using same names)
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    // why this because its is a click function it will set img accordingly their id
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
});
