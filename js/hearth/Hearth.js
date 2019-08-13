class Hearth{
    constructor(){
        this.objects = []
        this.patches = []
        this.objectsId = 0
        this.height = 500
        this.width = 500
        this.div = document.getElementById('hearth')
        this.div.onclick = function (e) { 
            var offset = this.getClientRects()[0]
            new Ant(10, 10, e.clientX - offset.left, e.clientY - offset.top, "#00FF00")
        }
        let i = 0
        let j = 0
        for (let index = 0; index < this.height; index=index+10) {
            j = 0
            for (let index2 = 0; index2 < this.width; index2=index2+10) {
                var elem = document.createElement('div')
                elem.style.cssText = 'top:' + index + 'px;left:' + index2 + 'px;'
                
                this.div.appendChild(elem)
                let patch = new Patch(elem, i, j)
                this.patches.push(patch)
                j++
            }
            i++
        }
    }
    addDrawable(drawable){
        if(drawable instanceof Drawable){
            drawable.setObjectId(this.objectsId)
            document.getElementById("objects").innerHTML = this.objects.length+1
            this.objectsId++
            this.objects.push(drawable)
            this.div.appendChild(drawable.getDiv())
        }
    }
}
