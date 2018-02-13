Vue.prototype.zui = zui;
var app = new Vue({
    el: '#app',
    data: {
        arr: [],
        id: ""
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
                editor.txt.html(data[0].content);
                that.id = data[0]._id;
                that.initMethod();
            },
            error: function(err) {
                that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
            }
        })
    },
    beforeupdate: function() {

    },
    methods: {
        initMethod: function() {
            this.$nextTick(function() {
                $("li").eq(0).addClass("blue");
                $(".w-e-text-container").css("z-index", 999);
            });
        },
        getContent: function(id, event) {
            $("li").removeClass("blue");
            $(event.target).addClass('blue');
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
                    editor.txt.html(data.content);
                },
                error: function(err) {
                    that.zui.toast('获取内容失败', 'center', 'warning', null, 'warning-sign');
                }
            });
        },
        addMenus: function() {
            var that = this;
            var title = $("#title").val();
            if (!title) {
                that.zui.toast("目录标题不能为空", 'center', 'warning', null, 'warning-sign');
                return;
            }
            $.ajax({
                url: '/addMenus',
                type: 'get',
                dataType: 'json',
                data: { title: title },
                beforeSend: function(xhr) {
                    $("#confirm").addClass("disabled").attr("disabled");
                },
                success: function(data) {
                    if (data.status==0) {
                        that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                        return;
                    };
                    that.arr.push(data);
                    that.zui.toast('目录添加成功', 'center', 'success', );
                    $('#addModal').modal('hide');

                },
                error: function(err) {
                    that.zui.toast('目录添加失败', 'center', 'warning', null, 'warning-sign');
                },
                complete: function(xhr, status) {
                    $("#confirm").removeClass("disabled").removeAttr("disabled");
                    $("#title").val("");

                }
            })
        },
        deleteMenus: function(e, id) {
            var that = this;
            e.stopPropagation()
            $.ajax({
                url: '/deleteContent',
                type: 'get',
                dataType: 'json',
                data: { id: id },
                success: function(data) {
                    if (data.status==0) {
                        that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                        return;
                    };
                    that.arr = [];
                    that.arr = data;
                    editor.txt.html(data[0].content);
                    that.id = data[0]._id;
                    that.zui.toast('删除成功', 'center', 'success');
                    $("li").removeClass("blue");
                    $("li").eq(0).addClass("blue");
                },
                error: function(err) {
                    that.zui.toast('删除失败', 'center', 'warning', null, 'warning-sign');
                }
            });
        },
        saveContent: function() {
            var content = editor.txt.html();
            if (!content) {
                that.zui.toast("内容不能为空", 'center', 'warning', null, 'warning-sign');
                return;
            }
            var that = this;
            $.ajax({
                url: '/saveContent',
                type: 'get',
                dataType: 'json',
                data: { content: content, id: that.id },
                beforeSend: function(xhr) {
                    $("#save").prop("disabled");
                },
                success: function(data) {
                    if (data.status==0) {
                        that.zui.toast(data.message, 'center', 'warning', null, 'warning-sign');
                        return;
                    };
                    that.zui.toast('保存成功', 'center', 'success');
                },
                error: function(err) {
                    that.zui.toast('保存失败', 'center', 'warning', null, 'warning-sign');
                },
                complete: function() {
                    $("#save").removeAttr("disabled");
                }
            })
        }
    },
    watch: {},
    computed: {}
});
var E = window.wangEditor;
var editor = new E("#editor");
editor.create();
editor.customConfig.menus = [
    'head', // 标题
    'bold', // 粗体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'video', // 插入视频
    'code', // 插入代码
    'undo', // 撤销
    'redo' // 重复
];
editor.customConfig.lang = {
    '设置标题': 'title',
    '正文': 'p',
    '链接文字': 'link text',
    '链接': 'link',
    '上传图片': 'upload image',
    '上传': 'upload',
    '创建': 'init'
    // 还可自定添加更多
};
// 自定义配置颜色（字体颜色、背景色）
editor.customConfig.colors = [
    '#000000',
    '#eeece0',
    '#1c487f',
    '#4d80bf',
    '#c24f4a',
    '#8baa4a',
    '#7b5ba1',
    '#46acc8',
    '#f9963b',
    '#ffffff'
];
// 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
editor.customConfig.emotions = [];
editor.customConfig.uploadImgServer = '/upload'; // 上传图片到服务器
editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
// 将图片大小限制为 3M
editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
// 限制一次最多上传 5 张图片
editor.customConfig.uploadImgMaxLength = 5;
editor.customConfig.zIndex = 6000; //富文本区域大小
editor.customConfig.pasteFilterStyle = true; //开启粘贴样式
editor.customConfig.debug = true; //开启debug模式
editor.customConfig.uploadImgHooks = {
    before: function(xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
    },
    success: function(xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    },
    fail: function(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    },
    error: function(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },
    timeout: function(xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },

    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.url
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
    }
}