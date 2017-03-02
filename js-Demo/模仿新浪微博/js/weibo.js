window.onload = function()
{	
	//����id��ȡԪ��
	var $ = function(id){return document.getElementById(id);};
	
	//����Tag��ȡԪ�� ����
	var $t = function(tag, parentElem){return (parentElem || document).getElementsByTagName(tag);};
	
	//����Class��ȡԪ�� ����
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
	
	//1��$(div, "color");//��ȡdiv��color��ʽ
	//2��$(div, "opacity", "50");//��div����color��ʽ����ɫֵΪ#900
	//3��$(div, {"color":"#900", "background":"#0f0"});//������������ʽ
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
	
	var content = $("content");//����΢�����ݵ�����
	var form = $t("form", content)[0];//��ñ�
	var username = $("userName");//����û��������
	var conBox = $("conBox");//���΢�����ݵ������
	var sendBtn = $("sendBtn");//��ù㲥��ť
	var countTxt = $c("countTxt", form)[0];//������ʾ����
	var maxNum = $c("maxNum", form)[0];//΢������
	var list = $c("list", content)[0];//�õ��㲥�б�
	var ul = $t("ul", list)[0];//����б��е�ul
	var li = $t("li", ul);//�õ���Ϣ�б�
	var inps = $c("inps", form);//��class��ʽ���΢������
	var avatars = $("avatar");//ͷ������
	var ava = $t("img", avatars);//���ͷ��
	var bSend = false;//�ж��Ƿ񳬳����ָ���
	var maxNums = 140;
	
	//��ֹ���ύ
	form.onsubmit = function(){return false;};
	
	//Ϊ�㲥��ť����ͣ�뿪�¼�
	sendBtn.onmouseover = function(){this.className = "hover";};
	sendBtn.onmouseout = function(){this.className = "";};
	
	//������ʧ�����¼�
	for(var i = 0, j = inps.length; i < j; i++)
	{
		inps[i].onfocus = function(){this.className = "active";};
		inps[i].onblur = function(){this.className = "inps";};
	}
	
	//ͷ��
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
	
	//�б��hoverЧ��
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
	
	//ɾ������
	var delfn = function()
	{
		var _this = this;
		var par = this.parentNode.parentNode.parentNode;//���ҵ���ǰ��liԪ��
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
	
	//�¼��󶨣��ж��ַ�������
	conBox.onkeyup = conBox.onkeydown = conBox.onchange = function()
	{
		var len  = 0;
		//��b��a��c��
		for(var i = 0, j = conBox.value.length; i < j; i++)
		{
			len += /[\u4e00-\u9fa5]/g.test(conBox.value.charAt(i)) ? 1 : 0.5;
		}
		
		maxNum.innerHTML = Math.abs(maxNums - Math.ceil(len));
		//maxNum.innerHTML = Math.abs(maxNums - Math.floor(len));
		
		if(maxNums - Math.ceil(len) >= 0)
		{
			$css(countTxt, "color", "");
			countTxt.innerHTML = "��������";
			bSend = true;
		}
		else
		{
			$css(countTxt, "color", "#f60");
			countTxt.innerHTML = "�ѳ���";
			bSend = false;
		}
	};
	
	sendBtn.onclick = function()
	{
		var reg = /^\s*$/g;
		if(reg.test(username.value))
		{
			alert("�����������û�����");
			username.focus();
		}
		else if(!/^[\u4e00-\u9fa5\w]{2,8}$/g.test(username.value))
		{
			alert("����ֻ����2-8λ��ĸ�����֡��»��ߺͺ�����ɣ�");
			username.focus();
		}
		else if(reg.test(conBox.value))
		{
			alert("���˵��ʲô��~");
			conBox.focus();
		}
		else if(!bSend)
		{
			alert("������������Ѿ����������ƣ����飡");
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
						<span>' + format(date.getMonth() + 1) + '��' + format(date.getDate()) + '�� ' + format(date.getHours()) + ":" + format(date.getMinutes()) + '</span>\
						<a class="del" href="javascript:;">ɾ��</a>\
					</div>\
				</div>';
				
			//����Ԫ��
			li.length ? ul.insertBefore(create_li, li[0]) : ul.appendChild(create_li);
			
			//���ñ�
			form.reset();
			
			//����ͷ��
			for(var i = 0, j = ava.length; i < j; i++){ava[i].className = "";}
			ava[0].className = "current";
			
			//����߶�
			var iHeight = create_li.offsetHeight - Math.round(parseFloat($css(create_li, "paddingTop"))) + Math.round(parseFloat($css(create_li, "paddingBottom")));
			
			//͸���Ⱥ͸߶ȶ�����Ϊ0
			$css(create_li, {"opacity":"0", "height":"0"});
			
			//��������
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
			
			//��������
			maxNum.innerHTML = maxNums;
			
			delLi(create_li);
			liHover(create_li);
		}		
	};	
};