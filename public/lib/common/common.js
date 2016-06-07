/**
 * [用户登录注册ajax]
 */
$(document).ready(function () {


	//获得浏览器参数
	$.extend({
		getUrlVars: function(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		},
		getUrlVar: function(name){
			return $.getUrlVars()[name];
		}
	});

	//封装浏览器参数
	var composeUrlParams=function(){
		var param='';
		$.each($.getUrlVars(), function(i, item) {
			if(item!='p'){
				var val=$.getUrlVar(item);
				if(val) param += "&" + item+"="+val;
			}
		});
		return param;
	}


	$('#signupBtn').click(function () {
		userSignup();
		return false;
	});
	$('#searchBtn').click(function () {
		search();
		return false;
	});

	$('#signinBtn').click(function () {
		userSignin();
		return false;
	});


	//查询分页
	var page=$('#pagination');
	var options = {
		currentPage:page.attr('pageNum'),
		totalPages:page.attr('pageCount'),
		numberOfPages:page.attr('numberOfPages'),
		pageUrl: function(type, page, current){
			return "/course/list?"+composeUrlParams()+"&p="+page;
		}
	}
	$('#pagination').bootstrapPaginator(options);
});

/**
 * [userSignup 用户注册]
 * @return {[type]} [description]
 */
function userSignup () {
	var data = {
		user_email: $('#signup_user_email').val(),
		user_password: $('#signup_user_password').val(),
		user_name: $('#signup_user_name').val(),
		phone_number: $('#signup_phone_number').val()
	};

	$.post('/users/signup', data, function (data) {
		if (data.ret == 0) {
			window.location.reload();
		} else {
			$('#login_box .form-tip-signup').html(data.msg);
		}
	});
}

/**
 * [userSignup 用户登录]
 * @return {[type]} [description]
 */
function userSignin () {
	var data = {
		user_email: $('#user_email').val(),
		user_password: $('#user_password').val()
	};
	console.log('data----'+JSON.stringify(data));
	$.post('/users/signin', data, function (data) {
		if (data.ret == 0) {
			console.log(data);
			window.location.reload();
		} else {
			$('#login_box .form-tip-signin').html(data.msg);
		}
	});
}

/**
 * [userSignup 用户登录]
 * @return {[type]} [description]
 */
function search() {
	console.log()
}