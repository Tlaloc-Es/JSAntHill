/*import Dibujable from './Dibujable'

export default*/ class SerVivo extends Dibujable{
    constructor(width, height, left, top, color, health, resistance, focalDistance, reproductionCapacity, totalAttemptsToReproduceIt) {
        super(width, height, left, top, color);
        this.setAttributes(10 ,10, 10)
        this.setCanvasDirection();
        this.setAngle(0)
        this.isDead = false;

        if(totalAttemptsToReproduceIt === undefined){ totalAttemptsToReproduceIt = 3}
        if(health === undefined){health = 25}
        if(reproductionCapacity === undefined){reproductionCapacity = 10}

        this.setAttributes(health, resistance, focalDistance, reproductionCapacity)
    }

    setAttributes(health, resistance, focalDistance, reproductionCapacity, totalAttemptsToReproduceIt){
            this.focalDistance = focalDistance
            this.health = health
            this.resistance = resistance
            this.reproductionCapacity = reproductionCapacity
            this.totalAttemptsToReproduceIt = totalAttemptsToReproduceIt
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
        if(!this.isDead){
            setTimeout(
                () => {
                    this.downHealth();
                    this.checkCollisions()
                    this.onMove();
                    this.move();
                }, 50);
        }
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
        let angleTo = (this.getAngle() + angle) % 361
        this.setAngle(angleTo)
    }

    getAngle(){
        return parseInt(this.div.style.transform.replace('rotate(','').replace('deg)',''))
    }

    setAngle(angle){
        return this.div.style.transform = `rotate(${angle}deg)`
    }

    tryReproduction(couple){
        if(!couple.isDead){
            let reproductionProbability = Math.floor((Math.random() * 100) + 1)
            if(this.reproductionCapacity > reproductionProbability){

                /*new this.constructor(
                    this.mutate(this.getWidth(), couple.getWidth()),
                    this.mutate(this.getHeight(), couple.getHeight()),
                    this.mutate(this.getLeft(), couple.getLeft()),
                    this.mutate(this.getTop(), couple.getTop()),
                    this.mutateColor(this.getColor(), couple.getColor()),
                    this.mutate(this.health, couple.health),
                    this.mutate(this.resistance, couple.resistance), 
                    this.mutate(this.focalDistance, couple.focalDistance),
                    this.mutate(this.reproductionCapacity, couple.reproductionCapacity))*/

                new this.constructor(
                    this.getWidth(),
                    this.getHeight(),
                    this.getLeft(),
                    this.getTop(),
                    this.mutateColor(this.getColor(), couple.getColor()),
                    this.mutate(this.health, couple.health),
                    this.mutate(this.resistance, couple.resistance), 
                    this.mutate(this.focalDistance, couple.focalDistance),
                    this.mutate(this.reproductionCapacity, couple.reproductionCapacity),
                    this.mutate(this.totalAttemptsToReproduceIt, couple.totalAttemptsToReproduceIt))

                    this.health = this.health*0.25
            }
        }
        
    }

    colorToArray(color){
        let rgb = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');
        return rgb
    }

    mutateColor(color1, color2){
        color1 = this.colorToArray(color1)
        color2 = this.colorToArray(color2)
        let childColor = 'rgb('
        for(let i = 0; i < 3; i ++){
            let parentProbability = Math.floor((Math.random() * 2) + 1)
            let mutableProbability = Math.floor((Math.random() * 2) + 1)
            let mutableProbabilityToLoss = Math.floor((Math.random() * 2) + 1)
            let char
            if(parentProbability == 1){
                char = color1[i]
            }else{
                char = color2[i]
            }
            if(mutableProbability == 1){
                char = parseInt(char)
                if(mutableProbabilityToLoss == 1){
                    if(char > 1){char--}
                }else{
                    if(char < 255){char++}
                }
            }
            childColor += char + ','
        }
        childColor = childColor.substring(0, childColor.length - 1) + ')'
        console.log(childColor)

        return childColor
    }

    mutate(value1, value2){
        let parentProbability = Math.floor((Math.random() * 2) + 1)
        let value

        if(parentProbability == 1){
            value = value1
        }else{
            value = value2
        }

        let mutableProbabilityToLoss = Math.floor((Math.random() * 2) + 1)
        if(mutableProbabilityToLoss == 2){
            value = value * -1
        }
        let mutableProbability = Math.floor((Math.random() * 10) + 1) / 100
        value = value + (value*mutableProbability)
        return value
    }

    reproduce(breed){
        if(breed.reproduce){
            this.onReproduce();
        }
    }

    onReproduce(){}

    dead(){
        this.div.innerHTML = ''
        this.isDead = true;
        this.setColor("rgb(153, 102, 51)")
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