
let tile = document.querySelector(".tile"); 
let tileContainer = tile.parentNode; 
let winDisplay = document.querySelector(".winpopup");

winDisplay.remove();



let tileArray = []; 
tileArray[0] = new Tile(tile, tile.querySelector("p")); 

let xPlays = true;  

enableStartAs();

for(let i = 0; i < 8; i++){
    let newTile = tile.cloneNode(true); 
    tileContainer.appendChild(newTile);
    tileArray.push(new Tile(newTile, newTile.querySelector("p")));
}

tileArray.forEach(tile => {
    tile.tile.addEventListener('click', () =>{
        if(tile.tileText.textContent != "")return;
        disableStartAs();

        tile.tileText.textContent = xPlays?"X":"O"; 
        xPlays = !xPlays; 
        let winner = winCheck();
        if(winner){
            displayWinner(winner); 
        }
    })
});

function Tile(tile,tileText){
    this.title = tile; 
    this.tileText = tileText; 

    return {tile,tileText};
}


function winCheck(){

    let straights = checkStraights(true);
    let diagonals = checkDiagonals(true); 

    if(!straights && !diagonals){
        return checkTie();
    }
    return straights?straights:diagonals;
}

function checkStraights(rows){
    for(let i = 0; i < 3; i++){
        let check = tileArray[rows?i * 3:i].tileText.textContent; 
        for(let j = 1; j < 3; j++){
            if(tileArray[rows?i*3 +j:j*3+i].tileText.textContent == "" || check != tileArray[rows?i*3 +j:j*3+i].tileText.textContent) break; 
            if(j == 2){
                return check;
            }
        }
    }
    return rows?checkStraights(false):false;
}

function checkDiagonals(leftToRight){
    let check = tileArray[leftToRight?0:2].tileText.textContent; 
    for(let i = 1; i < 3; i++){
        if(tileArray[i * 3 +(leftToRight?i:2-i)].tileText.textContent == "" || check != tileArray[i * 3 +(leftToRight?i:2-i)].tileText.textContent) break; 
        if(i == 2){
            return check;
        }
    }
    return leftToRight?checkDiagonals(false):false;
}
function checkTie(){

    for(let i = 0; i < tileArray.length; i++){
        if(tileArray[i].tileText.textContent == "") return false; 
    }
    return "tie";
}


function displayWinner(winner){
    let winTextDisplay; 
    if(winner == "X" || winner == "O"){
        winTextDisplay = `${winner} has won!`; 
    }
    else{
        winTextDisplay = "You have tied";
    }

    let newDisplay = winDisplay.cloneNode(true);

    newDisplay.querySelector("button").addEventListener('click', () =>{
        newDisplay.remove();
        resetGame();
    })
    newDisplay.querySelector(".winner").textContent = winTextDisplay; 
    document.querySelector("body").appendChild(newDisplay);



}

function disableStartAs(){
    document.querySelector(".buttons button").disabled = true;
}
function enableStartAs(){
    let button = document.querySelector(".buttons button");
    button.disabled = false;

    button.addEventListener('click', () =>{
        xPlays = !xPlays;
        button.textContent = `Start as ${xPlays?"X":"O"}`;
    })
}

function resetGame(){
    tileArray.forEach(tile => {
        tile.tileText.textContent = "";
    });

    xPlays = true;
    enableStartAs();
}