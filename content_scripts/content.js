

browser.runtime.onMessage.addListener((request) => {
    console.log("Message from the popop script:");
    console.log(request.type);
    return Promise.resolve({response: "Hi from content script"});
});


