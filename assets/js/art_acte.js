// 1 获取文章分类数据
//  获取layer对象
var layer = layui.layer;
var form = layui.form;
function getText() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, shift: 6 });
            }
            // layer.msg(res.message, { icon: 1, shift: 6 });
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
var indexAdd = null;
function addText() {
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '300px']
        });
    })
};
addText();
// 绑定表单提交
$('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('新增分类失败！')
            }
            getText();
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层（so，打开弹出层时要保存其索引）
            layer.close(indexAdd)
        }
    })
});
// console.log($('#dialog-edit').html());
//  给编辑绑定事件
// 显示赋值
var indexEdit = null;
$('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
        type: 1,
        title: '编辑文章分类',
        content: $('#dialog-edit').html(),
        area: ['500px', '300px']
    });
    var id = $(this).attr('data-id');
    $.ajax({
        method: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            form.val('form-edit', res.data)
        }
    });
});
// 编辑修改
$('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, shift: 5 });
            }
            layer.msg(res.message, { icon: 1, shift: 6 });
            getText();
        }
    });
    layer.close(indexEdit);
});
// 删除分类
$('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    layer.confirm('你确定要删除吗?', { icon: 5, title: '提示' }, function (index) {
        //do something
        $.ajax({
            method: 'get',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 2, shift: 5 });
                }
                layer.msg(res.message, { icon: 1, shift: 6 });
                getText();

            }
        });
        layer.close(index);
    });
    layer.close(indexEdit);
})