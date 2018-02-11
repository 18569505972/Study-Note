let zui={
	toast:function(msg,place,type,time,icon,close){
		var place=place || "center",
		    type=type || 'success',
		    time=time || 3000,
		    close=close || false;
        var icon=icon?icon:'ok-sign';
		new $.zui.Messager(msg, {placement: place,type:type,time:time,icon:icon,close:close}).show();
	}
};