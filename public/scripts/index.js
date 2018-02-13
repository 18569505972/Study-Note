Vue.prototype.zui = zui;
var app = new Vue({
    el: '#app',
    data: {
        arr: [],
        id: "",
        message: "",
        title: ""
    },
    mounted: function() {
        var that = this;
        $.ajax({
            url: '/uiInit',
            type: 'get',
            dataType: 'json',
            data: {},
            success: function(data) {
                if (data.status==0) {
                    that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                    return;
                };
                that.arr = data;
                that.id = data[0]._id;
                that.title = data[0].title;
                that.message = data[0].content;
            },
            error: function(err) {
                that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
            }
        })
    },
    methods: {
        getContent: function(id, event) {
            this.id = id;
            var that = this;
            $.ajax({
                url: '/getContent',
                type: 'get',
                dataType: 'json',
                data: { id: id },
                success: function(data) {
                    if (data.status==0) {
                        that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                        return;
                    };
                    that.title = data.title;
                    that.message = data.content;
                },
                error: function(err) {
                    that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
                }
            });
        }
    },
    computed: {

    }
});