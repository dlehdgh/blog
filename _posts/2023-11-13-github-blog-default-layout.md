---
layout: post
title: "Github 블로그 - 7. 기본 레이아웃 구성"
categories: [blog]
tags: [Github, Blog, Jekyll, Layout]
toc: true
toc_sticky: true
date: 2023-11-13 21:35
---

### 레이아웃이란?

레이아웃은 `_layouts` 폴더에 레이아웃으로 사용할 HTML 파일을 만들면 된다. 레이아웃의 {% raw %}`{{ content }}`{% endraw %}를 입력한 곳에 레이아웃을 사용하는 파일의 내용이 들어가게 된다. 모든 페이지에 동일한 레이아웃을 적용할 수 있다.

### 기본 레이아웃 구성

나는 **Start Bootstrap - Resume** 테마를 적용하기 위해 필요한 CSS 파일을 추가하고, Navigation과 About의 코드를 가져와 사용했다.

{% raw %}
```liquid
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
				{% include header.html %}
				{{ content }}
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
{: data-label="_layouts/default.html"}
{% endraw %}

footer 영역의 `.social-icons`에는 자신의 상황에 맞는 SNS 링크를 추가하면 된다. 그리고 `site.email`과 `site.github_username`은 `_config.yml` 파일에 값을 입력해 두어야 정상적으로 동작한다.

RSS의 `feed.xml` 파일은 기본 플러그인으로 제공되는 `jekyll-feed` 플러그인으로 자동 생성되는 파일이다. Jekyll을 로컬 환경 또는 클라우드 통합 개발 환경(IDE)를 통해 개발하는 경우 `_site` 폴더에 `feed.xml` 파일이 있는 것을 확인할 수 있다.

### 네비게이션 만들기

{% raw %}
```liquid
{% assign names = site.data.navigation.names %}
<!-- Skip Navigation -->
<div class="navbar fixed-top visually-hidden-focusable z-max">
	<div class="container-fluid">
		<a href="#main" class="visually-hidden-focusable btn btn-skip">{{ site.data.navigation.skipnav.main }}</a>
		<a href="#sideNav" class="visually-hidden-focusable btn btn-skip">{{ site.data.navigation.skipnav.menu }}</a>
	</div>
</div>

<!-- Navigation-->
<nav id="sideNav" class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="Navigation">
	<!-- Logo -->
	<a href="{{ '/' | relative_url }}" class="navbar-brand d-block mb-lg-4 js-scroll-trigger">
		<span class="d-none d-lg-block">
			<img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="{{ '/assets/image/profile.png' | relative_url }}" alt="Logo">
		</span>
		<span class="h2">{{ site.title | escape }}</span>
	</a>
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Menu">
		<span class="navbar-toggler-icon"></span>
	</button>
	<!-- Menu -->
	<div class="collapse navbar-collapse" id="navbarResponsive">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a href="{{ '/' | relative_url }}" class="nav-link js-scroll-trigger{% if page.url == '/' %} active" aria-current="page{% endif %}">{{ names.home }}</a>
			</li>
			{% for navbar in site.data.navigation.navbar %}
				<li class="nav-item">
					<a href="{{ navbar.url | relative_url }}" class="nav-link js-scroll-trigger{% if page.url == navbar.url %} active" aria-current="page{% endif %}">
						{{ names[navbar.name] }}
					</a>
				</li>
			{% endfor %}
			<li class="nav-item">
				<a href="#" class="nav-link js-scroll-trigger" data-bs-toggle="modal" data-bs-target="#search-modal">
					<i class="fa fa-search" aria-hidden="true"></i>
					<span>{{ names.search }}</span>
				</a>
			</li>
		</ul>
	</div>
</nav>
```
{: data-label="_includes/navbar.html"}
{% endraw %}

마지막의 검색 링크는 나중에 검색 기능을 구현하는 과정에서 자세히 다루겠다.

### 헤더 만들기

{% raw %}
```liquid
<header class="page-header">
	{% if page.layout == 'home' %}
		<h2>{{ site.title }}</h2>
		{% if site.description %}
			<div class="subheading mb-3">{{ site.description }}</div>
		{% endif %}
	{% else %}
		{% include breadcrumbs.html %}
		{% assign page_name = page.url | remove_first: "/" | split: "/" | first %}
		<h2>{{ page.title | default: site.data.navigation.names[page_name] }}</h2>
		{% if page.description %}
			<div class="subheading mb-3">{{ page.description }}</div>
		{% endif %}
		{% if page.date %}
			<p>
				<i class="fa fa-user text-primary" aria-hidden="true"></i>
				<span aria-description="{{ site.data.navigation.page.author }}">{{ page.author | default: site.author }}</span>
			</p>
			<p>
				<i class="fa-solid fa-calendar-days text-success" aria-hidden="true"></i>
				<time datetime="{{ page.date | date_to_xmlschema }}" aria-description="{{ site.data.navigation.page.updated }}">{{ page.date | date: site.date_format }}</time>
			</p>
		{% endif %}
	{% endif %}
</header>
```
{: data-label="_includes/navbar.html"}
{% endraw %}

`page.date | date: site.date_format`는 페이지의 날짜를 지정한 형식으로 바꾸는 구문이다. `_config.yml` 파일에 다음과 같이 입력해 사용하면 된다.

```yaml
date_format: "%Y.%m.%d" # 년.월.일(ex: 2023.11.01)
date_time_format: "%Y.%m.%d %I:%M"  # 년.월.일 시:분(ex: 2023.11.01 11:01)
```
{: data-label="_config.yml"}

날짜 형식에 대한 자세한 내용은 [여기](https://strftime.net/){:target="_blank"}를 참고하세요.

### 페이지 레이아웃 구성

{% raw %}
```liquid
---
layout: default
---

<article class="page-content">
	{{ content }}
</article>
```
{: data-label="_layouts/page.html"}
{% endraw %}

페이지는 간단하다. 페이지 제목은 `default.html`에서 출력해주므로 본문 콘텐츠만 출력해주면 된다.

### 레이아웃 파일 구조

내가 만들 레이아웃 파일의 목록은 다음과 같다.

```hash
┌─ _layouts
│  ├─ category.html
│  ├─ default.html
│  ├─ home.html
│  ├─ page.html
│  └─ post.html
```

> `home.html`, `post.html`, `category.html`은 포스트와 카테고리를 만드는 과정에서 만들 것이다.
