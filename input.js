export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 's' ||
                e.key === 'z' ||
                e.key === 'q' ||
                e.key === 'd' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key); // Utilisez push() pour ajouter une nouvelle touche à la liste
            }
            console.log(e.key);
        });
        window.addEventListener('keyup', e => {
            if (e.key === 's' || 
                e.key === 'z' ||
                e.key === 'q' ||
                e.key === 'd' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        })

    }
}