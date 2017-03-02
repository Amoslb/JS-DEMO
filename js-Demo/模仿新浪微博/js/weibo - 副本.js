window.onload = function()
{
	//根据id获取元素
	var $ = function(id){return document.getElementById(id);};
	
	//根据Tag获取元素 数组
	var $t = function(tag, parentElem){return (parentElem || document).getElementsByTagName(tag);};
	
	//根据Class获取元素 数组
	var $c = function(clsName, parentElem)
	{
		var classElems = [];
		if(document.getElementsByClassName)
		{
			classElems = (parentElem || document).getElementsByClassName(clsName);
		}
		else
		{
			var regCls = new RegExp("(^| )" + clsName + "( |$)");
			var elems = $t("*", parentElem);
			for(var i = 0, j = elems.length; i < j; i++)
			{
				regCls.test(elems[i].className) && classElems.push(elems[i]);
			}
		}
		return classElems;
	};
	
	//1、$(div, "color");//获取div的color样式
	//2、$(div, "opacity", "50");//给div设置color样式，颜色值为#900
	//3、$(div, {"color":"#900", "background":"#0f0"});//批量的设置样式
	var $css = function(elem, attr, val)
	{
		if(arguments.length == 2)
		{
			if(typeof attr == "object")
			{
				for(var items in attr)
				{
					if(items == "opacity")
					{
						elem.style["filter"] = "alpha(opacity=" + attr[items] + ")";
						elem.style[items] = attr[items] / 100;
					}
					else
					{
						elem.style[items] = attr[items];
					}
				}
			}
			else
			{
				return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, null)[attr];
			}
		}
		else if(arguments.length == 3)
		{
			if(attr == "opacity")
			{
				elem.style["filter"] = "alpha(opacity=" + val + ")";
				elem.style[attr] = val / 100;
			}
			else
			{
				elem.style[attr] = val;
			}
		}
	};
	
	var content = $("content");//整个微薄内容的区域
	var form = $t("form", content)[0];//获得表单
	var username = $("userName");//获得用户名输入框
	var conBox = $("conBox");//获得微薄内容的输入框
	var sendBtn = $("sendBtn");//获得广播按钮
	var countTxt = $c("countTxt", form)[0];//字数提示区域
	var maxNum = $c("maxNum", form)[0];//微薄字数
	var list = $c("list", content)[0];//得到广播列表
	var ul = $t("ul", list)[0];//获得列表中的ul
	var li = $t("li", ul);//得到信息列表
	var inps = $c("inps", form);//以class方式获得微薄内容
	var avatars = $("avatar");//头像区域
	var ava = $t("img", avatars);//获得头像
	var isSend = false;//判断是否超出文字个数
	
	//阻止表单提交
	form.onsubmit = function(){return false;};
	
	//为广播按钮绑定悬停离开事件
	sendBtn.onmouseover = function(){this.className = "hover";};
	sendBtn.onmouseout = function(){this.className = "";};
	
	//输入框得失焦点事件
	for(var i = 0, j = inps.length; i < j; i++)
	{
		inps[i].onfocus = function(){this.className = "active";};
		inps[i].onblur = function(){this.className = "inps";};
	}
	
	//头像
	for(var i = 0, j = ava.length; i < j; i++)
	{
		ava[i].onmouseover = function()
		{
			this.className += " hover"
		};
		
		ava[i].onmouseout = function()
		{
			this.className = this.className.replace(/\s*?hover/, "");
		};
		
		ava[i].onclick = function()
		{
			for(var i = 0; i < j; i++)
			{
				ava[i].className = "";
			}
			this.className = "current";
		};
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
};