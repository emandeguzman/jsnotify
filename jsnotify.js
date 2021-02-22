customElements.define("js-notify", class extends HTMLElement{
    targetElement = (el) =>{
        this.target = el;
    }
    close = () => {
        this.addEventListener("transitionend", ()=>{
            this.remove();
        },{once: true});

        this.style.overflow = "hidden";
        this.classList.remove('show');
    }

    setPosition = () => {
        const content = this.querySelector(":scope > div");
        const pos = this.position.split(/\s+/);
        switch(pos[1]) {
            case 'left':
                this.style.setProperty('left', `${this.target.offsetLeft}px`);
                this.classList.add('pos2-left');
            break;
            case 'center':
                this.style.setProperty('left', `${this.target.offsetLeft + (this.target.offsetWidth / 2) - (this.offsetWidth / 2)}px`);
                this.classList.add('pos2-center');
            break;
            case 'right':
                this.style.setProperty('left', `${this.target.offsetLeft + this.target.offsetWidth - this.offsetWidth}px`);
                this.classList.add('pos2-right');
            break;
            case 'top':
                this.style.setProperty('top', `${this.target.offsetTop}px`);
                this.classList.add('pos2-top');
            break;
            case 'middle':
                this.style.setProperty('top', `${this.target.offsetTop + (this.target.offsetHeight / 2) - (this.offsetHeight / 2)}px`);
                this.classList.add('pos2-middle');
            break;
            case 'bottom':
                this.style.setProperty('top', `${this.target.offsetTop + this.target.offsetHeight - this.offsetHeight}px`);
                this.classList.add('pos2-bottom');
            break;
        }
        switch(pos[0]) {
            case 'top':
                this.style.setProperty('top', `${this.target.offsetTop - this.offsetHeight}px`);
                this.classList.add('pos1-top');
                content.style.setProperty('top', `${this.offsetHeight}px`);
            break;
            case 'bottom':
                this.style.setProperty('top', `${this.target.offsetTop + this.target.offsetHeight}px`);
                this.classList.add('pos1-bottom');
                content.style.setProperty('top', `-${this.offsetHeight}px`);
            break;
            case 'left':
                this.style.setProperty('left', `${this.target.offsetLeft - this.offsetWidth}px`);
                this.classList.add('pos1-left');
                content.style.setProperty('left', `${this.offsetWidth}px`);
            break;
            case 'right':
                this.style.setProperty('left', `${this.target.offsetLeft + this.target.offsetWidth}px`);
                this.classList.add('pos1-right');
                content.style.setProperty('left', `-${this.offsetWidth}px`);
            break;
        }
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
        return this._getIntAttribute("data-arrowsize", 5);
    }
    set arrowSize(val) {
        this._setIntAttribute("data-arrowsize", val);
    }

    get position() {
        return this._getStringAttribute("data-position", "bottom left");
    }
    set position(val) {
        this._setStringAttribute("data-position", val);
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
        const content = document.createElement("DIV");
        content.textContent = this.textContent;
        this.innerHTML = "";
        this.appendChild(content);
        this.style.position = "absolute";
        this.style.overflow = "hidden";
        content.style.position = "relative";
        // content.style.transform = `translateY(calc(100% + var(--gap)))`;

        if (this.clickToHide) {
            content.addEventListener("click", ()=>{
                this.close();
            });
        }



        if (this.autoHide) {
            setTimeout(this.close, this.autoHideDelay);
        }



        if (this.arrowShow) {
            this.classList.add("show-arrow")
        }



        this.style.setProperty('--arrow-size', `${this.arrowSize}px`);



        this.className.split(/\s+/).map(cn=>{
            this.classList.add(cn);
        })
        


        this.style.setProperty('--gap', `${this.gap}px`);


        //position & arrow position & set initial position for ingress animation
        this.setPosition();


        //animate ingress
        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                requestAnimationFrame(()=>{
                    // content.style.transform = `translate(0%, 0%)`;
                    this.addEventListener("transitionend", ()=>{
                        this.style.overflow = "visible";
                    },{once: true});

                    this.classList.add("show");
                })
            })
        })

        //reposition on window resize
        window.addEventListener("resize", this.setPosition);

        // //reposition on window scroll
        // window.addEventListener("scroll", this.setPosition);
    }

    disconnectedCallback(){
        //remove window resize listener
        window.removeEventListener("resize", this.setPosition);
    }
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
        position: 'bottom left',
        // // default positions
        // elementPosition: 'bottom left',
        // globalPosition: 'top right',
        // // default style
        // style: 'bootstrap',
        // default class (string or [string])
        className: 'error',
        // // show animation
        // showAnimation: 'slideDown',
        // // show animation duration
        // showDuration: 400,
        // // hide animation
        // hideAnimation: 'slideUp',
        // // hide animation duration
        // hideDuration: 200,
        // // padding between element and notification
        gap: 2,
        // USER OPTIONS
        ...options
    }

    const box = document.createElement("js-notify");
    box.targetElement(target); 
    // box.style.position = "absolute";
    // box.style.top = `${target.offsetTop + target.scrollHeight + (target.offsetHeight - target.clientHeight)}px`;
    // box.style.left = `${target.offsetLeft}px`;
    box.textContent = msg;

    box.setAttribute("data-clicktohide", conf.clickToHide ? "true" : "false");
    box.setAttribute("data-autohide", conf.autoHide ? "true" : "false");
    box.setAttribute("data-autohidedelay", conf.autoHideDelay);
    box.setAttribute("data-arrowshow", conf.arrowShow ? "true" : "false");
    box.setAttribute("data-arrowsize", conf.arrowSize);
    box.setAttribute("data-position", conf.position);
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