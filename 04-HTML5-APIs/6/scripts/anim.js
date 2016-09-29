window.onload = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let requestAnimationFrame =  
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;

    let pos = 0;
    let direction = 1;

    function render () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(10, 150, 50, 50);
        ctx.translate(1 * direction,0);
        pos = pos + 1 * direction;
        if (pos >= 200) {
            direction = -1;
        }
        else if (pos <= 1) {
            direction = 1;
        }
        requestAnimationFrame(render);
    }

    render();

}