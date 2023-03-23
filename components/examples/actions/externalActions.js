const { Forest } = require('@wonderlandlabs/forest')

function updatePoint(point, x, y) {
  point.do.set_x(x);
  point.do.set_y(y);
}

const point = new Forest({$value: {x: 0, y: 0},
actions: {
  update: updatePoint
}});

point.do.update(1, 2);
console.log('update (internally) to {x: 1, y: 2} ', point.value);
updatePoint(point, 3, 4);
console.log('update (externally) to {x: 3, y: 4}', point.value);

console.log('------ started to watch via subscribe() --------');
point.subscribe((value) => console.log('subscribed value: ', value));

point.do.update(10, 20);
console.log('update (internally) to {x: 10, y: 20} ', point.value);
updatePoint(point, 30, 40);
console.log('update (externally) to {x: 30, y: 40}', point.value);

/*
update (internally) to {x: 1, y: 2}  { x: 1, y: 2 }
update (externally) to {x: 3, y: 4} { x: 3, y: 4 }
------ started to watch via subscribe() --------
subscribed value:  { x: 3, y: 4 }
subscribed value:  { x: 10, y: 20 }
update (internally) to {x: 10, y: 20}  { x: 10, y: 20 }
subscribed value:  { x: 30, y: 20 }
subscribed value:  { x: 30, y: 40 }
update (externally) to {x: 30, y: 40} { x: 30, y: 40 }
 */
