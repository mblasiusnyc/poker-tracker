'use strict';

describe('Filter: isNull', function () {

  // load the filter's module
  beforeEach(module('pokerTrackerApp'));

  // initialize a new instance of the filter before each test
  var isNull;
  beforeEach(inject(function ($filter) {
    isNull = $filter('isNull');
  }));

  it('should return the input prefixed with "isNull filter:"', function () {
    var text = 'angularjs';
    expect(isNull(text)).toBe('isNull filter: ' + text);
  });

});
