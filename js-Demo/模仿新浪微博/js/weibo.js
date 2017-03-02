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
	var bSend = false;//判断是否超出文字个数
	var maxNums = 140;
	
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
	
	//列表的hover效果
	var liHover = function(elem)
	{
		if(elem)
		{
			elem.onmouseover = function(){this.className = "hover";};
			elem.onmouseout = function(){this.className = "";}
		}
		else
		{
			for(var i = 0, j = li.length; i < j; i++)
			{
				li[i].onmouseover = function(){this.className = "hover";};
				li[i].onmouseout = function(){this.className = "";}
			}
		}
	};
	liHover();
	
	//删除功能
	var delfn = function()
	{
		var _this = this;
		var par = this.parentNode.parentNode.parentNode;//查找到当前的li元素
		var alpha = 100;
		var iHeight = par.offsetHeight;
		this.timer = setInterval
		(
			function()
			{
				$css(par, "opacity", (alpha -= 10));
				if(alpha <= 0)
				{
					clearInterval(_this.timer);
					_this.timer = setInterval
					(
						function()
						{
							iHeight -= 10;
							iHeight < 0 && (iHeight = 0);
							$css(par, "height", iHeight + "px");
							iHeight == 0 &&(clearInterval(_this.timer), ul.removeChild(par))
						},30
					);
				}
			},30
		);
	};
	
	var delLi = function(elem)
	{
		if(elem)
		{
			$c("del", elem)[0].onclick = delfn;
		}
		else
		{
			var del = $c("del", ul);
			for(var i = 0, j = del.length; i < j; i++)
			{
				del[i].onclick = delfn;
			}
		}
	}
	delLi();
	
	var format = function(num)
	{
		num < 10 && (num = "0" + num);
		return num;
	};
	
	//事件绑定，判断字符的输入
	conBox.onkeyup = conBox.onkeydown = conBox.onchange = function()
	{
		var len  = 0;
		//啊b不a错c的
		for(var i = 0, j = conBox.value.length; i < j; i++)
		{
			len += /[\u4e00-\u9fa5]/g.test(conBox.value.charAt(i)) ? 1 : 0.5;
		}
		
		maxNum.innerHTML = Math.abs(maxNums - Math.ceil(len));
		//maxNum.innerHTML = Math.abs(maxNums - Math.floor(len));
		
		if(maxNums - Math.ceil(len) >= 0)
		{
			$css(countTxt, "color", "");
			countTxt.innerHTML = "还能输入";
			bSend = true;
		}
		else
		{
			$css(countTxt, "color", "#f60");
			countTxt.innerHTML = "已超出";
			bSend = false;
		}
	};
	
	sendBtn.onclick = function()
	{
		var reg = /^\s*$/g;
		if(reg.test(username.value))
		{
			alert("请输入您的用户名！");
			username.focus();
		}
		else if(!/^[\u4e00-\u9fa5\w]{2,8}$/g.test(username.value))
		{
			alert("姓名只能由2-8位字母、数字、下划线和汉字组成！");
			username.focus();
		}
		else if(reg.test(conBox.value))
		{
			alert("随便说点什么吧~");
			conBox.focus();
		}
		else if(!bSend)
		{
			alert("您输入的内容已经超出了限制，请检查！");
			conBox.focus();
		}
		else
		{
			var create_li = document.createElement("li");
			var date = new Date();
			create_li.innerHTML = '\
				<div class="userPic">\
					<img src="' + $c("current", avatars)[0].src + '"\/>\
				</div>\
				<div class="content">\
					<div class="userName"><a href="javascript:;">' + username.value + '</a>:</div>\
					<div class="msgInfo">' + conBox.value.replace(/<.+?>|&nbsp;/ig, "") + '</div>\
					<div class="times">\
						<span>' + format(date.getMonth() + 1) + '月' + format(date.getDate()) + '日 ' + format(date.getHours()) + ":" + format(date.getMinutes()) + '</span>\
						<a class="del" href="javascript:;">删除</a>\
					</div>\
				</div>';
				
			//插入元素
			li.length ? ul.insertBefore(create_li, li[0]) : ul.appendChild(create_li);
			
			//重置表单
			form.reset();
			
			//重置头像
			for(var i = 0, j = ava.length; i < j; i++){ava[i].className = "";}
			ava[0].className = "current";
			
			//保存高度
			var iHeight = create_li.offsetHeight - Math.round(parseFloat($css(create_li, "paddingTop"))) + Math.round(parseFloat($css(create_li, "paddingBottom")));
			
			//透明度和高度都设置为0
			$css(create_li, {"opacity":"0", "height":"0"});
			
			//动画部分
			var alpah = count = 0;
			create_li.timer = setInterval
			(
				function()
				{
					$css(create_li, {"display":"block", "opacity":"0", "height":(count += 8) + "px"});
					if(count > iHeight)
					{
						clearInterval(create_li.timer);
						$css(create_li, "height", iHeight + "px");
						create_li.timer = setInterval
						(
							function()
							{
								$css(create_li, "opacity", alpah+=10);
								alpah > 100 && (clearInterval(create_li.timer), $css(create_li, "opacity", "100"));
							}, 30
						);
					}
				},30
			);
			
			//重置字数
			maxNum.innerHTML = maxNums;
			
			delLi(create_li);
			liHover(create_li);
		}		
	};	
};