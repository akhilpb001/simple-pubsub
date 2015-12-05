/**
 *	pubsub v0.0.1
 */
(function(win){
  var handlers = {},
  subsId = 0;
  var pubSub = {
	  version: "0.0.1",
    subscribe: function(topic, callbackFn){
      if(!handlers[topic]){
        handlers[topic] = [];
      }
      handlers[topic].push({subId: ++subsId, callback: callbackFn});
      return subsId;
	  },
	  unsubscribe: function(subId){
      for(var topic in handlers){
        var callbacks = handlers[topic];
        for(var i = 0; i < callbacks.length; i++){
          if(callbacks[i]['subId'] === subId){
            callbacks.splice(i, 1);
            return true;
          }
        }
        return false;
      }
      return false;
	  },
	  publish: function(topic){
      var args = [].slice.call(arguments),
      params = args.slice(1);
      if(!handlers[topic]){
        return false;
      }
      if(handlers[topic].length > 0){
        for(var i = 0; i < handlers[topic].length; i++){
          handlers[topic][i]['callback'].apply(win, params);
        }
        return true;
      }
      return false;
	  }
  };
  win.pubSub = pubSub;
})(window);
