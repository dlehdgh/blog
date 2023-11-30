---
layout: post
title: "Github 블로그 - 6. 데이터 파일 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll, Data]
toc: true
toc_sticky: true
date: 2023-11-11 19:04
---

### 데이터 파일이란?

Jekyll에서 제공하는 **기본변수**뿐만 아니라 자신만의 데이터라고 할 수 있다

먼저 `_data` 폴더를 만들고 `.yml`파일을 만들면 된다.

### 데이터 파일 사용방법

기본적인 데이터 파일의 형식은 다음과 같다.

```yaml
navbar:
  - title: 소개
    url: /about/
  - title: 포스트
    url: /posts/
  - title: 연도 아카이브
    url: /year-archive/
  - title: 카테고리
    url: /categories/
  - title: 태그
    url: /tags/
```

데이터 파일에 자신이 원하는 항목을 추가해 사용하면 된다.

데이터 파일에 입력한 데이터를 출력하려면 `site.data.[YAML 파일명].[변수명]`으로 입력해 사용하면 된다.

{% raw %}
```liquid
<ul>
	{% for navbar in site.data.navigation.navbar %}
	<li>
		<a href="{{ navbar.url | relative_url }}">{{ navbar.title }}</a>
	</li>
	{% endfor %}
</ul>
```
{% endraw %}




### 네비게이션 데이터 만들기

```yaml
navbar:
  - name: about
    url: /about/
  - name: posts
    url: /posts/
  - name: year-archive
    url: /year-archive/
  - name: categories
    url: /categories/
  - name: tags
    url: /tags/
  - name: testing
    url: /testing/

names:
  home: 홈
  about: 소개
  posts: 포스트
  year-archive: 연도 아카이브
  categories: 카테고리
  tags: 태그
  testing: 접근성 테스트
  search: 검색

skipnav:
  main: 본문 바로가기
  menu: 주메뉴 바로가기

page:
  toc_title: 목차
  author: 작성자
  updated: 작성일
  share: 공유
  prev_post: 이전 글 
  next_post: 다음 글
  year: 연도 # 연도 아카이브의 바로가기 링크에 사용
  total_posts: 총 게시물
  more: 더보기
  related_posts: 관련글
```
{: data-label="navigation.yml"}

YAML 데이터 파일을 보면 Key 앞에 `-`를 붙인 곳과 안 붙인 곳이 있는 것을 알 수 있다. `-`를 붙이면 배열 안에 객체로 인식되어 `navbar[0].url`과 같이 사용해야 하고 `-`를 붙이지 않으면 객체로 인식되어 `names.home`와 같이 사용하면 된다.

내가 위와 같이 데이터를 구현한 것은 여러 페이지에서 사용되는 텍스트를 데이터 파일로 제어하려는 것이다. 예를 들어 메뉴에도 **태그**가 있고 태그 페이지의 페이지 제목으로 **태그**가 사용된다. 만약 이 메뉴를 영어로 **Tags**로 수정하려면 메뉴와 태그 페이지 두 곳에서 모두 변경해 주어야 한다. 하지만 데이터 파일의 `names` 객체를 이용해 출력하면 데이터 파일만 수정해도 모든 페이지에 적용이 가능하다.

* `navbar` : 메뉴를 구성할 데이터.
* `skipnav` : 반복영역 건너뛰기 링크를 구성할 데이터.
* `page` : 페이지와 포스트에서 사용되는 텍스트 데이터.
