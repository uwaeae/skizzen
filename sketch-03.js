const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1600, 1600 ],
  animate: true,
};



const sketch = () => {

  const agents  = [];

  for(let i = 0; i < 40; i++){
    const x = random.range(0, 1600);
    const y = random.range(0, 1600);
    const radius = random.range(4, 12);
    
    agents.push(new Agent(x,y,radius));

  } 

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; i++){
      const agent = agents[i];

      for(let j = i+1; j < agents.length; j++){
        const other = agents[j];

        const distance = agent.pos.getDistence(other.pos);
        
        
        if(distance > 300) continue;
        
          const lineWidth = math.mapRange(distance,0,300,12,0);         
          context.beginPath();
          context.lineWidth = lineWidth;
          context.moveTo(agent.pos.x,agent.pos.y);
          context.lineTo(other.pos.x,other.pos.y);
          context.stroke();
        
    
      }
    }
    

    agents.forEach((agent) => {
      agent.update()
      agent.draw(context);
      agent.wiked(width,height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y){
      this.x = x;
      this.y = y;
    
  }
  getDistence(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx*dx+dy*dy);

  }

}

class Agent {

  constructor(x,y,radius) {
    this.pos = new Vector(x,y);
    this.vec = new Vector(random.range(-1,1),random.range(-1,1));
    this.radius = radius;
  }

  bounce(width,height){

    if(this.pos.x <= 0 || this.pos.x >= width) { this.vec.x *= -1;}
    if(this.pos.y <= 0 || this.pos. y>= height) { this.vec.y *= -1;}

  }

  wiked(width,height){
    if(this.pos.x <= 0 ) this.pos.x = width;
    if(this.pos.x > width ) this.pos.x = 0;

    if(this.pos.y <= 0 ) this.pos.y = height;
    if(this.pos.y > height ) this.pos.y = 0;
  }
  

  update(){
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;
  }

  draw(context) {
    context.save()
    context.translate(this.pos.x,this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}