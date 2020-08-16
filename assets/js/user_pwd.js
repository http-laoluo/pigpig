// 获取from layer对象
var form = layui.form;
var layer = layui.layer;
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
        if ($('[name="oldPwd"]').val() == value) {
            return '新密码和原密码相同'
        }
    },
    rePwd: function (value) {
        if ($('[name="newPwd"]').val() !== value) {
            return '密码和确认密码不一致'
        }
    }
});
//  1 点击 修改按钮提交表单
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, shift: 6 });
            }
            layer.msg(res.message, { icon: 1 });
        }
    })
})