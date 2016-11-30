
  var gzModuleWithDefaultHeapSize = createGzModule(16777216);
  return {
    compress: function (data, compressionLevel) {
      var arrayData = (typeof data === 'string') ? (new TextEncoder()).encode(data) : data;
      var mode = (compressionLevel === undefined) ? 'wb' : 'wb' + compressionLevel;
      var gzModule = createGzModule(arrayData.length * 2.5);
      return gzModule['gzcompress'](arrayData, mode);
    },
    decompress: gzModuleWithDefaultHeapSize['gzdecompress']
  };
})();
