function doUrl(raw) {
    return raw.replace(/\s*/g, "").replace(/\./g, "/").replace('/html', '.html')
}

$(document).ready(() => {
    $('#search').click(() => {
        let input = $('#input').val()

        if (!input) {
            input = 'android.view.View'
        }

        if (input) {
            // console.log(this)
            // console.log($('#input').val()) android/view/View
            window.open(`https://developer.android.google.cn/reference/${doUrl(input)}`)
        }

    })

    $('#search_b').click(() => {
        let input = $('#input_b').val()

        if (!input) {
            input = 'com.android'
        }

        if (input) {
            // console.log(this)
            // console.log($('#input').val()) android/view/View
            window.open(`https://jcenter.bintray.com/${doUrl(input)}`)
        }

    })
})