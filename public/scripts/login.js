Vue.prototype.zui = zui;
var app = new Vue({
    el: '#app',
    data: {
    },
    mounted: function() {
    },
    methods: {
        login: function() {
            var that = this;
            var postData = {
                username: $("#username").val(),
                password: $("#password").val(),
            };
            $.ajax({
                url: '/loginCheck',
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
                    }else if(data.status == 1){
                        window.location.href = "/index";
                    }else if(data.status==3){
                        
                    }else {
                        $("#usernameTest").html(data.message);
                    };
                },
                error: function(err) {
                    that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
                },
                complete: function() {
                    $(".loginBtn").removeAttr("disabled");
                }
            });
        },
        usernameFocus:function(){
             this.$emit('on-focus', 
                $("#usernameTest").html('')
             )
            
        },
        jumpRegister: function() {
            window.location.href="/register";
        }
    },
    computed: {

    },
    updated:{

    }
});