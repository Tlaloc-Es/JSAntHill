/*import Dibujable from './Dibujable'

export default*/ class SerVivo extends Dibujable{
    constructor(width, height, left, top, color, health, resistance) {
        super(width, height, left, top, color);
        this.div.onclick = () => { window.selectDibujable = this }
        this.setAttributes(10 ,10, 10)
        this.setCanvasDirection();
        this.setAngle(0)

    }

    setAttributes(health, resistance, focalDistance){
            this.focalDistance = focalDistance
            this.health = health
            this.resistance = resistance        
    }

    setCanvasDirection(){
        this.canvasDirection = document.createElement("canvas")
        this.canvasDirection.style.borderstyle="5px solid"
        this.canvasDirection.style.color="red"  //TODO doesn't work
        var ctx = this.canvasDirection.getContext("2d");
        ctx.beginPath();
        let x = this.getWidth() - (this.getWidth()/2)
        let y = this.getHeight() - (this.getHeight()/2)
        ctx.moveTo(x, y);

        let xy = this.calculateXY(x, y, 360, this.focalDistance)

        ctx.lineTo(xy[0]+x, xy[1]+y);
        ctx.stroke(); 
        this.div.appendChild(this.canvasDirection);
    }

    birth(){
        this.onBirth()
    }

    onBirth(){}

    eat(food){
        this.onEat();
    }

    onEat(food){}

    defecate(){
        this.onDefecte()
    }

    onDefecte(){}

    toRect(){
        return 
    }

    checkCollisions(){
        let objects = window.hearth.objects;
        
        let collidedObjects = [];

        let rect1 = {x: this.getLeft(), y: this.getTop(), width: this.getWidth(), height: this.getHeight()}

        objects.forEach(object => {
            if(object.objectId !== this.objectId){
                let rect2 = {x: object.getLeft(), y: object.getTop(), width: object.getWidth(), height: object.getHeight()}
                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y) {
                        collidedObjects.push(object)
                }
            }
        });
        
        if(collidedObjects.length > 0){
            this.onColission(collidedObjects)
        }
    }

    onColission(collidedObjects){}

    move(){
        setTimeout(
            () => {
                //this.downHealth();
                this.checkCollisions()
                this.onMove();
                this.move();
            }, 50);
    }

    onMove(){}

    calculateXY(x, y, angle, distance){
        let toRadians = Math.PI / 180;
        let x1 = (distance * Math.cos(angle*toRadians))
        let y1 = (distance * Math.sin(angle*toRadians))
        return [x1, y1]
    }

    walk(steps){
        let xy = this.calculateXY(this.getLeft(), this.getTop(), this.getAngle(), steps)

        this.addLeft(xy[0])
        this.addTop(xy[1])
    }


    rotate(angle){
        console.log(this.getAngle())
        let angleTo = (this.getAngle() + angle) % 361
        this.setAngle(angleTo)
    }

    getAngle(){
        return parseInt(this.div.style.transform.replace('rotate(','').replace('deg)',''))
    }

    setAngle(angle){
        return this.div.style.transform = `rotate(${angle}deg)`
    }

    reproduce(breed){
        if(breed.reproduce){
            this.onReproduce();
        }
    }

    onReproduce(){}

    dead(){
        this.div.remove();
    }

    getBreed(){
        return this.constructor.name;
    }

    downHealth(){
        this.health--;
        if(this.health <= 0){
            this.dead();
        }
    }

}