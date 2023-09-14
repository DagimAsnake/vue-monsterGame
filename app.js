function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max- min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            counterRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterStyleBar() {
            if(this.monsterHealth <= 0) {
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerStyleBar() {
            if(this.playerHealth <= 0) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack() {
            return this.counterRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <=0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <=0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        },
    },
    methods: {
        startGame() {
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.counterRound = 0,
            this.winner = null,
            this.logMessages = []
        },
        attackMonster() {
            this.counterRound++
            const attackValue = getRandomValue(5, 12)
            this.monsterHealth -= attackValue
            this.addLogMessages('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
            this.addLogMessages('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            this.counterRound++
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue
            this.addLogMessages('player', 'special-attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            this.counterRound++
            const healValue = getRandomValue(8, 20)
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessages('player', 'heal', healValue)
            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
})

app.mount('#game')