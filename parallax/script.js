class Parallax {
    constructor(options) {
        let findIndexesBy   = options.findIndexesBy ? options.findIndexesBy : 'data-speed',
            isDataSpeed     = false,
            dataSpeedFinder = null,
            indexDefault    = 1, 
            comeBackDefault = 0.05;


        this.body           = document.querySelector('body');
        this.over           = options.over ? options.over : this.body; 
        this.object         = NodeList.prototype.isPrototypeOf(options.object) ? options.object : Array.from(options.object)
        this.index          = [];
        this.aroundCenter   = options.aroundCenter != null ? options.aroundCenter : true; 
        this.comeBack       = options.comeBack != null ? options.comeBack : comeBackDefault;
        this.smoothlyIndex  = options.smoothlyIndex != null ? options.smoothlyIndex : 0.08;
        const that          = this; 

        // if is data speed
        for (let i = 0; i < this.object.length; i++) {  
            if (this.object[i].getAttribute(findIndexesBy) != null) {
                isDataSpeed = true;
                break;
            }
        }  

        // set index  
        function setIndex(index) {
            if (that.aroundCenter) { 
                that.index.push(index)
            }
            else { 
                that.index.push(index / 1)
            }
        } 

        if (options.index) {
            if (options.index.length != null) {
                for (let i = 0; i < this.object.length; i++) {
                    if (options.index[i] != null) {  
                        setIndex(options.index[i])
                    }
                    else {  
                        setIndex(options.index[0]) 
                    }
                }
            }
            else { 
                for (let i = 0; i < this.object.length; i++) {
                    setIndex(options.index)
                }
            }
        } 
        else if (isDataSpeed) {
            for (let i = 0; i < this.object.length; i++) {
                dataSpeedFinder = this.object[i].getAttribute(findIndexesBy);
                if (dataSpeedFinder != null) {  
                    setIndex(Number(dataSpeedFinder))
                }
                else {
                    setIndex(indexDefault)
                }
            }
        }
        else { 
            for (let i = 0; i < this.object.length; i++) {
                setIndex(indexDefault)
            }
        } 

        // is come back  
        if (Number.isInteger(this.comeBack) || Number(this.comeBack) === this.comeBack && this.comeBack % 1 !== 0) {
            if (!(this.comeBack >= 0 && this.comeBack <= 1)) {
                console.warn('if the speed is not in the range of 0 to 1, the items may behave incorrectly')
            } 
        } 
        else if (typeof this.comeBack == 'boolean') {
            if (this.comeBack) {
                this.comeBack = comeBackDefault
            }
            else {
                this.comeBack = 0
            }
        } 


        this.setValues(options)
        this.start()

        window.onresize = function() {
            that.setValues(that.options)
        }
    }

    setValues(options) { 
        this.winWidth   = window.innerWidth;
        this.winHeight  = window.innerHeight; 
        this.winCenterX = []
        this.winCenterY = []  

        if (this.aroundCenter) {  
            for (let i = 0; i < this.object.length; i++) {
                this.winCenterX.push(this.winWidth / 3.5);
                this.winCenterY.push(this.winHeight / 3.5);
            } 
        }
        else { 
            for (let i = 0; i < this.object.length; i++) {
                this.winCenterX.push(this.over.getBoundingClientRect()['width']  / 2 + this.object[i].getBoundingClientRect()['width'] / 2);
                this.winCenterY.push(this.over.getBoundingClientRect()['height'] / 2 + this.object[i].getBoundingClientRect()['height'] / 2); 
            }
        }
    }

    start() { 
        let that            = this,
            cursorInside    = false,
            mouseX          = 0,
            mouseY          = 0,
            rangeIndexX     = 0,
            rangeIndexY     = 0,
            offsetValueX    = 0,
            offsetValueY    = 0,
            offsetX         = 0,
            offsetY         = 0,
            smothValueX     = 0,
            smothValueY     = 0;

        window.onresize = function() { 
            that = this; 
        } 

        document.addEventListener('mouseleave', function(e) {
            if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= that.winWidth || e.clientY >= that.winHeight) {
                cursorInside = false;
                offsetValueX = 1;
                offsetValueY = 1; 
            }
        })

        function setPosition(x, y, e) { 
            e.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0px)';
        }

        function mouseMove(e) {
            cursorInside = true;
            mouseX       = e.clientX;
            mouseY       = e.clientY;
        }
        this.over.addEventListener('mousemove', mouseMove)

        function onAnimationFrame() {
            for (let i = 0; i < that.object.length; i++) {
                rangeIndexX = (that.winCenterX[i] - mouseX) / that.winCenterX[i];
                rangeIndexY = (that.winCenterY[i] - mouseY) / that.winCenterY[i];

                if (cursorInside) {
                    offsetValueX = rangeIndexX * that.winWidth / 10;
                    offsetValueY = rangeIndexY * that.winHeight / 10;

                    smothValueX += (offsetValueX - smothValueX) * that.smoothlyIndex;
                    smothValueY += (offsetValueY - smothValueY) * that.smoothlyIndex;
                }
                else { 
                    smothValueX += (offsetValueX - smothValueX) * that.comeBack;
                    smothValueY += (offsetValueY - smothValueY) * that.comeBack;
                } 
    
                offsetX = smothValueX * that.index[i];
                offsetY = smothValueY * that.index[i];

                setPosition(offsetX, offsetY, that.object[i])
            }
            window.requestAnimationFrame(onAnimationFrame)
        }
        window.requestAnimationFrame(onAnimationFrame) 
    }
}


// service functions
function randfloat(min, max) {
    return Math.random() * (max - min)  + min
}
function randfint(min, max) {
    return Math.floor(Math.random() * (max - min)  + min)
}
function getIndexes(count, max, min) {
    let indexes = [];

    for (let i = 0; i < count; i++) {
        indexes.push(randfloat(max, min))
    }
    return indexes
}