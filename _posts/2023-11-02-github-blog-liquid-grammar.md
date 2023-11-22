---
layout: post
title: "Github 블로그 - 2. Jekyll Liquid 문법"
categories: [blog]
tags: [Github, Blog, Jekyll, Liquid]
toc: true
toc_sticky: true
date: 2023-11-02 15:36
---

Liquid는 Object, Tag, Filter 이렇게 3개의 카테고리로 분류 할 수 있다.

### Object

Liquid는 Object로 컨텐츠에 접근할 수 있다.

<!-- <p class"codeblock-label">example</p> -->

{% raw %}
```liquid
{{ page.title }}
Github 블로그 - 2. Jekyll liquid 문법
```
{% endraw %}
{: data-label="example"}

### Tag

#### Escape

코드를 그대로 보여주고 싶을 때는 다음과 같이 입력한다.

{% raw %}
```liquid
{% raw %}
{{ page.title }}
{% endraw %}
```
{% endraw %}

#### 변수

변수를 선언하고 싶을 때는 `assign 변수명 = 값`을 입력하면 된다.

{% raw %}
```liquid
{% assign name = "홍길동" %}
{{ name }}님
```
{: data-label="Input"}
{% endraw %}

```liquid
{% assign name = "홍길동" %}
{{ name }}님
```
{: data-label="Output"}

#### 주석

코드를 `{% comment %}`와 `{% endcomment %}`로 감싸주면 주석으로 처리가 된다.

{% raw %}
```liquid
{% comment %}
주석 내용
{% endcomment %}
```
{% endraw %}

#### 조건문(if/elsif/else, case/when)

**if/elsif/else**

`if`는 조건이 참이면 실행되고 조건이 거짓이면 실행되지 않는다. 조건이 두 가지 이상일 때 `if`와 `elsif`를 사용해 조건에 따라 다른 결과를 보여줄 수 있다.

`else`는 `if`와 `elsif`가 모두 거짓일 때 실행된다.

{% raw %}
```liquid
{% if page.title == "test" %}
	Test 페이지입니다.
{% elsif page.title == "about" %}
	About 페이지입니다.
{% else %}
	기본 페이지입니다.
{% endif %}
```
{% endraw %}

**case/when**

`case`로 어떤 변수의 값을 비교할 것인지 지정하고 `when`으로 값을 지정해 참이면 실행된다.

`else`는 if문과 마찬가지로 어떤 조건도 참이 아닐 때 실행된다.

{% raw %}
```liquid
{% case page.title %}
	{% when "test" %}
		Test 페이지입니다.
	{% when "about" %}
		About 페이지입니다.
	{% else %}
		기본 페이지입니다.
{% endcase %}
```
{% endraw %}

#### 반복문(for)

for 반복문은 `for 변수 in 범위`와 같이 사용하면 되는데 여기서 변수는 범위의 각 항목의 값을 갖게 된다.

{% raw %}
```liquid
{% for i in (1..5) %}
	{{ i }}
{% endfor %}

{% for i in (1..5) limit: 3 %}
	{{ i }}
{% endfor %}
```
{: data-label="Input"}
{% endraw %}

```
{% for i in (1..5) -%}
	{{ i }}
{%- endfor %}
{% for i in (1..5) limit: 3 -%}
	{{ i }}
{%- endfor %}
```
{: data-label="Output"}

위 for 반복문에서 `limit`는 반복 횟수를 제한한다.

for 반복문에서 현제 `index`를 알고 싶다면 `forloop.index`를 사용하면 된다. 또 for 반복문의 마지막인지 확인하고 싶을 때는 `forloop.last`를 사용하면 된다.

### Filter

Liquid 에서는 데이터를 가공하기 위한 여러가지 Filter를 제공한다.

|필터|설명|
|---|----|
|relative_url|입력값 앞에 `baseurl` 값을 추가한다. 사이트가 최상위 경로가 아닌 하위 경로에서 호스팅 될 경우 유용하다.
|absolute_url|입력값 앞에 url 과 baseurl 값을 추가한다.|
|date_to_xmlschema|날짜를 XML 스키마(ISO 8601) 형식으로 변환한다.|
|date_to_string|날짜를 짧은 형식으로 변환한다.|
|where|배열 안에서 특정 키와 값을 가진 객체들을 선택한다.|
|where_exp|배열 안에서 표현식이 참인 객체들을 선택한다.<br>`{{ site.pages | where_exp: "item", "item.category == 'test'" }}`|
|escape|문자열을 이스케이프 한다. 일부 특수문자를 엔티티 코드로 변환한다.|
|markdownify|마크다운 형식 문자열을 HTML 로 변환한다.|
|sort|배열을 정렬한다. 해시를 위한 추가 전달인자 1. 프로퍼티 이름 2. nils 순서(first, last).|
|inspect|디버깅을 위해 객체를 문자열로 표시한다.|

내가 자주 사용했던 Filter에 대해 설명했다.

지금까지 liquid 문법에 대해 알아 보았다. liquid 문법에 대한 자세한 내용은 다음 링크를 참고한다.

* [https://jekyllrb.com/docs/liquid/](https://jekyllrb.com/docs/liquid/){:target="_blank"}
* [https://jekyllrb-ko.github.io/docs/liquid/](https://jekyllrb-ko.github.io/docs/liquid/){:target="_blank"}
* [https://shopify.github.io/liquid/](https://shopify.github.io/liquid/){:target="_blank"}
* [https://selosele.github.io/liquid/](https://shopify.github.io/liquid/){:target="_blank"}

### 공백 제어

Liquid를 사용하다 보면 태그의 앞뒤에 공백이 생기게 되는데 `-`를 붙이면 공백이 제거된다. 예를 들어 `{%-`와 `{{-`는 앞쪽 공백을 제거하고, `-%}`와 `-}}`는 뒤쪽 공백을 제거한다.

{% raw %}
```liquid
<a href="{{ '/' | relative_url }}" class="nav-link{% if page.url == '/' %} active{% endif %}">홈</a>
<a href="{{ '/' | relative_url }}" class="nav-link{%- if page.url == '/' -%} active{%- endif -%}">홈</a>
```
{: data-label="Input"}
{% endraw %}

```html
<a href="{{ '/' | relative_url }}" class="nav-link{% if page.url == '/' %} active{% endif %}">홈</a>
<a href="{{ '/' | relative_url }}" class="nav-link{%- if page.url == '/' -%} active{%- endif -%}">홈</a>
```
{: data-label="Output"}
