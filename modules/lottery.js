import player from './player.js';

export default class Lottery {
    constructor(people) {
        this.people = people
        this.players = []
        this.winningCombination = []
    }

    getLotteryNumbers = () => {
        let lotteryNumbers = [];
        
        while(lotteryNumbers.length < 4) {
            let num = Math.floor(Math.random() * 7) + 1;

            if(lotteryNumbers.indexOf(num) === -1){
                lotteryNumbers.push(num)
            }
        }

        return lotteryNumbers.sort()
    }

    generatePlayers = () => {
        this.people.forEach(element => {
            const name = element.name;
            const surname = element.surname;
            const lotteryNumbers = this.getLotteryNumbers()

            const possibleWinner = new player(name,surname,lotteryNumbers)
            this.players.push(possibleWinner)
        });
    }

    getWinningCombination = () => {
        this.winningCombination = this.getLotteryNumbers();
    }

    startDrawing = () => {
        this.generatePlayers();
        this.getWinningCombination();

        return new Promise((resolve,reject) => {
            setTimeout(()=>{
                const winners = this.players.filter((thePlayer) => 
                    thePlayer.lotteryNumbers.every((lotteryNumber,index) => this.winningCombination[index] === lotteryNumber)
                )
                console.log(winners)
                const result = {
                    winningCombination: this.winningCombination,
                    winners
                }

                if(winners.length > 0) resolve(result) 
                else reject(result)

            },2000)
        })
    }
    
}