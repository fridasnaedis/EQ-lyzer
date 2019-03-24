console.log('Welcome! This is just a demo page.');

chrome.runtime.onMessage.addListener(gotMessage);
window.setTimeout(test, 1000);
main_string = '';
function test() {
  const main_input = document.querySelector('.msg_input_wrapper p');
  main_input.addEventListener('DOMSubtreeModified', e => {
    main_string = e.target.textContent;
    console.log(main_string);
  });
}

function gotMessage(request, sendResponse) {
  if (request.txt == 'clicked') {
    sendResponse({ text: main_string });
  }
}
