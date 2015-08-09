'use strict';

function baseNumber(n, age) {
  return Math.ceil(Math.pow(n * (age + 1) / 4, 2));
}

var restAmount = 60;

function generateWorkout(n, age) {
    var base = baseNumber(n, age);
    var w1 = (n % 2) + 1;
    var w2 = (n % 3) + (n % 2);
    var w3 = ((n + 1) % 2);
    return [
            {type: 'situps', amount: base},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w1},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w2},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w3}
          ];
}


module.exports = generateWorkout;
