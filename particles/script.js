function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randFloat(min, max) {
    return Math.random() * (max - min) + min
}
function randChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

window.onload = function() {
    let html = document.querySelector('html'),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),

        w = canvas.width  = window.innerWidth,
        h = canvas.height = window.innerHeight,

        particles = [],
        properties = {
            countOfParticles    : 100,
            particleColor       : 'red',
            particleRadius      : 3,
            lineWidth           : 1,
            strokeStyle         : 'red',
            speed               : 1,
            minSpeed            : 1.0,
            maxSpeed            : 1.5,
            particleLineLength  : 150
        };


    class Particle {
        constructor() {
            function randomSpeed(min, max) {
                return Math.random() * (max + min) - min;
            }

            this.x = randInt(0, w);
            this.y = randInt(0, h);
            this.vectorX = Math.random() * (properties.speed*2) - properties.speed;
            this.vectorY = Math.random() * (properties.speed*2) - properties.speed; 
        }

        createPoint() {
            ctx.beginPath()
            ctx.fillStyle = properties.particleColor
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
            ctx.fill()
        }

        move() {

            this.x > 0 && this.x > w || this.x < 0 && this.x < w ? this.vectorX *=-1 : this.vectorX *=1
            this.y > 0 && this.y > h || this.y < 0 && this.y < h ? this.vectorY *=-1 : this.vectorY *=1

            this.x += this.vectorX
            this.y += this.vectorY
 


            ctx.beginPath()
            ctx.fillStyle = properties.particleColor
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
            ctx.fill() 
        }
    } 
    

    // to fill / refill bg
    function fillBG() {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(13, 13, 13, 1)'
        ctx.fillRect(0, 0, w, h)
    }

    // to set / reset parammetrs
    function setParams() {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    let particlePositionX, particlePositionY, distance, lineCount = 0;

    function animate() {
        fillBG()
        for (let i in particles) {
            particles[i].move()
        }

        for (let i in particles) {
            particlePositionX = particles[i].x
            particlePositionY = particles[i].y

            for (let j in particles) {
                if (i != j) {
                    distance = Math.sqrt(Math.pow(particlePositionX - particles[j].x, 2) +  Math.pow(particlePositionY - particles[j].y, 2))
                    
                    if (lineCount < 3) {
                        if (distance < properties.particleLineLength) {  
                            ctx.strokeStyle = 'rgba(255, 0, 0, ' + (1 - distance / properties.particleLineLength) + ')'
                            ctx.lineWidth = properties.lineWidth
                            ctx.beginPath();
                            ctx.moveTo(particlePositionX, particlePositionY);
                            ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.stroke()
                            lineCount++  
                        }
                    }
                }
            }
            lineCount = 0
 
        }


        requestAnimationFrame(animate)
    }
    

    // entry point
    function init() { 
        html.appendChild(canvas)
        fillBG()

        for (let i = 0; i < properties.countOfParticles; i++) {
            particles.push(new Particle);
            particles[i].createPoint()
            particles[i].move()
        }

        animate()
    }

    window.onresize = function() {
        setParams();
        fillBG()
    }
    
    
    init() 
}

console.log(window.innerWidth, window.innerHeight)