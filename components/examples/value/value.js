const {Forest} = require('@wonderlandlabs/forest');

const count = new Forest({
  $value: 0
})

count.subscribe(console.log);

count.value = 1;
count.value = 'two';
count.value = 3;

console.log('---- count 2 ----- ')
const count2 = new Forest({
  $value: 0,
  type: true
})

count2.subscribe(console.log);

count2.value = 1;
try {
  count2.value = 'two';
} catch (err) {
  console.log('--- error: ', err.message);
}
count2.value = 3;

console.log('------ static --------')

const staticForest = new Forest({
  $value: 0,
  type: ['string', 'number']
});

staticForest.subscribe(console.log);

staticForest.value = 1;
staticForest.value = 'two';
staticForest.value = 3;

try {
  staticForest.value = [4, 5];
} catch (err) {
  console.log('--- error: ', err.message);
}

staticForest.value = 4;
