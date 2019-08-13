//import Patch from './patch'
//import Dibujable from './Dibujable'

/*export default*/ class Hearth{
    constructor(){
        this.objects = [];
        this.patches = [];
        this.objectsId = 0;
        this.height = 500
        this.width = 500
        this.div = document.getElementById('hearth');
        this.div.onclick = function (e) { 
            var offset = this.getClientRects()[0];
            new Ant(10, 10, e.clientX - offset.left, e.clientY - offset.top, "#00FF00");
        }
        let i = 0
        let j = 0
        for (let index = 0; index < this.height; index=index+10) {
            j = 0
            for (let index2 = 0; index2 < this.width; index2=index2+10) {
                var elem = document.createElement('div');
                elem.style.cssText = 'top:' + index + 'px;left:' + index2 + 'px;';
                
                this.div.appendChild(elem);
                let patch = new Patch(elem, i, j);
                this.patches.push(patch);
                j++
            }
            i++
        }
    }
    addDibujable(dibujable){
        if(dibujable instanceof Dibujable){
            dibujable.setObjectId(this.objectsId)
            this.objectsId++
            this.objects.push(dibujable)
            this.div.appendChild(dibujable.getDiv())
        }
    }
}


/*//import Patch from './patch'
//import Dibujable from './Dibujable'

/*export default*/ /*class Hearth{
    constructor(){
        this.div = document.getElementById('hearth');
        for (let index = 0; index < 500; index=index+10) {
            for (let index2 = 0; index2 < 500; index2=index2+10) {
                var patch = document.createElement('div');
                patch.style.cssText = 'top:' + index + 'px;left:' + index2 + 'px;';
                this.div.appendChild(patch);
                new Patch(patch);
            }
        }
    }
    addDibujable(dibujable){
        if(dibujable instanceof Dibujable){
            this.div.appendChild(dibujable.getDiv())
        }
    }
}*/