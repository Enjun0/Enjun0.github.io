margins=70
  let cx1;
  let cy1;
  let cx2;
  let cy2;
  let ro, a1, a2,d;
function part4() {
  push();
  translate(margins*3+graphxl,margins*3+100);
  textSize(35);
  textAlign(CENTER,BOTTOM);
  text('Microstructure',graphxl/2,0);
  textSize(12);
  if (ySlider.value()>=findXintersection(xSlider.value())[0] && ySlider.value()>150) {
    fill(caseLiquid(xSlider.value()));
    rect(0,0,graphxl,graphxl);
    fill(0);
    textAlign(LEFT,TOP);
    text('Liquid',0,graphxl);
  }
  else if (xSlider.value()<40 && ySlider.value()>findXintersection(xSlider.value())[1]) { // left graph ii
    console.log(findYintersection(ySlider.value(),3,1));
    fill(caseLiquid(findYintersection(ySlider.value(),3,1)[1]));
    rect(0,0,graphxl,graphxl);
    fill(0);
    circlesmaker(caseLiquid(findYintersection(ySlider.value(),3,1)[0]),findRadiusForArea(graphxl*graphxl*fsa,graphxl),graphxl,true);
    textAlign(LEFT,TOP);
    text('Solid and Liquid',0,graphxl);
  }
  else if (xSlider.value()>40 && ySlider.value()>findXintersection(xSlider.value())[1]) { // right graph ii
    console.log(findYintersection(ySlider.value(),0,2));
    fill(caseLiquid(findYintersection(ySlider.value(),0,2)[0]));
    rect(0,0,graphxl,graphxl);
    circlesmaker(caseLiquid(findYintersection(ySlider.value(),0,2)[1]),findRadiusForArea(graphxl*graphxl*fsb,graphxl),graphxl,true);
    fill(0);
    textAlign(LEFT,TOP);
    text('Solid and Liquid',0,graphxl);
  }
  else if (xSlider.value()<=20 && ySlider.value()<=findXintersection(xSlider.value())[1] && (xSlider.value()<=5 || ySlider.value()>=findXintersection(xSlider.value())[2])) {
    fill(caseLiquid(xSlider.value()));
    rect(0,0,graphxl,graphxl);
    stroke(255,0,0);
    strokeWeight(1);
    line(0,graphxl,graphxl,0);
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid a phase',0,graphxl);
  }
  else if (xSlider.value()>=70 && ySlider.value()<=findXintersection(xSlider.value())[1] && (xSlider.value()>=80 || ySlider.value()>=findXintersection(xSlider.value())[2])) {
    fill(caseLiquid(xSlider.value()));
    rect(0,0,graphxl,graphxl);
    stroke(255,0,0);
    strokeWeight(1);
    line(0,graphxl,graphxl,0);
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid b phase',0,graphxl);
  }
  else if (xSlider.value()==40) {
    fsa=leverrule(
      (findYintersection(ySlider.value(),4,5)[0]),
      xSlider.value(),
      (findYintersection(ySlider.value(),4,5)[1])
    );
    // console.log(findYintersection(ySlider.value(),5,4)[1]);
    diagonalStripes(graphxl,(1-fsa)*100,fsa*100,caseLiquid(findYintersection(ySlider.value(),5,4)[1]),caseLiquid(findYintersection(ySlider.value(),5,4)[0]));
  }
  else if (xSlider.value()>5 && xSlider.value()<=20 && ySlider.value()<=findXintersection(xSlider.value())[2]) {
    fill(caseLiquid(findYintersection(ySlider.value(),5,4)[0]));
    rect(0,0,graphxl,graphxl);
    stroke(caseLiquid(findYintersection(ySlider.value(),5,4)[1]));
    fsb=1-fsa;
    strokeWeight(2*(212.132-Math.sqrt(45000-((fsb*90000)/2))));//max 424 is the diagonal of the 300x300 triangle
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    line(0,graphxl,graphxl,0);
    pop();
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid a and b phase',0,graphxl);
  }
  else if (xSlider.value()>=70 && xSlider.value()<80 && ySlider.value()<=findXintersection(xSlider.value())[2]) {
    fill(caseLiquid(findYintersection(ySlider.value(),5,4)[1]));
    rect(0,0,graphxl,graphxl);
    stroke(caseLiquid(findYintersection(ySlider.value(),5,4)[0]));
    strokeWeight(2*(212.132-Math.sqrt(45000-((fsa*90000)/2))));//max 424 is the diagonal of the 300x300 triangle
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    line(0,graphxl,graphxl,0);
    pop();
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid b and a phase',0,graphxl);
  }
  else if (xSlider.value()<40 && xSlider.value()>20 && ySlider.value()<=150) {
    console.log('left near eutectic');
    // fraction of alpha solid 
    let aphasefraction=(40-xSlider.value())/(40-20); // the rest is in the eutectic
    let aphaseradius = findRadiusForArea(aphasefraction*graphxl*graphxl,graphxl);
    let yint=findYintersection(ySlider.value(),4,5)//4 is the beta line linear
    let newaphaseradius = findRadiusForArea(aphasefraction*((yint[0]-20)/(yint[0]-yint[1]))*graphxl*graphxl,graphxl);
    aphasecol = caseLiquid(yint[1]);
    bphasecol = caseLiquid(yint[0]);
    //let ephasefraction=1-aphasefraction
    let ephasea = ((yint[0]-40)/(yint[0]-yint[1]));
    // console.log('aphasefraction '+(ephasea*ephasefraction+aphasefraction*((yint[0]-20)/(yint[0]-yint[1]))));
    fill(bphasecol);
    rect(0,0,graphxl,graphxl);
    diagonalStripes(graphxl,(1-ephasea)*100,ephasea*100,bphasecol,aphasecol);
    fsbphase = 1-((yint[0]-20)/(yint[0]-yint[1]));
    //strokeWeight();
    // stroke(caseLiquid(yint[0]));
    // circlesmaker(int(caseLiquid(findYintersection(ySlider.value(),4,5)[0])),aphaseradius,graphxl);
    circlesmaker(bphasecol,aphaseradius,graphxl);
    circlesmaker(aphasecol,newaphaseradius,graphxl);
    // noFill();
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    // if (ro>d/2) {
    //   arc(cx1,cy1,ro*2,ro*2,a2+PI,a1+PI);
    //   arc(cx2,cy2,ro*2,ro*2,a2,a1);
    // }
    pop();
  }
  else if (xSlider.value()<70 && xSlider.value()>40 && ySlider.value()<=150) {
    console.log('right near eutectic');
    // fraction of beta solid
    // first eutectic fraction, then fraction of a in eutectic, then old solid beta fraction, then alpha fraction of beta now
    // ((70-xSlider.value())/(70-40)) * ((findYintersection(ySlider.value(),4,5)[0]-40)/(findYintersection(ySlider.value(),4,5)[0]-findYintersection(ySlider.value(),4,5)[1])) + (1-((70-xSlider.value())/(70-40))) * ((findYintersection(ySlider.value(),4,5)[0]-70)/(findYintersection(ySlider.value(),4,5)[0]-findYintersection(ySlider.value(),4,5)[1]));
    let bphasefraction=(1-((70-xSlider.value())/(70-40)));
    let bphaseradius = findRadiusForArea(bphasefraction*graphxl*graphxl,graphxl);
    let yint=findYintersection(ySlider.value(),4,5)//4 is the beta line linear
    let newbphaseradius = findRadiusForArea(bphasefraction*(1-(yint[0]-70)/(yint[0]-yint[1]))*graphxl*graphxl,graphxl); // i think? bphasefraction*((yint[0]-70)/(yint[0]-yint[1]))*graphxl*graphxl,graphxl
  
    aphasecol = caseLiquid(yint[1]);
    bphasecol = caseLiquid(yint[0]);
    let ephasea = ((yint[0]-40)/(yint[0]-yint[1]));
    ephasefraction = ((70-xSlider.value())/(70-40));
  
    fill(bphasecol);// i don't know
    rect(0,0,graphxl,graphxl);
    diagonalStripes(graphxl,(1-ephasea)*100,(ephasea)*100,bphasecol,aphasecol);
    // fsbphase = ((yint[0]-70)/(yint[0]-yint[1]));
    circlesmaker(aphasecol,bphaseradius,graphxl);
    circlesmaker(bphasecol,newbphaseradius,graphxl);
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    pop();
  }
  else if (xSlider.value()==20 && ySlider.value()<150) {
    fill(caseLiquid(findYintersection(ySlider.value(),5,4)[0]));
    rect(0,0,graphxl,graphxl);
    stroke(caseLiquid(findYintersection(ySlider.value(),5,4)[1]));
    fsb=1-leverrule(findYintersection(ySlider.value(),5,4)[1],20,findYintersection(ySlider.value(),5,4)[0]);
    strokeWeight(2*(212.132-Math.sqrt(45000-((fsb*90000)/2))));//max 424 is the diagonal of the 300x300 triangle
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    line(0,graphxl,graphxl,0);
    pop();
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid a and b phase',0,graphxl);
  }
  else if (xSlider.value()==70 && ySlider.value()<150) {
    fill(caseLiquid(findYintersection(ySlider.value(),5,4)[1]));
    rect(0,0,graphxl,graphxl);
    stroke(caseLiquid(findYintersection(ySlider.value(),5,4)[0]));
    fsa=leverrule(findYintersection(ySlider.value(),5,4)[0],20,findYintersection(ySlider.value(),5,4)[1]);
    strokeWeight(2*(212.132-Math.sqrt(45000-((fsa*90000)/2))));//max 424 is the diagonal of the 300x300 triangle
    push();
    drawingContext.rect(0, 0, graphxl, graphxl);
    drawingContext.clip();
    line(0,graphxl,graphxl,0);
    pop();
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid a and b phase',0,graphxl);
  }
  else if (xSlider.value()==20&&ySlider.value()==150) {
    fill(caseLiquid(20));
    rect(0,0,graphxl,graphxl);
    stroke(255,0,0);
    strokeWeight(1);
    line(0,graphxl,graphxl,0);
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid a phase',0,graphxl);
  }
  else if (xSlider.value()==70&&ySlider.value()==150) {
    fill(caseLiquid(70));
    rect(0,0,graphxl,graphxl);
    stroke(255,0,0);
    strokeWeight(1);
    line(0,graphxl,graphxl,0);
    fill(0);
    noStroke();
    textAlign(LEFT,TOP);
    text('Solid b phase',0,graphxl);
  }
  else {
    noFill();
    rect(0,0,graphxl,graphxl);
  }
  pop();
}

