---
layout: post
title: "Github 블로그 - 8. 페이지 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll, Pages]
toc: true
toc_sticky: true
date: 2023-11-24 18:29
---

이번 시간에는 매인 페이지, 소개 페이지, 404 페이지를 만들 것이다.

페이지를 만들 때는 `.html` 또는 `.md` 확장자로 파일을 만든 후 **머리말**을 입력한 뒤 원하는 내용을 입력하면 된다. HTML 문법 또는 **마크다운** 문법으로 페이지를 작성할 수 있다.

### 매인 페이지 만들기

{% raw %}
```markdown
---
layout: home
---
```
{: data-label="index.html"}
{% raw %}

메인 페이지에는 최근 포스트 목록을 `home` 레이아웃을 통해 출력할 것이므로 아무런 내용을 입력하지 않아도 된다. 하지만 매인 페이지에 추가하고 싶은 내용이 있으면 추가로 입력하면 된다.

### 소개 페이지 만들기

{% raw %}
```markdown
---
layout: page
---

소개글입니다.
```
{: data-label="about.md"}
{% endraw %}

소개 페이지에는 블로그의 소개글을 적어주면 된다.

### 404 페이지

404 페이지는 잘 못된 주소로 접속한 경우 보여 줄 페이지라고 할 수 있다. 404 페이지는 일반 페이지와 조금 다르게 구성할 것이므로 빈 레이아웃을 사용한다.

{% raw %}
```liquid
---
layout: null
permalink: /404.html
---

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		{% if page.title %}
			{{ page.title | escape }} - {{ site.title | escape }}
		{% else %}
			{{ site.title | escape }}
		{% endif %}
	</title>
	<!-- favicon -->
	<link rel="shortcut icon" href="{{ '/favicon.ico' | relative_url }}" type="image/x-icon">
	<!-- Google Font -->
	<link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet" type="text/css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
	<!-- Core theme CSS (includes Bootstrap) -->
	<link rel="stylesheet" href="{{ '/assets/css/styles.css' | relative_url }}">
	<!-- CSS -->
	<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
<body>
	{% include navbar.html %}

	<main class="container-fluid p-0">
		<h1 id="main" class="visually-hidden">본문 영역</h1>
		<section class="resume-section">
			<div class="resume-section-content">
				<h2 class="h1 text-primary fw-bolder">Error 404 Not Found.</h2>
				<p><strong>페이지를 찾을 수 없습니다 :(</strong></p>
				<p>요청하신 페이지를 찾을 수 없습니다.</p>
				<button type="button" class="btn btn-outline-primary" onclick="history.go(-1);">이전 페이지로 이동</button>
				<a href="{{ '/' | relative_url }}" class="btn btn-outline-primary">홈으로 이동</a>
			</div>
		</section>
	</main>

	<footer class="resume-footer px-lg-5 px-3 py-2">
		<a href="{{ '/' | relative_url }}" class="navbar-brand">
			<h1 class="h2">{{ site.title }}</h1>
		</a>
		<div class="social-icons my-2">
			<a href="{{ 'feed.xml' | relative_url }}" class="social-icon" target="_blank" aria-label="RSS">
				<i class="fas fa-rss text-info" aria-hidden="true"></i>
			</a>
			<a href="mailto:{{ site.email }}" class="social-icon" aria-label="E-mail">
				<i class="fas fa-envelope text-warning" aria-hidden="true"></i>
			</a>
			<a href="https://github.com/{{ site.github_username }}" target="_blank" class="social-icon" target="_blank" aria-label="Github">
				<i class="fab fa-github" aria-hidden="true"></i>
			</a>
		</div>
		<address>Copyright &copy; 2017 <strong>{{ site.title }}</strong> All Rights Reserved.</address>
	</footer>

	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<!-- Bootstrap core JS -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
	<!-- Core theme JS -->
	<!-- <script src="{{ '/assets/js/resume.min.js' | relative_url }}"></script> -->
	<!-- JS -->
	<script src="{{ '/assets/js/main.js' | relative_url }}"></script>	
</body>
</html>
```
{: data-label="404.html"}
{% endraw %}

404 페이지의 코드를 보면 `_layouts/default.html` 파일의 일부 코드와 동일한 코드를 사용하는 것을 알 수 있다. 이렇게 동일한 코드가 여러 파일에서 사용될 경우 동일한 코드를 `_includes` 폴더에 파일로 분리한 뒤 파일을 불러와 사용하는 것이 좋다. 만약 `default.html` 파일에서 `head` 태그에 CSS 파일을 추가할 경우 `404.html` 파일에서도 `head` 태그의 코드를 수정해야 하는 불편이 있기 때문이다.
