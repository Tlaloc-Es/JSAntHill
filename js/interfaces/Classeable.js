/* export default*/ class Classeable{
    constructor(div){
        this.div = div;
        this.setClass();
    }

    setClass(){
        this.div.className = this.getType();
    }

    getType(){
        return this.constructor.name;
    }

}