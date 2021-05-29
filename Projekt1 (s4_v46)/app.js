new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth = this.monsterHealth-damage > 0 ? this.monsterHealth - damage : 0;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits moster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth = this.monsterHealth-damage > 0 ? this.monsterHealth - damage : 0;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits moster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function() {         
            this.playerHealth = this.playerHealth <= 90 ? this.playerHealth+10 : 100;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth = this.playerHealth-damage > 0 ? this.playerHealth - damage : 0;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.floor(Math.random()*(max-min+1))+min;
        },
        checkWin: function() {
            if (this.monsterHealth <=0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } 
            if (this.playerHealth <=0 ) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});