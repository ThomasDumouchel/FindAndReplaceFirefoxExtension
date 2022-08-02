/* initialize variables */

var replaceInput = document.querySelector('#replaceInput');
var findInput = document.querySelector('#findInput');

var replaceBtn = document.querySelector('#replaceBtn');
var findBtn = document.querySelector('#findBtn');

/*  add event listeners to buttons */

replaceBtn.addEventListener('click', replaceClicked);
findBtn.addEventListener('click', findClicked);

function findClicked() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) { // This line get the tabs
        browser.tabs.sendMessage(tabs[0].id, {type:"highlightText", textMatch: findInput.value}, function(response){ // This line sends a message from popup to current active tab
            if (response){
                console.log(response);
            }
        });
    });
}

function findClicked() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) { // This line get the tabs
        browser.tabs.sendMessage(tabs[0].id, {type:"replaceText", textMatch: findInput.value, textReplacement: replaceInput.value }, function(response){ // This line sends a message from popup to current active tab
            if (response){
                console.log(response);
            }
        });
    });
}

function replaceClicked() {
    console.log(document);
}