function grids() {
  push();
  noFill();
  rect(0,0,margins*2+graphxl,margins*2+graphyl);
  pop();

  push();
  noFill();
  translate(0,margins*2+graphyl);
  rect(0,0,margins*2+graphxl,margins*3+15);
  pop();

  push();
  noFill();
  translate(margins*2+graphxl,0);
  rect(0,0,margins*2+graphxl,margins*2+100);
  pop();

  push();
  noFill();
  translate(margins*2+graphxl,margins*2+100);
  rect(0,0,margins*2+graphxl,margins*2+graphxl);
  pop();

}

function caseLiquid(q) {
  return boxfullcolour=q/100*255;
}

function circlesmaker(shade, r, boxSize, strokes=false) {
  push();
  ro=r

  // Clip to square [0,0] → [boxSize,boxSize]
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, boxSize, boxSize);
  drawingContext.clip();

  // Circle centers inside the box
  cx1 = 0.33 * boxSize;
  cy1 = 0.33 * boxSize;
  cx2 = 0.67 * boxSize;
  cy2 = 0.67 * boxSize;

  let dx = cx2 - cx1;
  let dy = cy2 - cy1;
  d = sqrt(dx * dx + dy * dy);

  // No intersection
  if (d >= 2 * r) {
    fill(shade);
    if (strokes == false) {
      noStroke();
    }
    else {
      stroke(255,0,0);
      strokeWeight(1);
    }
    ellipse(cx1, cy1, r * 2);
    ellipse(cx2, cy2, r * 2);
    drawingContext.restore();
    pop();
    return;
  }

  // Intersection math
  let a = d / 2;
  let h = sqrt(r * r - a * a);
  let ux = dx / d;
  let uy = dy / d;
  let mx = cx1 + ux * a;
  let my = cy1 + uy * a;
  let px = -uy;
  let py = ux;

  let ix1 = mx + px * h;
  let iy1 = my + py * h;
  let ix2 = mx - px * h;
  let iy2 = my - py * h;

  function filledBigArc(cx, cy, flip) {
    push();
    a1 = atan2(iy1 - cy, ix1 - cx);
    a2 = atan2(iy2 - cy, ix2 - cx);
    if (a1 < 0) a1 += TWO_PI;
    if (a2 < 0) a2 += TWO_PI;

    let start = flip ? a2 : a1;
    let end = flip ? a1 : a2;
    if (end < start) end += TWO_PI;

    fill(shade);
    // noStroke();
    if (strokes==false) {
      noStroke();
    }
    else if (strokes == true) {
      stroke(255,0,0);
      strokeWeight(1);
      arc(cx1,cy1,r*2,r*2,a1,a2);
    }

    beginShape();
    let steps = 100;
    for (let i = 0; i <= steps; i++) {
      let t = lerp(start, end, i / steps);
      vertex(cx + cos(t) * r, cy + sin(t) * r);
    }
    vertex(ix1, iy1);
    vertex(ix2, iy2);
    endShape(CLOSE);
    pop();
  }

  filledBigArc(cx1, cy1, false);
  filledBigArc(cx2, cy2, true);

  stroke(255,0,0);
  strokeWeight(1);
  line(ix1, iy1, ix2, iy2);

  drawingContext.restore();
  pop();
}

