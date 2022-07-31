document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    var btn_disable = document.getElementById('btn_disable');
    btn_disable.addEventListener('click', onClickDisable)
};

function onClickDisable() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'disable_topbar' });
    });
};
