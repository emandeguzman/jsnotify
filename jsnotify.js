customElements.define("js-notify", class extends HTMLElement{
    close = () => {
        this.addEventListener("transitionend", ()=>{
            this.remove();
        });

        this.classList.add("close");
        this.style.fontSize = "0px";
    }

    _getBooleanAttribute = (attribName, defaultVal) => {
        let retval = this.getAttribute(attribName);
        if (retval === null) return defaultVal;

        switch(retval.trim().toUpperCase()) {
            case 'FALSE':
            case 'NO':
            case '0':
                return false;
            default:
                return true;
        }
    }
    _setBooleanAttribute = (attribName, val) => {
        let newval;
        if (typeof val == "string") newval = val;
        else {
            if (val) newval = "true";
            else newval = "false";
        }
        this.setAttribute(attribName, newval);
    }

    _getIntAttribute = (attribName, defaultVal) => {
        let retval = this.getAttribute(attribName);
        if (retval === null) return defaultVal;

        return parseInt(retval);
    }
    _setIntAttribute = (attribName, val) => {
        this.setAttribute(attribName, val);
    }

    _getStringAttribute = (attribName, defaultVal) => {
        let retval = this.getAttribute(attribName);
        if (retval === null) return defaultVal;

        return retval;
    }
    _setStringAttribute = (attribName, val) => {
        this.setAttribute(attribName, val);
    }


    
    get clickToHide() {
        return this._getBooleanAttribute("data-clicktohide", true);
    }
    set clickToHide(val) {
        this._setBooleanAttribute("data-clicktohide", val);
    }
    
    get autoHide() {
        return this._getBooleanAttribute("data-autohide", true);
    }
    set autoHide(val) {
        this._setBooleanAttribute("data-autohide", val);
    }

    get autoHideDelay() {
        return this._getIntAttribute("data-autohidedelay", 5000);
    }
    set autoHideDelay(val) {
        this._setIntAttribute("data-autohidedelay", val);
    }

    get arrowShow() {
        return this._getBooleanAttribute("data-arrowshow", true);
    }
    set arrowShow(val) {
        this._setBooleanAttribute("data-arrowshow", val);
    }

    get arrowSize() {
        return this._getIntAttribute("data-arrowsize", 5000);
    }
    set arrowSize(val) {
        this._setIntAttribute("data-arrowsize", val);
    }

    get className() {
        return this._getStringAttribute("data-classname", "error");
    }
    set className(val) {
        this._setStringAttribute("data-classname", val);
    }

    get gap() {
        return this._getIntAttribute("data-gap", 2);
    }
    set gap(val) {
        this._setIntAttribute("data-gap", val);
    }



    connectedCallback(){
        this.style.fontSize = `0px`;

        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                this.style.removeProperty(`font-size`);
            })
        })

        if (this.clickToHide) {
            this.addEventListener("click", ()=>{
                this.close();
            });
        }

        if (this.autoHide) {
            setTimeout(this.close, this.autoHideDelay);
        }

        console.log('this.arrowShow', this.arrowShow);
        if (this.arrowShow) {
            this.classList.add("show-arrow")
        }

        this.style.setProperty('--arrow-size', `${this.arrowSize}px`);

        this.className.split(/\s+/).map(cn=>{
            this.classList.add(cn);
        })
        
        this.style.setProperty('--gap', `${this.gap}px`);

    }

    // static get observedAttributes() {
    //     return ['data-auto'];
    // }
});

function jsnotify(msg, target, options = {}) {
    const conf = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 5000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: '...',
        // default positions
        elementPosition: 'bottom left',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
        // default class (string or [string])
        className: 'error',
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2,
        // USER OPTIONS
        ...options
    }

    console.log(options);
    console.log(conf);

    const box = document.createElement("js-notify");
    box.style.position = "absolute";
    box.style.top = `${target.offsetTop + target.scrollHeight + (target.offsetHeight - target.clientHeight)}px`;
    box.style.left = `${target.offsetLeft}px`;
    box.textContent = msg;

    box.setAttribute("data-clicktohide", conf.clickToHide ? "true" : "false");
    box.setAttribute("data-autohide", conf.autoHide ? "true" : "false");
    box.setAttribute("data-autohidedelay", conf.autoHideDelay);
    box.setAttribute("data-arrowshow", conf.arrowShow ? "true" : "false");
    box.setAttribute("data-arrowsize", conf.arrowSize);
    // // position defines the notification position though uses the defaults below
    // position: '...',
    // // default positions
    // elementPosition: 'bottom left',
    // globalPosition: 'top right',
    // // default style
    // style: 'bootstrap',
    box.setAttribute("data-classname", conf.className);
    // // show animation
    // showAnimation: 'slideDown',
    // // show animation duration
    // showDuration: 400,
    // // hide animation
    // hideAnimation: 'slideUp',
    // // hide animation duration
    // hideDuration: 200,
    // // padding between element and notification
    // gap: 2,    
    box.setAttribute("data-gap", conf.gap);

    target.parentElement.insertBefore(box, target);
}