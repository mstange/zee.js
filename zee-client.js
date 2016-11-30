var ZeeAsync = (function () {
  var zeeWorker = new Worker('zee-worker.js');
  var zeeCallbacks = [];

  zeeWorker.onmessage = function(msg) {
    zeeCallbacks[msg.data.callbackID][msg.data.type](msg.data.data);
    zeeCallbacks[msg.data.callbackID] = null;
  };

  return {
    // Neuters data's buffer, if data is a typed array.
    compress: function (data, compressionLevel) {
      var arrayData = (typeof data === 'string') ? (new TextEncoder()).encode(data) : data;
      return new Promise(function (resolve, reject) {
        zeeWorker.postMessage({
          request: 'compress',
          data: arrayData,
          compressionLevel: compressionLevel,
          callbackID: zeeCallbacks.length,
        }, [arrayData.buffer]);
        zeeCallbacks.push({
          success: resolve,
          error: reject,
        });
      });
    },
    // Neuters data's buffer, if data is a typed array.
    decompress: function (data) {
      return new Promise(function (resolve, reject) {
        zeeWorker.postMessage({
          request: 'decompress',
          data: data,
          callbackID: zeeCallbacks.length,
        }, [data.buffer]);
        zeeCallbacks.push({
          success: resolve,
          error: reject,
        });
      });
    },
  }

})();
