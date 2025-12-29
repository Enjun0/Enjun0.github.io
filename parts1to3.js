margins=70;
graphxl=300;
graphyl=200;
let fsa;
let fsb;
const graphs = [
  { fn: x => (-7/160)*x*x - 2*x + 300, xStart: 0, xEnd: 40, step: 1 },
  { fn: x => (-1/84)*x*x + 3*x + 1030/21, xStart: 40, xEnd:100, step: 1 },
  { fn: x => -7.5*x + 300, xStart: 0, xEnd: 20, step: 1 },
  { fn: x => (-11/255)*x*x + 10*x - 17270/51, xStart: 70, xEnd:100, step: 1},
  { fn: x => 150, xStart: 20, xEnd: 70, step: 1 },
  { fn: x => -0.2*x*x + 15*x - 70, xStart: 5, xEnd: 20, step: 1 },
  { fn: x => -15*x + 1200, xStart: 70, xEnd: 80, step: 1 }
];
const graphsinverse = [
  { fn: y => -2*(Math.sqrt(-21*y+4999)-63), yStart:150, yEnd:230, step:1},
  { fn: y => -(320-Math.sqrt(-4480*y+1446400))/14, yStart:150, yEnd:300, step:1},
  { fn: y => (-(-2550+Math.sqrt(-11220*y+2703100))/22), yStart:150, yEnd:230, step:1},
  { fn: y => (y-300)/-7.5, yStart:150, yEnd:300, step:1},
  { fn: y => (y-1200)/-15, yStart:0, yEnd:150, step:1},
  { fn: y => -(-150+Math.sqrt(-80*y+16900))/4, yStart:0, yEnd:150, step:1}
];

function setup() {
  createCanvas(880, 1000);
  background(255, 200, 200);
  part2();
}
function draw() {
  background(255, 230, 230);
  part1();
  part3();
  part4();
  grids();
  
  push();
  fill(0);
  textSize(15);
  textAlign(LEFT, BOTTOM);
  text("Composition: " + xSlider.value() + " wt% B", part2translation[0], part2translation[1]);
  text("Temperature: " + ySlider.value() + " K", part2translation[0], part2translation[1] + margins);
  pop();
  
  push();
  translate(margins,margins);
  let xm = map(xSlider.value(), 0, 100, 0, graphxl);
  line(xm,0,xm,graphyl); //xline
  let ym = map(ySlider.value(), 0, 300, graphyl, 0);
  line(0,ym,graphxl,ym); //xline
  pop();
}

function part1() {
  push();
  noStroke();
  textSize(35);
  translate(margins, margins);
  textAlign(CENTER, BOTTOM);
  text("Phase Diagram", graphxl/2, 0);
  
  textSize(12);
  textAlign(CENTER, TOP);
  text("Composition/ wt% B", graphxl/2, graphyl+30);
  
  push();
  rotate(-HALF_PI); // -90 degrees
  textAlign(CENTER, BOTTOM); // center along rotated baseline
  text('Temperature/ K', -graphyl/2, -40);
  pop();
  
  stroke(0);
  noFill();
  
  line(0,0,0,graphyl);//leftbound
  line(0,graphyl,graphxl,graphyl);//bottombound
  line(graphxl,0,graphxl,graphyl);//rightbound
  drawgraph();
  drawtickmarks();
  pop();
}
function drawgraph() {
  push();
  
  stroke(0,0,255);
  noFill();

  for (let g of graphs) {
    beginShape();
    for (let x = g.xStart; x <= g.xEnd; x += g.step) {
      let y = g.fn(x);
      let sx = map(x, 0, 100, 0, graphxl);
      let sy = map(y, 0, 300, graphyl, 0);
      vertex(sx, sy);
    }
    endShape();
  }
  
  pop();
}
function drawtickmarks() {
  push();
  textSize(12);
  fill(0);
  const tickSize = 6;

  const yTicks = [0, 150, 230, 300];
  for (let y of yTicks) {
    stroke(0);
    let ym = map(y, 0, 300, graphyl, 0);
    line(-tickSize, ym, 0, ym); // left of y-axis
    textAlign(RIGHT, CENTER);
    noStroke();
    text(y, -tickSize - 4, ym);
  }

  const xTicks = [0, 5, 20, 40, 70, 80, 100];
  for (let x of xTicks) {
    stroke(0);
    let xm = map(x, 0, 100, 0, graphxl)
    line(xm, graphyl, xm, graphyl + tickSize); // below x-axis
    noStroke();
    textAlign(CENTER, TOP);
    text(x, xm, graphyl + tickSize + 4);
  }
  
  pop();
}

