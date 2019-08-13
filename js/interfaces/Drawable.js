class Drawable{
    constructor(width, height, left, top, color) {
        this.objectId = 0
        this.div = document.createElement("div")
        this.div.style.position = "absolute"
        this.setWidth(width)
        this.setHeight(height)
        this.setLeft(left)
        this.setTop(top)
        this.setColor(color)
        this.div.setAttribute('Object', this)
        this.div.setAttribute('Breed', this.getBreed())
        window.hearth.addDrawable(this)
        this.div.onclick = () => { window.selectDibujable = this }
        this.move()
    }

    setObjectId(objectId){
        this.objectId = objectId
        this.div.setAttribute('tooltip', `(${this.constructor.name}, ${this.objectId})`)
    }

    setColor(color){
        this.div.style.backgroundColor = color
    }

    addLeft(steps){
        let hearthHeigth = window.hearth.height

        if((this.getLeft() + this.getWidth() + steps) > hearthHeigth){
            this.setLeft(hearthHeigth - this.getWidth()) 
        }else if((this.getLeft() + steps) < 0){
            this.setLeft(0)
        }else{
            this.setLeft(this.getLeft() + steps)
        }

    }

    addTop(steps){

            let hearthWidth = window.hearth.width
    
            if((this.getTop() + this.getHeight()+ steps) > hearthWidth){
                this.setTop(hearthWidth - this.getHeight())
            }else if((this.getTop() + steps) < 0){
                this.setTop(0);
            }else{
                this.setTop(this.getTop() + steps)
            }

    }

    setLeft(left){
        this.div.style.left = left + "px"
    }

    setTop(top){
        this.div.style.top = top + "px"
    }

    setWidth(width){
        this.div.style.width = width + "px"
    }

    setHeight(height){
        this.div.style.height = height + "px"
    }

    addWidth(steps){
        this.div.style.width = parseInt(this.div.style.width) + steps + "px"
    }

    addHeight(steps){
        this.div.style.height = parseInt(this.div.style.height) + steps + "px"
    }
    
    getLeft(){
        return parseInt(this.div.style.left)
    }

    getTop(){
        return parseInt(this.div.style.top)
    }

    getWidth(){
        return parseInt(this.div.style.width)
    }

    getHeight(){
        return parseInt(this.div.style.height)
    }

    getColor(){
        return this.div.style.backgroundColor
    }

    getType(){
        return this.constructor.name
    }

    getDiv(){
        return this.div
    }
}