# **Parallax**

Parallax effect


Example:

```html
<!-- html -->
<div class="wrapper">
        
    <div class="parallax-item atom">  
        <img src="./img/atom.svg" alt="">
    </div>

    <div class="parallax-item shooting-stars">
        <img src="./img/shooting-star.svg" alt="">
    </div>

    <div class="parallax-item planet">
        <img src="./img/planet.svg" alt="">
    </div>
</div>
```

```js
// JS
let p = new Parallax({
    object: document.querySelectorAll('.parallax-item'),
    over: document.querySelector('.wrapper'),   
    aroundCenter: false,    
    index: [1.2, 0.8, 0.2, 0.5], 
}) 
```