// Internal cache (persists across calls);
let _distanceField = null;
let _fieldParams = null;

function estimateArea(r, boxSize, resolution = 2) {
  // Build distance field once (or rebuild if params changed);
  if (
    !_distanceField ||
    !_fieldParams ||
    _fieldParams.boxSize !== boxSize ||
    _fieldParams.resolution !== resolution
  ) {
    cx1 = 0.33 * boxSize;
    cy1 = 0.33 * boxSize;
    cx2 = 0.67 * boxSize;
    cy2 = 0.67 * boxSize;

    const field = [];
    const step = resolution;

    for (let x = 0; x < boxSize; x += step) {
      const dx1 = x - cx1;
      const dx2 = x - cx2;

      for (let y = 0; y < boxSize; y += step) {
        const dy1 = y - cy1;
        const dy2 = y - cy2;

        field.push(
          Math.min(
            dx1 * dx1 + dy1 * dy1,
            dx2 * dx2 + dy2 * dy2
          )
        );
      }
    }

    _distanceField = field;
    _fieldParams = { boxSize, resolution };
  }

  const r2 = r * r;
  let count = 0;

  for (let i = 0; i < _distanceField.length; i++) {
    if (_distanceField[i] <= r2) count++;
  }

  return count * resolution * resolution;
}
function findRadiusForArea(
  targetArea,
  boxSize,
  minR = 0,
  maxR = boxSize
) {
  let lo = minR;
  let hi = maxR;
  let r = 0;

  // Fewer iterations needed because area estimation is coarse anyway
  for (let i = 0; i < 18; i++) {
    r = (lo + hi) * 0.5;
    const area = estimateArea(r, boxSize);

    if (area < targetArea) lo = r;
    else hi = r;
  }

  return r;
}
function diagonalStripes(boxSize, whiteW, blackW, phaseB, phaseA) {
  noStroke();

  const margin = boxSize*2;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, boxSize, boxSize);
  drawingContext.clip();

  let pos = 0;
  let isWhite = true;

  while (pos < margin * 2) {
    let stripeW = isWhite ? whiteW : blackW;
    drawStripe(pos, stripeW, isWhite);
    pos += stripeW;
    isWhite = !isWhite;
  }

  pos = 0;
  isWhite = false;

  while (pos > -margin) {
    let stripeW = isWhite ? whiteW : blackW;
    drawStripe(pos - stripeW, stripeW, isWhite);
    pos -= stripeW;
    isWhite = !isWhite;
  }
  drawingContext.restore();

  function drawStripe(offset, stripeW, isWhite) {
    fill(isWhite ? phaseB : phaseA);

    let o1 = offset;
    let o2 = offset + stripeW;

    quad(
      -margin, o1 - margin,
      width + margin, width + o1 + margin,
      width + margin, width + o2 + margin,
      -margin, o2 - margin
    );
  }
}
