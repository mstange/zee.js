  Module['gzcompress'] = function(data, mode) {
    var gzFile = ccall('gzopen', 'number', ['string', 'string'], ['output.gz', mode]);
    var buffer = _malloc(data.length);
    HEAPU8.set(data, buffer);
    ccall('gzwrite', 'number', ['number', 'number', 'number'], [gzFile, buffer, data.length]);
    ccall('gzclose', 'number', ['number'], [gzFile]);
    _free(buffer);
    var ret = new Uint8Array(FS.root.contents['output.gz'].contents);
    FS.unlink('output.gz');
    return ret;
  };

  Module['gzdecompress'] = function(data) {
    var BUFSIZE = 1024*1024;
    FS.createDataFile('/', 'input.gz', data, true, true);
    var gzFile = ccall('gzopen', 'number', ['string', 'string'], ['input.gz', 'rb']);
    var buffer = _malloc(BUFSIZE);
    var chunks = [];
    var total = 0;
    var len;
    while( (len = ccall('gzread', 'number', ['number', 'number', 'number'], [gzFile, buffer, BUFSIZE])) > 0) {
      chunks.push(new Uint8Array(len));
      chunks[chunks.length-1].set(HEAPU8.subarray(buffer, buffer+len));
      total += len;
    }
    ccall('gzclose', 'number', ['number'], [gzFile]);
    FS.unlink('input.gz');
    _free(buffer);
    var ret = new Uint8Array(total);
    var curr = 0;
    for (var i = 0; i < chunks.length; i++) {
      ret.set(chunks[i], curr);
      curr += chunks[i].length;
    }
    return ret;
  };

  return Module;
}
