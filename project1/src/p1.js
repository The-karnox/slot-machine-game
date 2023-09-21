// i- deposit
// ii- determine no.of lines
//iii- collect amt
// iv- spin machine
// v - check if the user won
// vi- give the winnings
//vii- play again
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
 };

 const SYMBOLS_VALUES = {
   A: 5,
   B: 4,
   C: 3,
   D: 2,
  };




const deposit = () => {
    while (true){
const depositAmount = prompt("enter a deposit amount: ")
      const numberDepositAmount = parseFloat(depositAmount);

      if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("invalid depositAmount, try again");
     }else{
      return numberDepositAmount;
     }
    }
 };


 const getNumberOfLines =  () => {
    while (true){
const  Lines = prompt("enter no. of lines:(1-3) ")
      const numberOfLines = parseFloat(Lines);

      if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3){
        console.log("invalid no.ofLines, try again");
     }else{
      return numberOfLines;
     }
    }
 };
  const getBet = (balance,Lines) =>{
    while (true){
    const bet = prompt("enter the  bet per line: ")
    const numBet = parseFloat(bet);

      if(isNaN(numBet) || numBet<=0 || numBet>balance/Lines){
        console.log("invalid bet(try again): ");
     }else{
      return numBet;
     }
    }
 };
  const spin = () => {
  const symbols = [];
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
     for(let i=0; i<count;i++){
      symbols.push(symbol);
    }
   }
   const reels = [];
   for(let i=0; i<COLS; i++){
      reels.push([]);
      const reelSymbols = [...symbols];
      for(let j=0;j< ROWS ; j++){
         const randomIndex = Math.floor(Math.random()*reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);
      }
    }
    return reels;
 };
 
 const transpose = (reels) => {
  const rows = [];

  for(let i=0; i<ROWS ; i++){
    rows.push([]);
    for(let j=0; j < COLS; j++){
    rows[i].push(reels[j][i]);
    }
   }
   return rows;
 };

 const printRows = (rows) => {
  for(const row of rows){
    let rowString = "";
    for(const[i,symbol]of row.entries()){
      rowString += symbol;
      if(i != row.length - 1){
        rowString += " | "
       }
     } 
     console.log(rowString)
   }
 };

 const getWinnings = (rows, bet, Lines) => {
  let winnings = 0;

  for(let row = 0; row< Lines; row++){
    const symbols = rows[row];
    let allSame = true;

    for(const symbol of symbols){
      if(symbol != symbols[0]){
        allSame = false;
        break;
       }
     }
     if(allSame){
    winnings += bet * SYMBOLS_VALUES[symbols[0]];
     }
   }
   return winnings;
 };

  const game = () => {

 
   let balance = deposit();
   while(true){
    console.log("you have a balance of: "+ balance);
   const numberOfLines=getNumberOfLines();
   const bet = getBet(balance,numberOfLines);
   balance -= bet * numberOfLines;
   const reels = spin();
   const rows = transpose(reels);
   printRows(rows);
   const winnings = getWinnings(rows,bet,numberOfLines);
   balance+= winnings;
   console.log("you won , "+ winnings.toString());
   if(balance <= 0 ){
    console.log('You lost');
    break;
   }
   const playAgain = prompt("do you wanna play again:");
   if(playAgain != "y")
   break;
 }
};
 game();
 