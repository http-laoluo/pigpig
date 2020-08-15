$(function () {
    //  获取 layer对象
    var layer = layui.layer;
    // 1获取用户信息
    getName();

    function getName() {
        $.ajax({
            method: 'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            headers: { Authorization: localStorage.getItem('token') || '' },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // 2 渲染头像
                sendHead(res.data);
            }
        })
    }
    //2 封装渲染头像
    function sendHead(data) {
        var name = data.nickname || data.username;
        $('#welcome').html('欢迎 ' + name);
        if (data.user_pic) {
            $('.layui-nav-img').attr('src', data.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            var t = name[0];
            t = t.toUpperCase();
            $('.text-avatar').html(t).show();
        }

    }
    // 3 点击退出返回登录页 删除本地存储
    $('.layui-nav-item').on('click', function () {
        // console.log(1);
        layer.confirm('确定退出吗?', { icon: 5, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    })
})