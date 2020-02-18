// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const resultObserver = new MutationObserver((resultMutations) => {
    const serverResponseResult = resultMutations.flatMap(mutation =>
      Array.from(mutation.addedNodes).filter(addedNode => addedNode.className === 'server-response'))[0];
    const serverResponseObserver = new MutationObserver((serverResponseMutations) => {
      serverResponseMutations.flatMap(mutation =>
        Array.from(mutation.addedNodes).filter(addedNode => addedNode && typeof addedNode.play === 'function'))[0].play()
    });
    serverResponseObserver.observe(serverResponseResult, { childList: true });
  });
  resultObserver.observe(document.getElementById('result'), { childList: true });
})
