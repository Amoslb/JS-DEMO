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
	var isSend = false;//�ж��Ƿ񳬳����ָ���
	
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
};