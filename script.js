import Lottery from "./modules/lottery.js";
import { politicians, folk } from "./data/data.js";

const lottery = new Lottery(politicians)

const buttonStartLottery = document.querySelector('.button-start-lottery');
const lottteryResultsEl = document.querySelector('.lottery-results');
const winningCombinationEl = document.querySelector('.winning-combination');
const winningMessageEl = document.querySelector('.winners-message');
const winnersEl = document.querySelector('.winners');

buttonStartLottery.addEventListener("click",async () => {
    buttonStartLottery.disabled = true
    buttonStartLottery.innerHTML= 'Lottery drawing in process...'
    lottteryResultsEl.style.display = 'none'

    lottery
        .startDrawing()
        .then((res) => {
            winnersEl.style.display = 'block';
            winningCombinationEl.innerHTML = `Winning combination was: ${res.winningCombination}`
            winningMessageEl.innerHTML = 'Winners:'

            let winnerList = ''
            res.winners.forEach((player) => winnerList += `<li>${player.getPlayersDetails()}</li>`);
            
            winnersEl.innerHTML = winnerList
        
        })
        .catch((result) => {
            winnersEl.style.display = 'none'
            winningCombinationEl.innerHTML = `Winning combination was: ${result.winningCombination}`
            winningMessageEl.innerHTML = 'There are no winners'
        })
        .finally(()=> {
            buttonStartLottery.disabled = false
            buttonStartLottery.innerHTML= 'Start loterry drawing'
            lottteryResultsEl.style.display = 'block'
        })
})