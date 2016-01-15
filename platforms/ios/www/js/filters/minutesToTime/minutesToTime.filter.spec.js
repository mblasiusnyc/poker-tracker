'use strict';

describe('Filter: minutesToTime', function () {

  // load the filter's module
  beforeEach(module('pokerTrackerApp'));

  // initialize a new instance of the filter before each test
  var minutesToTime;
  beforeEach(inject(function ($filter) {
    minutesToTime = $filter('minutesToTime');
  }));

  it('should return the input prefixed with "minutesToTime filter:"', function () {
    var text = 'angularjs';
    expect(minutesToTime(text)).toBe('minutesToTime filter: ' + text);
  });

});
