/*import SerVivo from './SerVivo'

export default*/ class Ant extends SerVivo{

    constructor(width, height, left, top, color) {
        super(width, height, left, top, color);
    }

    onMove(){
        let steps =  Math.floor((Math.random() * 10) + 1);
        let direction =  Math.floor((Math.random() * 360) + 1); 

        this.rotate(direction)
        this.walk(steps)

        /*if(direction2 == 1){
            steps *= -1
        }

        if(direction == 1){
            this.addLeft(steps);
        }else{
            this.addTop(steps);
        }*/
    }

    onColission(collidedObjects){
        collidedObjects.forEach(object => {
            if(object instanceof Ant){
                this.onReproduce()
            }
        });
    }

    onReproduce(){
        //new Ant(this.getWidth(), this.getHeight(), this.getLeft(), this.getTop(), this.getColor());
    }

}
