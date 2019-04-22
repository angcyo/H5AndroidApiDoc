Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function doUrl(raw) {
    return raw.replace(/\s*/g, "").replace(/\./g, "/").replace('/html', '.html')
}

const JCENTER = "jcenter"
const ANDROID = "android"

function getHistory(key) {
    let history = localStorage.getItem(key)
    if (history) {
        history = JSON.parse(history)
    }
    return history || []
}

function saveHistory(key, item) {
    let history = getHistory(key)
    history.remove(item)

    history.unshift(item)

    localStorage.setItem(key, JSON.stringify(history))
}

function removeHistory(key, item) {
    let history = getHistory(key)
    history.remove(item)

    localStorage.setItem(key, JSON.stringify(history))
}

function updateHistoryUI(elemId, items) {
    $(elemId).children().remove()
    items.forEach(item => {
        let li = $('<li></li>').addClass('list-group-item click_item').text(item)
        let remove = $('<span></span>').addClass('glyphicon glyphicon-remove remove_item').attr('aria-hidden', true)
        $(li).append(remove)
        $(elemId).append(li)

        $(li).mouseover(function () {
            $(remove).css('opacity', 1)
        })
        $(li).mouseout(function () {
            $(remove).css('opacity', 0)
        })

        $(remove).click(function () {
            if ('#jcenter_history' == elemId) {
                removeHistory(JCENTER, item)
            } else if ('#android_history' == elemId) {
                removeHistory(ANDROID, item)
            }
            updateUI()
        })

        $(li).click(function () {
            if ('#jcenter_history' == elemId) {
                openJcenter(item)
            } else if ('#android_history' == elemId) {
                openAndroid(item)
            }
        })
    });
}

function updateUI() {
    updateHistoryUI('#jcenter_history', getHistory(JCENTER))
    updateHistoryUI('#android_history', getHistory(ANDROID))
}

function openAndroid(input) {
    if (!input) {
        input = 'android.view.View'
    }

    if (input) {
        // console.log(this)
        // console.log($('#input').val()) android/view/View
        window.open(`https://developer.android.google.cn/reference/${doUrl(input)}`)
    }

    saveHistory(ANDROID, input)
    updateHistoryUI('#android_history', getHistory(ANDROID))
}

function openJcenter(input) {
    if (!input) {
        input = 'com.android'
    }

    if (input) {
        // console.log(this)
        // console.log($('#input').val()) android/view/View
        window.open(`https://jcenter.bintray.com/${doUrl(input)}`)
    }

    saveHistory(JCENTER, input)
    updateHistoryUI('#jcenter_history', getHistory(JCENTER))
}


$(document).ready(() => {
    updateUI()

    $('#search').click(() => {
        let input = $('#input').val()
        openAndroid(input)
    })

    $('#search_b').click(() => {
        let input = $('#input_b').val()
        openJcenter(input)
    })
})