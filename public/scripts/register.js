Vue.prototype.zui = zui;
var app = new Vue({
    el: '#app',
    data: {},
    mounted: function() {},
    methods: {
        register: function() {
            var that = this;
            var postData = {
                username: $("#username").val(),
                telephone: $("#telephone").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                passwordAgain: $("#passwordAgain").val()
            };
            $.ajax({
                url: '/registerUser',
                type: 'post',
                dataType: 'json',
                data: postData,
                beforeSend: function(xhr) {
                    $(".loginBtn").prop("disabled");
                },
                success: function(data) {
                    if (data.status == 0) {
                        that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                        return;
                    };
                    window.location.href = "/login";
                },
                error: function(err) {
                    that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
                },
                complete: function() {
                    $(".loginBtn").removeAttr("disabled");
                }
            });
        }
    },
    computed: {

    }
});