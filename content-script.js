var filters

const getStorage = (key = null) => new Promise(resolve => {
    chrome.storage.local.get(key, (data) => { resolve(data) });
});

getStorage('option_json').then((data) => {
    filters = JSON.parse(removeCR(data.option_json));
    displayBar();
})

function displayBar() {
    var host = location.host;
    console.log('[topbar] hostname: ' + host);
    var matched_filter;

    if (typeof filters === 'undefined') {
        console.log('[topbar] Failed to get option_json');
    } else {
        matched_filter = filters.find((f) => f.hostname === host);
    }

    if (typeof matched_filter != 'undefined') {
        let bar = document.createElement('header');
        bar.innerText = matched_filter.options.text;
        bar.style.position = 'sticky';
        bar.style.top = 0;
        bar.style.zIndex = 2147483646;
        bar.style.textAlign = 'center';
        bar.style.fontSize = matched_filter.options.font_size + 'em';
        bar.style.color = '#' + matched_filter.options.font_color;
        bar.style.backgroundColor = '#' + matched_filter.options.background_color;

        var body = document.body;
        body.insertBefore(bar, body.firstChild)
    }
}

var removeCR = function (jsonString) {
    return jsonString
        .replace(/(\r\n)/g, '')
        .replace(/(\r)/g, '')
        .replace(/(\n)/g, '');
};