function part2() { //STANDARD VALUES OF SLIDER 134 138
  push();
  part2translation = [margins, margins*3+graphyl]
  xSlider = createSlider(0, 100, 20, 1);
  xSlider.position(part2translation[0], part2translation[1]);
  xSlider.style('width', graphxl+'px');
  
  ySlider = createSlider(0, 300, 150, 1);
  ySlider.position(part2translation[0], part2translation[1]+margins);
  ySlider.style('width', graphxl+'px');
  pop();
}

function findXintersection(q) { //returns y value
  let values = [];
  
  if (q <= 5) {
    [0,2].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q >= 80) {
    [1,3].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q > 5 && q < 20) {
    [0,2,5].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q > 70 && q < 80) {
    [1,3,6].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q >= 20 && q < 40) {
    [0,4].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q > 40 && q <= 70) {
    [1,4].forEach(i => values.push(graphs[i].fn(q)));
  }
  else if (q === 40) {
    values.push(graphs[4].fn(q));
  }

  return values;
}
function findYintersection(q, graph1,graph2) { //returns x value
    return [
      graphsinverse[graph1].fn(q),
      graphsinverse[graph2].fn(q)
    ];
}
function leverrule(Cl,C,Cs) {
  return (Cl-C)/(Cl-Cs)
}
function part3() {
  push();
  noStroke();
  textSize(35);
  translate(margins*3+graphxl, margins);
  textAlign(CENTER, BOTTOM);
  text("Lever Rule",graphxl/2,0);
  let leverruletext='';
  var intersectionpts = findXintersection(xSlider.value());

  if (ySlider.value() >= intersectionpts[0] && xSlider.value()!=40) { //entire top i of section graph DONE
    leverruletext='Single liquid phase at composition '+xSlider.value()+' wt% B.';
  }
  else if (intersectionpts.length==2 && ((xSlider.value()<=5)||(xSlider.value()>=80))) { //entire a section of graph DONE
    if (xSlider.value()<=5 && xSlider.value()>0 && ySlider.value()>intersectionpts[1]) {
      fsa=leverrule(
        findYintersection(ySlider.value(),1,3)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),1,3)[1]
      );
      leverruletext=
      'Two phases. One solid α phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),1,3))[0] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),1,3))[1] +
      '\n\nThe fraction of solid is ' + fsa;
    }
    else if (xSlider.value()>=80 && ySlider.value()>intersectionpts[1]) {
      fsb=1-leverrule(
        findYintersection(ySlider.value(),2,0)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),2,0)[1]
      );
      leverruletext=
      'Two phases. One solid β phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),2,0))[1] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),2,0))[0] +
      '\n\nThe fraction of solid is ' + fsb;
    }
    else if (xSlider.value()<=5) {
      leverruletext='One solid α phase at composition '+xSlider.value()+' wt% B';
    }
    else if (xSlider.value()>=80) {
      leverruletext='One solid β phase at composition '+xSlider.value()+' wt% B.';
    }
  }
  else if (intersectionpts.length==1) { //d section of graph
    if (ySlider.value()>150) {
      leverruletext='Single liquid phase at eutectic composition '+xSlider.value()+' wt% B.';
    }
    else {
      fsa=leverrule(
        (findYintersection(ySlider.value(),4,5)[0]),
        xSlider.value(),
        (findYintersection(ySlider.value(),4,5)[1])
      );
      leverruletext=
      'Two phases. One solid α phase and one solid β phase. \nThe composition of the solid α phase is ' +
      (findYintersection(ySlider.value(),4,5)[1]) +
      '\nThe composition of the solid β phase is ' + 
      (findYintersection(ySlider.value(),4,5)[0]) +
      '\n\nThe fraction of the solid α phase is ' + fsa
    }
  }
  else if (intersectionpts.length==2 && xSlider.value()>=20 && xSlider.value()<=70) { // entire C section of graph
    if (ySlider.value()>intersectionpts[1] && xSlider.value()<40) {
      fsa=leverrule(
        findYintersection(ySlider.value(),1,3)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),1,3)[1]
      );
      leverruletext=
      'Two phases. One solid α phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),1,3))[0] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),1,3))[1] +
      '\n\nThe fraction of solid is ' + fsa;
    }
    else if (ySlider.value()>intersectionpts[1] && xSlider.value()>40) {
      fsb=1-leverrule(
        findYintersection(ySlider.value(),2,0)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),2,0)[1]
      );
      leverruletext=
      'Two phases. One solid β phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),2,0))[1] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),2,0))[0] +
      '\n\nThe fraction of solid is ' + fsb
    }
    else if (xSlider.value()<40 && xSlider.value()>=20 || xSlider.value()>40 && xSlider.value()<=70) {
      fsa=leverrule(
        (findYintersection(ySlider.value(),4,5)[0]),
        xSlider.value(),
        (findYintersection(ySlider.value(),4,5)[1])
      );
      leverruletext=
      'Two phases. One solid α phase and one solid β phase. \nThe composition of the solid α phase is ' +
      (findYintersection(ySlider.value(),4,5)[1]) +
      '\nThe composition of the solid β phase is ' + 
      (findYintersection(ySlider.value(),4,5)[0]) +
      '\n\nThe fraction of the solid α phase is ' + fsa
    }
  }
  else { // b section of graph DONE
    if (ySlider.value()>intersectionpts[1] && xSlider.value()<20) {
      fsa=leverrule(
        findYintersection(ySlider.value(),1,3)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),1,3)[1]
      );
      leverruletext=
      'Two phases. One solid α phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),1,3))[0] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),1,3))[1] +
      '\n\nThe fraction of solid is ' + fsa;
    }
    else if (ySlider.value()>intersectionpts[1] && xSlider.value()>20) {
      fsb=1-leverrule(
        findYintersection(ySlider.value(),2,0)[0],
        xSlider.value(),
        findYintersection(ySlider.value(),2,0)[1]
      );
      leverruletext=
      'Two phases. One solid β phase and one liquid phase. \nCL, the liquid composition is ' +
      (findYintersection(ySlider.value(),2,0))[1] +
      '\nC, the composition of the whole is ' + xSlider.value() +
      '\nCS, the solid composition is ' + (findYintersection(ySlider.value(),2,0))[0] +
      '\n\nThe fraction of solid is ' + fsb;
    }
    else if (ySlider.value()<intersectionpts[2] && xSlider.value()<20 || ySlider.value()<intersectionpts[2] && xSlider.value()>70) {
      fsa=leverrule(
        (findYintersection(ySlider.value(),4,5)[0]),
        xSlider.value(),
        (findYintersection(ySlider.value(),4,5)[1])
      );
      leverruletext=
      'Two phases. One solid α phase and one solid β phase. \nThe composition of the solid α phase is ' +
      (findYintersection(ySlider.value(),4,5)[1]) +
      '\nThe composition of the solid β phase is ' + 
      (findYintersection(ySlider.value(),4,5)[0]) +
      '\n\nThe fraction of the solid α phase is ' + fsa
    }
    else if (xSlider.value()<20) {
      leverruletext='One solid α phase at composition '+xSlider.value()+' wt% B. b'
    }
    else if (xSlider.value()>70) {
      leverruletext='One solid β phase at composition '+xSlider.value()+' wt% B.'
    }
  }
  
  textSize(12);
  textAlign(LEFT, TOP);
  text(leverruletext,0,margins/2);
  pop();
}
