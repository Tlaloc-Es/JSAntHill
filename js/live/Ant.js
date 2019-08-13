/*import SerVivo from './SerVivo'

export default*/ class Ant extends SerVivo{

    constructor(width, height, left, top, color) {
        super(width, height, left, top, color);
    }

    onMove(){
        let steps =  Math.floor((Math.random() * 10) + 1);
        let direction =  Math.floor((Math.random() * 360) + 1); 
        console.log('1')
        this.rotate(direction)
        this.walk(steps)

    }

    onColission(collidedObjects){
        collidedObjects.forEach(object => {
            if(object instanceof Ant){
                this.tryReproduction(object)
            }
        });
    }

}
