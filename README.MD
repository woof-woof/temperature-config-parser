# Temperature scheduler, for use with a thermostat

## Usage
```js
const scheduler = require('temperature-config-parser');
// ...
let res = scheduler.getProgram(config, date); // date is optional, defaults to Current Date
console.log('desired temperature is', res.temperature);
console.log('active program is', res.programName);
```


## Config
```yml
temperature:
  <string>: <float>
  night: 18

day:
  <string>:
    - {time: '<HH>:<MM>', temperature: <temperature>}
  weekend:
    - {time: '23:30', temperature: night}

week:
  <int 0..6>: <day> //0-Sunday, 1-Monday, ...
  3: weekend
```



