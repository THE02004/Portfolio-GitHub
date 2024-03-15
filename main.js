import { Player } from './player.js';
import { InputHandler } from './input.js';       

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    const targetFPS = 60; // Définir la cible FPS

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this); // Utilisez "player" au lieu de "Player"
            this.input = new InputHandler();
            this.lastFrameTime = 0;
            this.deltaTime = 0;
        }

        update() {
            // Calculer le temps écoulé depuis la dernière frame
            const currentTime = performance.now();
            this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convertir en secondes
            this.lastFrameTime = currentTime;

            // Logique de mise à jour du jeu avec le temps écoulé
            this.player.update(this.input.keys, this.deltaTime);
        }

        draw(context) {
            // Effacer le contenu précédent du canevas
            context.clearRect(0, 0, this.width, this.height);

            // Dessiner la nouvelle frame
            this.player.draw(context); // Utilisez "player" au lieu de "Player"
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function loop() {
        // Lancer la boucle de jeu
        game.update();
        game.draw(ctx);

        // Calculer le temps d'attente avant la prochaine frame pour atteindre la cible FPS
        const nextFrameTime = game.lastFrameTime + (1000 / targetFPS);
        const delay = nextFrameTime - performance.now();
        
        // Attendre avant de lancer la prochaine frame
        if (delay > 0) {
            setTimeout(loop, delay);
        } else {
            requestAnimationFrame(loop);
        }
    }

    loop(); // Démarrer la boucle de jeu
});