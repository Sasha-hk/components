class ScrollIndicator {
    constructor(options) {
        this.indicatorWrapper = options.indicatorWrapper;
        this.indicator        = options.indicator;
        this.body             = document.body,
        this.html             = document.documentElement;
        this.scrollOffset     = 0;
        this.winHeight        = Math.max(
            this.body.scrollHeight, 
            this.body.offsetHeight, 
            this.html.clientHeight, 
            this.html.scrollHeight, 
            this.html.offsetHeight 
        ); 
            
        window.addEventListener('scroll', scroll => { 
            this.scrollOffset = window.scrollY * 100 / (this.winHeight - window.innerHeight)
            this.indicator.style.width = this.scrollOffset + '%'
        })
    }

    hide() {
        this.indicatorWrapper.style.display = 'none'
        return 'hidden'
    } 

    show() {
        this.indicatorWrapper.style.display = 'block'
        return 'shown'
    }


}

let s = new ScrollIndicator({
    indicatorWrapper: document.querySelector('.scrollIndicator'),
    indicator:        document.querySelector('.indicator'),
});