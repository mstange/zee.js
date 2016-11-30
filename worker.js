
onmessage = function(msg) {
  var start = Date.now();
  switch (msg.data.request) {
    case 'compress': {
      try {
        var data = Zee.compress(msg.data.data, msg.data.compressionLevel);
        postMessage({
          type: 'success',
          data: data,
          callbackID: msg.data.callbackID,
          time: Date.now() - start,
        }, [data.buffer]);
      } catch (e) {
        postMessage({
          type: 'error',
          data: e.toString(),
          callbackID: msg.data.callbackID,
          time: Date.now() - start,
        });
      }
      break;
    }
    case 'decompress': {
      try {
        var data = Zee.decompress(msg.data.data);
        postMessage({
          type: 'success',
          data: data,
          callbackID: msg.data.callbackID,
          time: Date.now() - start,
        }, [data.buffer]);
      } catch (e) {
        postMessage({
          type: 'error',
          data: e.toString(),
          callbackID: msg.data.callbackID,
          time: Date.now() - start,
        });
      }
      break;
    }
  }
};
