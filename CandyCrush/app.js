document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const width = 8; // to make grid 8 * 8 = 64
    let score = 0;
    let scoreDisplay = document.getElementById('score');

    // for more work on it i have to store in empty array and push divs on it
    const squres = [];
    const candyColor = [
    "url(img/blue-candy.png)", 
    "url(img/green-candy.png)",
    "url(img/orange-candy.png)",
    "url(img/purple-candy.png)", 
    "url(img/red-candy.png)",
    "url(img/yellow-candy.png)"
   
];

    // creating a Board

    function createBoard() {
        // 64
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("draggable", true);
            square.setAttribute("id", i); // set id as a string but it was a number between 0 - 63 (64)
            square.style.cursor = "pointer";
            // console.log(i)
            let randomColor = Math.floor(Math.random() * candyColor.length);
            square.style.backgroundImage = candyColor[randomColor];
            grid.appendChild(square);
            squres.push(square);
        }
    }
    createBoard();

    let colorBeingDragged; // for drag Start
    let colorBeingReplaced; // for drag End
    let squreIdBeingDragged; // for giveing id's to candies
    let squreIdBeingReplaced; // for which id is replace

    // drag the blockss
    squres.forEach((square) => square.addEventListener("dragstart", dragStart));
    squres.forEach((square) => square.addEventListener("dragend", dragEnd));
    squres.forEach((square) => square.addEventListener("dragenter", dragEnter));
    squres.forEach((square) => square.addEventListener("dragover", dragOver));
    squres.forEach((square) => square.addEventListener("dragleave", dragLeave));
    squres.forEach((square) => square.addEventListener("drop", dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squreIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged); // which color block is now dragged
        console.log(this.id, "dragstart");
    }
    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, "dragOver");
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, "dragEnter");
    }
    function dragLeave() {
        console.log(this.id, "dragLeave");
    }
    function dragEnd() {
        console.log(this.id, "dragEnd");
        // valid moves
        let validMoves = [
            // top,left,bottom,right
            squreIdBeingDragged - 1, // left
            squreIdBeingDragged - width, //top each squre are size in 8
            squreIdBeingDragged + 1, // right
            squreIdBeingDragged + width, // bottom
        ];
        let validMove = validMoves.includes(squreIdBeingReplaced);
        if (squreIdBeingReplaced && validMove) {
            squreIdBeingReplaced = null;
        } else if (squreIdBeingReplaced && !validMove) {
            squres[squreIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squres[squreIdBeingDragged].style.backgroundImage = colorBeingDragged;
        } else {
            squres[squreIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }
    }

    function dragDrop() {
        console.log(this.id, "dragDrop");
        colorBeingReplaced = this.style.backgroundImage;
        squreIdBeingReplaced = parseInt(this.id); // my id was a string
        this.style.backgroundImage = colorBeingDragged;
        console.log("color " + colorBeingReplaced);
        // store and set the color which is replacing
        // orignal squre being drag  to give new color
        squres[squreIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    // drop candies 
    function moveDown()
    {
        for(let i = 0 ; i < 55; i++)
        {
            // width is 8 
            if(squres[i + width].style.backgroundImage === '')
            {
                //give color to squre which will moved down
                squres[i + width].style.backgroundImage = squres[i].style.backgroundImage
                // and set empty background to the orrignal squre
                squres[i].style.backgroundImage = ''
                // generating new random candies
                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                if(isFirstRow && squres[i].style.backgroundImage === ''){
                    let randomColor = Math.floor(Math.random() * candyColor.length)
                    squres[i].style.background = candyColor[randomColor]
                }
            }
        }
    }



    // cheking for matching
    // check for three row
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) {
            // 61,62,63
            let rowOfThree = [i, i + 1, i + 2];
            let decideColor = squres[i].style.backgroundImage;
            const isBlank = squres[i].style.backgroundImage === "";

            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
            if(notValid.includes(i)){
                continue
            }

            if (rowOfThree.every((index) => squres[index].style.backgroundImage === decideColor && !isBlank)) 
            {
                score += 3;
                scoreDisplay.innerHTML = score
                rowOfThree.forEach((index) => {
                    squres[index].style.backgroundImage = "";
                });
            }
        }
    }

    // check for threeColumn
    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) {
            // last column is 47 like this [47,55,63] loop will stop here 
            let ColumnOfThree = [i, i + width, i + width * 2];
            let decideColor = squres[i].style.backgroundImage;
            const isBlank = squres[i].style.backgroundImage === "";

            if (ColumnOfThree.every((index) => squres[index].style.backgroundImage === decideColor && !isBlank)) 
            {
                score += 3;
                scoreDisplay.innerHTML = score
                ColumnOfThree.forEach((index) => {
                    squres[index].style.backgroundImage = "";
                });
            }
        }
    }
    function checkRowForFour() {
        for (let i = 0; i < 60; i++) {
            // 60,61,62,63
            let rowOfFour = [i, i + 1, i + 2 ,i + 3];
            let decideColor = squres[i].style.backgroundImage;
            const isBlank = squres[i].style.backgroundImage === "";

            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
            if(notValid.includes(i)){
                continue
            }

            if (rowOfFour.every((index) => squres[index].style.backgroundImage === decideColor && !isBlank)) 
            {
                score += 4;
                scoreDisplay.innerHTML = score
                rowOfFour.forEach((index) => {
                    squres[index].style.backgroundImage = "";
                });
            }
        }
    }

    // check for threeColumn
    function checkColumnForFour() {
        for (let i = 0; i < 47; i++) {
            // last column is 47 like this [47,55,63] loop will stop here 
            let ColumnOfFour = [i, i + width, i + width * 2 , i + width * 3];
            let decideColor = squres[i].style.backgroundImage;
            const isBlank = squres[i].style.backgroundImage === "";

            if (ColumnOfFour.every((index) => squres[index].style.backgroundImage === decideColor && !isBlank)) 
            {
                score += 4;
                scoreDisplay.innerHTML = score
                ColumnOfFour.forEach((index) => {
                    squres[index].style.backgroundImage = "";
                });
            }
        }
    }
    checkColumnForFour();
    // 24
    window.setInterval(function () {
        moveDown()
        checkRowForThree();
        checkColumnForThree();
        checkRowForFour()
        checkColumnForFour()
    }, 100);
});
