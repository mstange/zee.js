// This uses the code from emscripten to make TOTAL_MEMORY asm.js spec
// compliant. We do it here in order to avoid the (harmless) log message.
function adjustedTotalMemory(targetVal, stackSize) {
  var totalMemory = 64*1024;
  while (totalMemory < targetVal || totalMemory < 2 * stackSize) {
    if (totalMemory < 16*1024*1024) {
      totalMemory *= 2;
    } else {
      totalMemory += 16*1024*1024
    }
  }
  return totalMemory;
}

function createGzModule(heapMemorySize) {
  var Module = {
    noExitRuntime: true,
    noImageDecoding: true,
    TOTAL_STACK: 262144,
    TOTAL_MEMORY: adjustedTotalMemory(heapMemorySize, 262144)
  };
