# **Scroll indicator**

This module displays the progress of scrolling on the website

Example:
``` html
<!-- html -->
<div class="scrollIndicator">
    <div class="indicator"></div>
</div>
```

```css
/* css */
.scrollIndicator {
    position: fixed;
    top: 0;
    left: 0; 
    background: rgba(214, 130, 130, 0.2);
    width: 100vw;
    height: 5px;

}
.scrollIndicator > .indicator {
    background: red;
    width: 0;
    height: 100%;
}
```

```js
// JavaScript
let indicator = new ScrollIndicator({
    indicatorWrapper: document.querySelector('.scrollIndicator'),
    indicator:        document.querySelector('.indicator'),
});
```