class AppBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                :host { 
                    width: 100%;
                    background-color: rgb(4, 22, 56);
                    color: white;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    position:fixed;
                    top:0;
                    z-index:10;
                    display: block;
                }
                h2 {
                    padding: 16px;
                    text-align: center;
                }
        </style>
        <h2>Team Dreamer</h2>`;
    }
}

window.customElements.define("app-bar", AppBar);