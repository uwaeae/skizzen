const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 3,
  fps: 6,
  timeScale: 2,
  playbackRate: "throttle"
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5; 

    const w = width * 0.1;
    const h = height * 0.1;

    let x,y;

    //const num = random.range(60,180);
    const num = 5;
    const radius = width * 0.5;

    for (let i = 0;i < num;i ++){

      const slice = math.degToRad(360/num);
      const angle = slice * i ;

      x = cx + radius  * Math.sin(angle);
      y = cy + radius  * Math.cos(angle);

      // context.save();
      // context.translate(x,y);
      // context.rotate(-angle);
      // context.scale(random.range(0.01,0.2),random.range(0.01,1))
      // context.beginPath();
      // context.rect(-w * random.range(0.1,6) , -h * 0.5 ,w,h);
      // context.fill();
      // context.restore();


      x = cx + radius * 0.5 * Math.sin(angle);
      y = cy + radius * 0.5 * Math.cos(angle);

      // context.save();
      // context.translate(x,y);
      // context.rotate(-angle);
      // context.scale(random.range(0.01,0.02),random.range(0.5,4))
      // context.beginPath();
      // context.rect(-w * random.range(0.1,6) , -h * 0.5 ,w,h);
      // context.fill();
      // context.restore();


      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);
      context.lineWidth = random.range(2,9);

      context.beginPath();
      context.arc(0,
        0,
        radius * random.range(0.2,0.6),
        slice * random.range(0.2,-8),
        slice * random.range(0.1,-5) )
      context.stroke();
      context.restore();    
    }


  };
};

canvasSketch(sketch, settings);
