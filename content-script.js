var filters

const getStorage = (key = null) => new Promise(resolve => {
    chrome.storage.local.get(key, (data) => { resolve(data) });
});

getStorage('option_json').then((data) => {
    filters = JSON.parse(removeCR(data.option_json));
    displayBar();
})

var removeCR = function (jsonString) {
    return jsonString
        .replace(/(\r\n)/g, '')
        .replace(/(\r)/g, '')
        .replace(/(\n)/g, '');
};

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
        bar.id = 'topbar';
        bar.innerText = matched_filter.options.text;
        bar.style.position = 'fixed';
        bar.style.top = 0;
        bar.style.left = 0;
        bar.style.width = '100%';
        bar.style.zIndex = 2147483646;
        bar.style.textAlign = 'center';
        bar.style.fontSize = matched_filter.options.font_size + 'em';
        bar.style.color = '#' + matched_filter.options.font_color;
        bar.style.backgroundColor = '#' + matched_filter.options.background_color;

        // Bodyの直下Elementとして挿入
        var body = document.body;
        body.insertBefore(bar, body.firstChild)

        // topbarが被ってしまうのでBodyにPaddingを入れる
        var bar_height = document.getElementById('topbar').clientHeight
        body.style.paddingTop = bar_height + 'px';
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
        case 'disable_topbar':
            removeBar();
    };
});

function removeBar() {
    var bar = document.getElementById('topbar');
    if (bar != null) {
        bar.hidden = true;
    }
};
