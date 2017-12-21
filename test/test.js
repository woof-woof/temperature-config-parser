/* global describe, it */
const assert = require('assert');
const scheduler = require('../scheduler');

const config = {
  temperature: {
    day: 20,
    night: 18,
  },
  day: {
    workday: [
      { time: '00:00', temperature: 'night' },
      { time: '7:00', temperature: 'day' },
      { time: '8:00', temperature: 'night' },
      { time: '17:00', temperature: 'day' },
    ],
    weekend: [
      { time: '2:00', temperature: 'night' },
      { time: '10:00', temperature: 'day' },
    ],
  },
  week: {
    1: 'workday', // Monday
    2: 'workday', // Tuesday
    3: 'workday', // ...
    4: 'workday',
    5: 'workday',
    6: 'weekend', // Saturday
    0: 'weekend', // Sunday
  },
};


describe('Scheduler', () => {
  describe('getTemperature', () => {
    it('should work', () => {
      let res = scheduler.getProgram(config, new Date('2010-10-10 15:45')); // sunday
      assert.equal(res.temperature, 20);
      assert.equal(res.programName, 'day');
      res = scheduler.getProgram(config, new Date('2010-10-10 3:45')); // sunday
      assert.equal(res.temperature, 18);
      assert.equal(res.programName, 'night');
      res = scheduler.getProgram(config, new Date('2010-10-10 00:45')); // sunday
      assert.equal(res.temperature, 20);
      assert.equal(res.programName, 'day');
      res = scheduler.getProgram(config, new Date('2010-10-11 12:45')); // monday
      assert.equal(res.temperature, 18);
      assert.equal(res.programName, 'night');
    });
  });
});

