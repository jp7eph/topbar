document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    var btn_disable = document.getElementById('btn_disable');
    btn_disable.addEventListener('click', onClickDisable);

    rewriteHost();
};

function onClickDisable() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'disable_topbar' });
    });
};

function rewriteHost() {
    var div_host = document.getElementById('div_host');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'get_host' }, function (host) {
            if (host) {
                div_host.innerText = host;
            }
        });
    });
};
