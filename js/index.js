$(document).ready(() => {
    $('#search').click(() => {
        let input = $('#input').val()

        if (!input) {
            input = 'android.view.View'
        }

        if (input) {
            // console.log(this)
            // console.log($('#input').val()) android/view/View
            window.open(`https://developer.android.google.cn/reference/${input.replace(/\s*/g,"").replace(/\./g,"/").replace('/html', '.html')}`)
        }

    })
})