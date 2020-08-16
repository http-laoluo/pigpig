$(function () {
    // 获取form layer对象 
    var form = layui.form;
    var layer = layui.layer;
    // 1 获取数据
    getUser();
    function getUser() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 6 });
                }
                // sendDate(res.data);
                form.val("formUserInfo", res.data);
            }
        })
    };
    // 2点击重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getUser();
    });
    // 3 点击提交修改
    $('.layui-form').on('submit', function (e) {
        // console.log($(this).serialize());
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 1 });
                window.parent.getName();
            }
        })
    })
})