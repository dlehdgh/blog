---
layout: example
title: 폼(form) - 버튼과 이미지 버튼
category: testing
---

{%- assign img_apple = "/assets/image/apple.png" | relative_url -%}

### Input Button

```html
<input type="button">
<input type="button" value="전송">
```
<p><input type="button"></p>
<p><input type="button" value="전송"></p>

### Button Tag

```html
<button type="button"></button>
<button type="button">전송</button>
```
<p><button type="button"></button></p>
<p><button type="button">전송</button></p>

### Input Image Button

```html
<input type="image" src="{{ img_apple }}">
<input type="image" src="{{ img_apple }}" alt="전송">
```
<p><input type="image" src="{{ img_apple }}"></p>
<p><input type="image" src="{{ img_apple }}" alt="전송"></p>

### Image Button

```html
<button type="button">
	<img src="{{ img_apple }}">
</button>
<button type="button">
	<img src="test.png" alt="전송">
</button>
```
<p><button type="button">
	<img src="{{ img_apple }}">
</button></p>
<p><button type="button">
	<img src="{{ img_apple }}" alt="전송">
</button></p>

### Icon Button

```html
<button type="button">
	<i class="fas fa-star"></i>
</button>
```
<p><button type="button">
	<i class="fas fa-star"></i>
</button></p>