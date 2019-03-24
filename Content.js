console.log('Welcome! This is just a demo page.');

window.setTimeout(test, 3000);
main_string = '';
function test() {
 const main_input = document.querySelector('.msg_input_wrapper p');
 main_input.addEventListener('DOMSubtreeModified', e => {
   main_string = e.target.textContent;
 });
}
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        sendResponse(main_string);
   }
);