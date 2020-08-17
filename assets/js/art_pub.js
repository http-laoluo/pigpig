// 1 渲染文章分类
initCate();
var layer = layui.layer;
var form = layui.form;

function initCate() {
    // 1 获取所有分类
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, shift: 5 });
            }
            // layer.msg(res.message, { icon: 1, shift: 6 });
            var t = template('tpl-cate', res);
            $('[name="cate_id"]').html(t);
            // 手动渲染表单
            form.render();
        }
    })
    // 2 渲染到下拉列表
};
// 点击选择封面 弹出选择文件
$('#btnChooseImage').on('click', function () {
    $('#coverFile').click();
});
// 选中文件触发change事件
$('#coverFile').on('change', function (e) {
    var files = e.target.files;
    if (files.length == 0) {
        return
    }
    // 更新裁剪区域
    var imgURL = URL.createObjectURL(files[0])
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域

});
// 定义文章发布状态
var art_state = '已发布'
// 存为草稿
$('#btnSave2').on('click', function () {
    art_state = '草稿';
});

$('#form-pub').on('submit', function (e) {
    e.preventDefault();
    var data = new FormData($(this)[0]);
    data.append('state', art_state)
    data.forEach(function (i, v) {
        console.log(i, v);

    });
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            data.append('cover_img', blob)
            // 6. 发起 ajax 数据请求
            publistText(data);
        });
});
function publistText(data) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: data,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/art_list.html'
        }
    })
}