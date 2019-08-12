//import Object from './Classeable'
/*export default*/ class Patch extends Classeable{
    constructor(div, i, j) {
        super(div);
        //this.div = div;
        this.i = i;
        this.j = j;
        this.div.onclick = () => { this.setColor(); }
        this.div.setAttribute('tooltip', `(${i}, ${j})`);
    }
    
    setColor(){
        this.div.style.backgroundColor = "lightblue"; 
    }

    getType(){
        return  this.constructor.name;
    }

}