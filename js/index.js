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

const LEFT_LINKS = [{
    'title': "MDN Web 开发文档",
    'link': 'https://developer.mozilla.org/zh-CN/docs/Web/Tutorials'
}, {
    'title': "前站导航",
    'link': 'https://www.frontendjs.com/'
}, {
    'title': "BootCDN",
    'link': 'https://www.bootcdn.cn/'
}, {
    'title': "Android OS源码",
    'link': 'http://www.androidos.net.cn/'
}, {
    'title': 'Java 开源库排行榜',
    'link': 'https://github.com/search?l=Java&type=Repositories&q=stars:>=1000'
}, {
    'title': 'Java 最近火爆的开源库排行榜',
    'link': 'https://github.com/search?l=Java&type=Repositories&q=stars:>=1000&s=updated&o=desc'
}, {
    'title': 'Java 最近流行的开源库排行榜',
    'link': 'https://github.com/search?l=Java&type=Repositories&q=stars:>=100&s=updated&o=desc'
}, {
    'title': '阿里巴巴镜像',
    'link': 'https://opsx.alibaba.com/mirror?lang=zh-CN'
}, {
    'title': 'Github 排行榜',
    'link': 'https://github.com/search?type=Repositories&q=stars:%3E=5000'
}]


const RIGHT_LINKS = [{
    'title': "AS更新日志",
    'link': 'https://developer.android.google.cn/studio/releases/index.html'
}, {
    'title': "AS预览版特性",
    'link': 'https://developer.android.google.cn/studio/preview/features/'
}, {
    'title': "AS版本下载列表",
    'link': 'https://developer.android.google.cn/studio/archive'
}, {
    'title': "AS使用指南",
    'link': 'https://developer.android.google.cn/studio/intro'
}, {
    'title': 'Android 版本更新日志',
    'link': 'https://developer.android.google.cn/preview'
}, {
    'title': 'Android 开发参考',
    'link': 'https://developer.android.google.cn/reference'
}, {
    'title': 'Android 开发指南',
    'link': 'https://developer.android.google.cn/guide'
}, {
    'title': 'Kotlin 上手指南',
    'link': 'https://developer.android.google.cn/kotlin'
}]

function fillList(parentId, datas) {
    $(parentId).children().remove()
    datas.forEach(item => {
        let li = $('<li></li>').addClass('list-group-item click_item').text(item.title)
        $(parentId).append(li)

        $(li).click(function () {
            window.open(item.link)
        })
    });
}

$(document).ready(() => {
    $('#search').click(() => {
        let input = $('#input').val()
        openAndroid(input)
    })

    $('#search_b').click(() => {
        let input = $('#input_b').val()
        openJcenter(input)
    })

    updateUI()
    fillList('#right_aside', RIGHT_LINKS)
    fillList('#left_aside', LEFT_LINKS)
})