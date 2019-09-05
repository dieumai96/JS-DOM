 class IndexView {
    constructor() {
        window.addEventListener("hashchange", e => this.onRouteChange(e));
        this.slot = document.querySelector("slot");
    }
    onRouteChange(e) {
        const hashLocation = window.location.hash.substring(1);
        this.loadContent(hashLocation);
    }
    loadContent(uri) {
        const contentUri = `${uri}.html`;
        console.log(contentUri);
        fetch(contentUri)
            .then(r => {
                console.log(r);
                return r.text()
            })
            .catch(content => this.updateSlot(content))
    }
    updateSlot(content) {
        this.slot.innerHTML = content;
    }
}
module.exports = IndexView;