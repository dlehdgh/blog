const groupEl = '.post-group'; // 페이지를 나누는 블럭
const paginateEl = $('#paginate.pagination'); // 페이지 번호를 표시하는 요소

$(document).ready(() => {
	// 코드 도구 생성
	codeGenerator();
	// 코드의 도구 버튼 이벤트
	$('.btn-run').click(codeRun);
	$('.btn-copy').click(copyClip);
	/**
	 * 코드 라벨
	 * 코드 라벨을 만들 경우 p 태그에 codeblock-label 클레스를 추가해 주면 되는데 HTML 태그를 수동으로 입력해줘야 하는 불편이 있다. 이러한 코드 라벨을 자동으로 생성하는 코드이다.
	 * 마크다운에서 코드 블럭 다음 줄에 {: data-label="Label"}를 입력하면 '.highlighter-rouge'에 data-label 속성이 추가된 것을 확인할 수 있다. data-label 속성의 값으로 코드 라벨을 생성한다.
	 */
	$('.highlighter-rouge').each((i, el) => {
		const label_class = 'codeblock-label';
		let label = $(el).attr('data-label');
		if(label != undefined && $(el).prev().hasClass(label_class) == false){
			$(el).before(`<p class="${label_class}">${label}</p>`);
		}
	});

	// 툴팁
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

	// 페이징 처리
	if($(`${groupEl}[data-page]`).length > 0){
		pageChange(1);
		// 더보기 버튼 이벤트
		$('.btn-more').click(function(){
			let page = Number($(this).attr('data-page'));
			if(page == $(this).parent().find(groupEl).length){
				$(this).attr('disabled', true);
			}else{
				$(this).attr('data-page', next);
			}
			$(this).parent().find(`${groupEl}[data-page="${page}"]`).show().find('a').eq(0).focus();
		});
		// 페이지 번호의 이벤트
		// 첫번째 페이지와 마지막 페이지로 이동
		paginateEl.find('.page-first, .page-last').click(function(){
			let page = Number($(this).attr('data-page'));
			pageChange(page);
		});
		// 이전 페이지로 이동
		paginateEl.find('.page-prev').click(() => {
			let page = Number(paginateEl.find('.page-current').text()) - 1;
			pageChange(page);
		});
		// 다음 페이지로 이동
		paginateEl.find('.page-next').click(() => {
			let page = Number(paginateEl.find('.page-current').text()) + 1;
			pageChange(page);
		});
		// 입력한 번호의 페이지로 이동
		$('#page-num-form').submit(function(event){
			event.preventDefault();
			let el = event.target['page-num'];
			let page = Number(el.value);
			const min = Number(el.min);
			const max = Number(el.max);
			const current = Number(paginateEl.find('.page-current').text());
			if(page == current) return false;
			if(page >= min && page <= max){
				$(el).val('');
				pageChange(page);
			}
		});
	}

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

// 페이징 처리 시 다른 페이지로 전환
const pageChange = (page) => {
	let total_page = $(groupEl).length;
	if(page < 1 || page > total_page) return false;
	console.log('page:', page, 'total_page', total_page)
	if(total_page == 1){// total page is 1
		paginateEl.find('.page-first, .page-last, .page-prev, .page-next').addClass('disabled').attr('disabled', true);
	}else if(page == 1){ // first
		paginateEl.find('.page-first, .page-prev').addClass('disabled').attr('disabled', true);
		paginateEl.find('.page-last, .page-next').removeClass('disabled').attr('disabled', false);
	}else if(page == total_page){// last
		paginateEl.find('.page-last, .page-next').addClass('disabled').attr('disabled', true);
		paginateEl.find('.page-first, .page-prev').removeClass('disabled').attr('disabled', false);
	}else{// page > 1 && page < last
		paginateEl.find('.page-first, .page-last, .page-prev, .page-next').removeClass('disabled').attr('disabled', false);
	}
	paginateEl.find('.page-current').text(page);
	$(groupEl).hide();
	$(`${groupEl}[data-page="${page}"]`).show();
};

// URL 변경 시 페이지 리로딩 막기
const pushState = (name, value) => {
	let url = new URL(location.href);
	url.searchParams.set(name, value);
	window.history.pushState(null, null, url.href);
};

// 코드 도구 생성
const codeGenerator = () => {
	let button = '<button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top"></button>';
	let tools = $('<div class="highlight-tools">');
	tools.append($(button).addClass('btn-copy').attr({ 'aria-label': '코드 복사', 'data-bs-title': '코드 복사' }).html('<i class="fa-solid fa-clipboard" aria-hidden="true"></i>'));
	$('pre').attr('tabindex', '0').before(tools);
	$('.language-html .highlight-tools').prepend($(button).addClass('btn-run me-1').attr({ 'aria-label': '코드 실행', 'data-bs-title': '코드 실행' }).html('<i class="fa-solid fa-caret-right" aria-hidden="true"></i>'))
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

// =======
```python {id="python-print" class="blue large" data-filename="test.py"}
import time
```


let highlightBlocks = document.querySelectorAll(".highlight");
for(let i=0; i<highlightBlocks.length; i++){
	var highlightBlock = highlightBlocks[i];

	// get language data
	var codes = highlightBlock.querySelectorAll("[data-lang]");
	var lang = codes[0].getAttribute("data-lang");

	// check if custom label is already made
	if (highlightBlock.previousElementSibling.classList.contains("codeblock-label")) continue

	// create label element
	var label = document.createElement("p");
	label.classList.add("codeblock-label");
	label.innerHTML = lang;

	// insert label
	highlightBlock.parentNode.insertBefore(label, highlightBlock);
}