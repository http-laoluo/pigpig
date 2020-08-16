$(function () {
    //    1 点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 2 点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 3 获取 layer对象 form对象
    var layer = layui.layer;
    var form = layui.form;
    //   4 自定义校验函数
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        reqpwd: function (value) {
            var pw = $('#form_reg input[name="password"]').val();
            if (pw !== value) {
                return '两次密码不一样';
            }
        }

    });
    // 5 给注册表达绑定事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var uname = $('#form_reg input[name="username"]').val().trim();
        var pw = $('#form_reg input[name="password"]').val().trim();

        // 发送注册请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: uname,
                password: pw
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功', { icon: 6 });
                $('#link_login').click();
            }
        })

    });
    // 6 给登录表达绑定事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        var data = $(this).serialize();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                localStorage.setItem('token', res.token)
                location.href = './index.html';
            }
        })
    })
});