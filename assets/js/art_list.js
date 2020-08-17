// 1 获取文章数据 并渲染到页面
var layer = layui.layer;
// 美化时间
template.defaults.imports.dateFrom = function (value) {
    // 1 生成日期时间对象
    var dt = new Date(value);
    // 2 格式化
    // const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

}
// 定义一个参数对象 
var p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
};
// 1 获取文章数据
inniTable();
function inniTable() {
    $.ajax({
        method: 'get',
        url: '/my/article/list',
        data: p,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('文章列表获取失败')
            }
            var t = template('tpl', res);
            $('tbody').empty().append(t);
        }
    })
}