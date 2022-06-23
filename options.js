function Save() {
    var option_string = document.getElementById('option-json').value;
    chrome.storage.local.set({ 'option_json': option_string }, function () {
    });
    Load();
}

function Load() {
    chrome.storage.local.get('option_json', function (items) {
        document.getElementById('option-json').value = items.option_json;
    });
}

document.addEventListener('DOMContentLoaded', Load); 
document.getElementById('save').addEventListener('click', Save);