// 1 获取文章分类数据
//  获取layer对象
var layer = layui.layer;
function getText() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, shift: 6 });
            }
            layer.msg(res.message, { icon: 1, shift: 6 });
            // 渲染图书数据
            // 1 引入模板js文件
            // 2 准备数据
            // 3 准备模板
            // 4 调用函数
            var t = template('tpl', res)
            // 5 渲染数据
            $('tbody').empty().append(t);
        }
    });
}
getText();
// 2 添加图书
function addText() {
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            title: '在线调试',
            content: '可以填写任意的layer代码',
            area: ['500px', '300px']
        });
    })
};
addText();