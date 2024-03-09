export class Player {
    constructor(game) {
        this.game = game;
        this.width = 32;
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
        this.running = false; // Définit si le joueur est en mode de course
        this.lastDirection = 1; // Stocke la dernière direction du mouvement (1 pour droite, -1 pour gauche)
        this.frameCount = 0; // Compteur de frame
        this.maxFrameCount = 5; // Nombre maximal de frames dans l'animation
    }

    update(input) {
        if (!this.running) {
            // Si le joueur n'est pas en mode de course
            if (input.includes('d') || input.includes('ArrowRight')) {
                this.speed = this.maxSpeed;
                this.frameY = 0; // Sélectionner la première ligne de sprites pour la droite
                this.lastDirection = 1; // Stocke la direction actuelle (droite)
            } else if (input.includes('q') || input.includes('ArrowLeft')) {
                this.speed = -this.maxSpeed;
                this.frameY = 1; // Sélectionner la deuxième ligne de sprites pour la gauche
                this.lastDirection = -1; // Stocke la direction actuelle (gauche)
            } else {
                this.speed = 0;
            }
        }

        if (this.x < 0) this.x = 0; // Limite gauche
        if (this.y < 0) this.y = 0; // Limite supérieure
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; // Limite droite
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height; // Limite inférieure
        this.x += this.speed;

        // Gestion des frames pour l'animation
        if (this.speed !== 0) {
            this.frameCount++;
            if (this.frameCount >= this.maxFrameCount) {
                this.frameCount = 0; // Réinitialise le compteur si nécessaire
            }
        } else {
            this.frameCount = 0; // Réinitialise le compteur si le joueur est immobile
        }

        // Vertical
        if ((input.includes('ArrowUp') || input.includes('z')) && this.onGround()) {
            this.vy -= 12;
        }
        this.y += this.vy;
        if (!this.onGround()) {
            // Si le joueur n'est pas au sol, ajustez la vélocité verticale
            this.vy += this.weight;
        } else {
            // Si le joueur est au sol, réinitialisez la vélocité verticale
            this.vy = 0;
            // Assurez-vous que le joueur ne s'enfonce pas dans le sol
            this.y = this.game.height - this.height;
        }

        // Activer le mode de course si la touche correspondante est maintenue enfoncée
        if (this.speed !== 0 && (input.includes('d') || input.includes('ArrowRight') || input.includes('q') || input.includes('ArrowLeft'))) {
            this.running = true;
        } else {
            this.running = false;
        }
    }

    draw(context) {
        // Dessiner l'image du joueur en ajustant les coordonnées x et y en fonction de sa position
        const offsetX = (this.width - this.width) / 2; // Offset en x pour centrer l'image
        let offsetY = (this.height - this.height) / 2; // Offset en y pour centrer l'image
        
        if (this.speed !== 0) {
            if (this.lastDirection > 0) {
                this.drawRight(context);
            } else {
                this.drawLeft(context);
            }
        } else {
            if (this.lastDirection > 0) {
                this.drawStaticRight(context);
            } else {
                this.drawStaticLeft(context);
            }
        }
    }
    
    drawRight(context) {
        const frameY = 0; // Pour la droite
        const frameX = this.frameCount; // Utilise le compteur de frame pour l'animation
        const offsetX = (this.width - this.width) / 2; // Offset en x pour centrer l'image
        let offsetY = (this.height - this.height) / 2; // Offset en y pour centrer l'image
        context.drawImage(this.image, this.width * frameX + 16, 187, this.width, this.height, this.x - offsetX, this.y - offsetY, this.width, this.height);
    }

    drawLeft(context) {
        const frameY = 1; // Pour la gauche
        const frameX = this.frameCount; // Utilise le compteur de frame pour l'animation
        const offsetX = (this.width - this.width) / 2; // Offset en x pour centrer l'image
        let offsetY = (this.height - this.height) / 2; // Offset en y pour centrer l'image
        context.drawImage(this.image, this.width * frameX + 11, 125  * frameY, this.width, this.height, this.x - offsetX, this.y - offsetY, this.width, this.height);
    }
    
    drawStaticRight(context) {
        const frameY = 0; // Pour la droite
        const offsetX = (this.width - this.width) / 2; // Offset en x pour centrer l'image
        let offsetY = (this.height - this.height) / 2; // Offset en y pour centrer l'image
        context.drawImage(this.image, this.width * this.frameX + 17, this.height * frameY, this.width, this.height, this.x - offsetX, this.y - offsetY, this.width, this.height);
    }

    drawStaticLeft(context) {
        const frameY = 1; // Pour la gauche
        const offsetX = (this.width - this.width) / 2; // Offset en x pour centrer l'image
        let offsetY = (this.height - this.height) / 2; // Offset en y pour centrer l'image
        context.drawImage(this.image, this.width * this.frameX + 10, this.height * frameY + 10, this.width, this.height, this.x - offsetX, this.y - offsetY, this.width, this.height);
    }
    
    onGround() {
        return this.y >= this.game.height - this.height;
    }
}
