export class Player {
    constructor(game) {
        this.game = game;
        this.width = 41;
        this.height = 52;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('Player');
        this.speed = 0;
        this.maxSpeed = 2;
        this.frameX = 0; // Frame horizontale actuelle
        this.frameY = 0;
        this.previousSpeed = 0; // Stocke la direction précédente du mouvement
    }

    update(input) {
        if (input.includes('d') || input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
            this.frameY = 0; // Sélectionner la première ligne de sprites pour la droite
        } else if (input.includes('q') || input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
            this.frameY = 1; // Sélectionner la deuxième ligne de sprites pour la gauche
        } else {
            this.speed = 0;
        }

        if (this.x < 0) this.x = 0; // Limite gauche
        if (this.y < 0) this.y = 0; // Limite supérieure
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; // Limite droite
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height; // Limite inférieure
        this.x += this.speed;

        // Vertical
        if ((input.includes('ArrowUp') || input.includes('z')) && this.onGround()) this.vy -= 12;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // Mise à jour de la direction précédente du mouvement
        if (this.speed !== 0) {
            this.previousSpeed = this.speed;
        }
    }

    draw(context) {
        // Dessiner l'image du joueur en ajustant les coordonnées x et y en fonction de sa position
        if (this.previousSpeed > 0) {
            context.drawImage(this.image, 18, 8, this.width, this.height, this.x, this.y, this.width + 10, this.height + 10);
        } else if (this.previousSpeed < 0) {
            context.drawImage(this.image, 13, 70, this.width, this.height, this.x, this.y, this.width + 10, this.height + 10);
        } else {
            context.drawImage(this.image, 18, 8, this.width, this.height, this.x, this.y, this.width + 10, this.height + 10);
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }
}