const url = document.location.href;

console.log("Content script running on tab with url " + url)

browser.runtime.onMessage.addListener((message) => {
    if (message.type && message.type == "highlightText") {
        console.log("I am content script. With my access to DOM apis, I will highlight the text matching: " + message.textMatch);
        highlightText({ textMatch: message.textMatch })
        return Promise.resolve({ response: "Here is your promise... highlighting text" });
    }

});

browser.runtime.onMessage.addListener((message) => {
    if (message.type && message.type == "replaceText") {
        console.log(`I am content script. With my access to DOM apis, I will replace "${ message.textMatch }" with "${ message.textReplacement }"`);
        replaceText({ textMatch: message.textMatch, textReplacement: message.textReplacement })
        return Promise.resolve({ response: "Here is your promise... replace text" });
    }

});


function highlightText({ textMatch, matchCase }) {

    const regex = new RegExp(`(${textMatch})`, 'g'); // TODO: match cases with the 'i' flag in your regExp

    const htmlBody = document.body; // Using body, I'm skipping the content of head (so it won't find in the title for example)

    var stack = []
    stack.push(htmlBody);

    while (stack.length > 0) {
        //DFS over all the elements of the DOM, adding highlight to the matched words
        let el = stack.pop();
        el.childNodes.forEach(child => {
            if (child.nodeType == 3) { // The node is a text node, so check with regex for pattern match
                // 1. make sure the text is visible (display and not hidden)
                // 2. Look for matching pattern
                let text = child.data;
                var index = text.indexOf(textMatch);
                if (index != -1){
                    //Change the HTML
                    child.parentElement.innerHTML = child.parentElement.innerHTML.replace(regex, `<span style="background-color: yellow;">${ textMatch }</span>`); 
                }
            }

            else if(child.nodeType == 1) { // The node is an element node, so add it's children to the stack for further check
                child.childNodes.forEach(cc => stack.push(cc));
            }

        });
    }

}

function replaceText({ textMatch, matchCase, textReplacement }) {

    const regex = new RegExp(`(${textMatch})`, 'g'); // TODO: match cases with the 'i' flag in your regExp

    const htmlBody = document.body; // Using body, I'm skipping the content of head (so it won't find in the title for example)

    var stack = []
    stack.push(htmlBody);

    while (stack.length > 0) {
        //DFS over all the elements of the DOM, adding highlight to the matched words
        let el = stack.pop();
        el.childNodes.forEach(child => {
            if (child.nodeType == 3) { // The node is a text node, so check with regex for pattern match
                // 1. make sure the text is visible (display and not hidden)
                // 2. Look for matching pattern
                let text = child.data;
                var index = text.indexOf(textMatch);
                if (index != -1){
                    //Change the HTML
                    child.parentElement.innerHTML = child.parentElement.innerHTML.replace(regex, `<span style="background-color: yellow;">${ textReplacement }</span>`); 
                }
            }

            else if(child.nodeType == 1) { // The node is an element node, so add it's children to the stack for further check
                child.childNodes.forEach(cc => stack.push(cc));
            }

        });
    }

}



