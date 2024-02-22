import { Player } from './player.js';
import { InputHandler } from './input.js';       

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this); // Utilisez "player" au lieu de "Player"
            this.input = new InputHandler();
        }

        update() {
            // Logique de mise à jour du jeu
            this.player.update(this.input.keys);
        }

        draw(context) {
            this.player.draw(context); // Utilisez "player" au lieu de "Player"
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);  
    }
    animate();
});
