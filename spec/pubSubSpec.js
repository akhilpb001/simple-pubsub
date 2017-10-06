describe('Testing pubSub', function() {
  var subId = 0,
      callbackFn = function() {},
      result,
      spyObj;
  
  beforeEach(function() {
    subId = 0;
    result = undefined;
  });
  
  it('Should subscribe', function() {
    subId = pubSub.subscribe('testtopic1', callbackFn);
    expect(subId).toBeGreaterThan(0);
  });
  
  it('Should publish', function() {
    spyObj = jasmine.createSpy('callbackSpy'),
    pubSub.subscribe('testtopic2', spyObj);
    result = pubSub.publish('testtopic2', 'testparam1');
    expect(spyObj).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  
  it('Should publish with param', function() {
    spyObj = jasmine.createSpy('callbackSpy');
    pubSub.subscribe('testtopic3', spyObj.and.callFake(function(param) {
      expect(param).toBe('testparam2');
    }));
    result = pubSub.publish('testtopic3', 'testparam2');
    expect(spyObj).toHaveBeenCalled();
    expect(result).toBe(true);
    
  });
  
  it('Should unsubscribe', function() {
    subId = pubSub.subscribe('testtopic4', callbackFn);
    result = pubSub.unsubscribe(subId);
    expect(result).toBe(true);
  });
  
});