$(document).ready(() => {
	// 코드 도구 생성
	codeGenerator();
	// 코드의 도구 버튼 이벤트
	$('.btn-run').click(codeRun);
	$('.btn-copy').click(copyClip);

	// 툴팁
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

	// 더보기 페이징 처리
	const pgroup = '.post-group';
	$('.resume-section-content article').each((i, group) => {
		$(group).find(pgroup).eq(0).show();
	});
	$('.btn-more').click(function(){
		let page = Number($(this).attr('data-page'));
		let next = page + 1;
		if(page == $(this).parent().find(pgroup).length){
			$(this).attr('disabled', true);
		}else{
			$(this).attr('data-page', next);
		}
		$(this).parent().find(`${pgroup}[data-page="${page}"]`).show();
		$(this).parent().find(`${pgroup}[data-page="${page}"] a`).eq(0).focus();
	});

	// Facebook 공유
	$('.share-facebook').click(() => {
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href));
	});
	// Twitter 공유
	$('.share-linkedin').click(() => {
		window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href));
	});
	// LinkedIn 공유
	$('.share-linkedin').click(() => {
		window.open('https://www.linkedin.com/shareArticle?mini=true&amp;url=' + encodeURIComponent(location.href));
	});
});

// URL 변경 시 페이지 리로딩 막기
const pushState = (name, value) => {
	let url = new URL(location.href);
	url.searchParams.set(name, value);
	window.history.pushState(null, null, url.href);
};

// 코드 도구 생성
const codeGenerator = () => {
	let button = '<button type="button" class="btn btn-outline-primary btn-sm ms-1" data-bs-toggle="tooltip" data-bs-placement="top"></button>';
	let tools = $('<div class="highlight-tools">');
	tools.append($(button).addClass('btn-copy').attr({ 'aria-label': '코드 복사', 'data-bs-title': '코드 복사' }).html('<i class="fa-solid fa-clipboard" aria-hidden="true"></i>'));
	$('pre').attr('tabindex', '0').before(tools);
	$('.language-html .highlight-tools').prepend($(button).addClass('btn-run').attr({ 'aria-label': '코드 실행', 'data-bs-title': '코드 실행' }).html('<i class="fa-solid fa-caret-right" aria-hidden="true"></i>'))
};

// 코드 복사
const copyClip = (event) => {
	let code = $(event.delegateTarget).parent().next().text();
	let temp = $('<textarea class="visually-hidden">');
	$('body').append(temp);
	temp.text(code);
	temp.select();
	document.execCommand('copy');
	temp.remove();
};

// 코드 실행
const codeRun = (event) => {
	let code = $(event.delegateTarget).parent().next().text();
	let win = window.open('/blog/example.html', '_blank');
	win.onload = function(){
		win.document.body.innerHTML = code;
	}
};
