window.onload = () => {

    let canvas = document.getElementById("canvas");

    function drawT(base, height, pos, color, isFilled) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(pos.x,pos.y);
        ctx.lineTo(pos.x + base,pos.y);
        ctx.lineTo(pos.x + base / 2, pos.y - height);
        ctx.lineTo(pos.x, pos.y);

        if (isFilled) {
            ctx.fillStyle = color;
            ctx.fill();    
        }
        else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = color;
            ctx.stroke(); 
        } 
        
    }

    function drawR(base, height, pos, color, isFilled) {
        let ctx = canvas.getContext('2d');

        if (isFilled) {
            ctx.fillStyle = color;
            ctx.fillRect(pos.x, pos.y, base, height);    
        }
        else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = color;
            ctx.strokeRect(pos.x, pos.y, base, height); 
        } 
    }

    function drawC(radius, pos, color, isFilled) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI*2 + 1);

        if (isFilled) {
            ctx.fillStyle = color;
            ctx.fill();    
        }
        else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = color;
            ctx.stroke(); 
        }

    }

    function drawD(width, pos, color, isFilled) {
        let ctx = canvas.getContext('2d');
        const height = (3/4) * width; 

        ctx.beginPath();
        ctx.moveTo(pos.x,pos.y);
        ctx.lineTo(pos.x + width / 2, pos.y - height);
        ctx.lineTo(pos.x + width, pos.y);
        ctx.lineTo(pos.x + width / 2, pos.y + height);
        ctx.lineTo(pos.x, pos.y);

        if (isFilled) {
            ctx.fillStyle = color;
            ctx.fill();    
        }
        else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = color;
            ctx.stroke(); 
        }
    }
    function generateFigures() {
        let rectangle, triangle, diamond, circle;
        const posR = {x: 80, y: 80};
        const posT = {x: 480, y: 220};
        const posD = {x: 80, y: 450};
        const posC = {x: 600, y: 450};
        const colors = ["black", "red", "green", "blue"];
        const fill = [true, false];

        function randomIntFromInterval(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        //Random values
        
        rectangle = {};
        rectangle.base = randomIntFromInterval(70, 240);
        rectangle.height = randomIntFromInterval(70, 140);
        rectangle.color = colors[randomIntFromInterval(0,3)];
        rectangle.isFilled = fill[randomIntFromInterval(0,1)];

        triangle = {};
        triangle.base = randomIntFromInterval(70, 240);
        triangle.height = randomIntFromInterval(70, 140);
        triangle.color = colors[randomIntFromInterval(0,3)];
        triangle.isFilled = fill[randomIntFromInterval(0,1)];

        diamond = {};
        diamond.width = randomIntFromInterval(35, 70);
        diamond.color = colors[randomIntFromInterval(0,3)];
        diamond.isFilled = fill[randomIntFromInterval(0,1)];

        circle = {};
        circle.radius = randomIntFromInterval(35, 70);
        circle.color = colors[randomIntFromInterval(0,3)];
        circle.isFilled = fill[randomIntFromInterval(0,1)];
        

        drawR(rectangle.base, rectangle.height, posR, rectangle.color, rectangle.isFilled);

        drawT(triangle.base, triangle.height, posT, triangle.color, triangle.isFilled);

        drawD(diamond.width, posD, diamond.color, diamond.isFilled);

        drawC(circle.radius, posC, circle.color, circle.isFilled);
    }
    
    generateFigures();
}



