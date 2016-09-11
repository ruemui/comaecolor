/**
 * 本ファイルまでの相対パス
 */
var PATH = (function () {
	var scripts = document.getElementsByTagName('script');
	var src = scripts[scripts.length - 1].getAttribute('src');
	var index = src.lastIndexOf('/');
	return (index !== -1) ? src.substring(0, index) : '';
})();

/**
 * IE判別
 */

var ua = navigator.userAgent;
var isIE = ua.match(/msie/i),
	isIE8 = ua.match(/msie [8.]/i),
	isIE9 = ua.match(/msie [9.]/i),
	isIE10 = ua.match(/msie [10.]/i);
	isIE11 = ua.match(/msie [11.]/i);
if (isIE) {
	$("body").addClass('ie');
	if (isIE8) {
		$("body").addClass('ie8');
	} else if (isIE9) {
		$("body").addClass('ie9');
	} else if (isIE10) {
		$("body").addClass('ie10');
	} else if (isIE11) {
		$("body").addClass('ie11');
	}
}


/**
 * ページ内のスムーズスクロール
 *
 * @param jQuery $ jQuery オブジェクト
 * @require jQuery v1.7.2
 * @require jQuery Easing v1.3
 */
function setSmoothScroll($) {
	$('a[href^="#"], area[href^="#"]').not('a[href="#"], area[href="#"]').each(function() {
		var hash = $(this).attr('href');
		this.data = {
			hash: hash,
			href: (function() {
				var a = document.createElement('a');
				a.href = hash;
				return a.href;
			})()
		};
	}).on('click', function() {
		var data = this.data;
		var $target = $(data.hash);
		if($target.length !== 0) {
			$('html, body').stop(true).animate(
				{ scrollTop: $target.offset().top +'px' },
				1000,
				'swing',
				function() { location.href = data.href; }
			);
		}
	});
}

/**
 * リンクの別ウィンドウ表示
 *
 * @param jQuery $ jQuery オブジェクト
 * @require jQuery v1.7.2
 */
function setLinkNewWindow($) {
	var $targets = $('a[href^="http://"], a[href^="https://"]').not('a[href^="http://'+ location.hostname +'"], a[href^="https://'+ location.hostname +'"], a[data-rel="external"]');
	$targets.on('click', function() {
		open($(this).attr('href'), null);
		return false;
	});
}

/**
 * リンクの別ウィンドウ表示
 *
 * @param jQuery $ jQuery オブジェクト
 * @require jQuery v1.7.2
 */
function setHeader($) {
	(function (window, document) {
	var menu = document.getElementById('menu'),
	    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

	function toggleHorizontal() {
	    [].forEach.call(
	        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
	        function(el){
	            el.classList.toggle('pure-menu-horizontal');
	        }
	    );
	};

	function toggleMenu() {
	    // set timeout so that the panel has a chance to roll up
	    // before the menu switches states
	    if (menu.classList.contains('open')) {
	        setTimeout(toggleHorizontal, 500);
	    }
	    else {
	        toggleHorizontal();
	    }
	    menu.classList.toggle('open');
	    document.getElementById('toggle').classList.toggle('x');
	};

	function closeMenu() {
	    if (menu.classList.contains('open')) {
	        toggleMenu();
	    }
	}

	document.getElementById('toggle').addEventListener('click', function (e) {
	    toggleMenu();
	});

	window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
	})(this, this.document);
}

/**
 * 読み込み完了時の処理
 *
 * @require jQuery v1.7.2
 */
jQuery(function($) {
	setSmoothScroll($);
	setLinkNewWindow($);
	setHeader($);
});