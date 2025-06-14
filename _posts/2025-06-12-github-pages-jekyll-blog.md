---
title: "GitHub Pages로 Jekyll 블로그 만들기"
date: 2025-06-12
categories: [개발]
tags: [github-pages]
description: "Jekyll과 GitHub Pages를 사용해서 개발자 블로그를 만드는 완벽한 가이드"
---

# GitHub Pages + Jekyll로 개발자 블로그 만들기 🏗️

개발자라면 한 번쯤은 자신만의 기술 블로그를 만들고 싶어할 텐데요. 오늘은 **Jekyll**과 **GitHub Pages**를 사용해서 무료로 멋진 블로그를 만드는 방법을 알아보겠습니다!

## 🤔 왜 Jekyll + GitHub Pages인가?

다른 블로그 플랫폼들도 많은데 왜 아카데미 일상 선택했을까요?

### 장점들
- **💰 완전 무료**: GitHub Pages 호스팅 무료
- **⚡ 빠른 속도**: 정적 사이트라 로딩이 매우 빠름
- **🔧 높은 커스터마이징**: HTML, CSS, JS 완전 제어 가능
- **📱 반응형**: 모바일 친화적인 디자인 가능
- **🔍 SEO 친화적**: 검색 엔진 최적화에 유리
- **📝 마크다운 지원**: 글 작성이 편리함
- **🌐 커스텀 도메인**: 자신만의 도메인 연결 가능

### 단점들
- **📈 학습 곡선**: 초기 설정과 학습이 필요
- **💻 기술적 지식**: HTML, CSS 기본 지식 필요
- **🔧 관리**: 직접 관리해야 함

## 🚀 시작하기 전 준비사항

1. **GitHub 계정** 생성
2. **Git** 설치
3. **Ruby** 설치 (로컬 개발용)
4. **텍스트 에디터** (VS Code 추천)

## 📋 단계별 구축 가이드

### 1단계: GitHub 저장소 생성

GitHub에서 새 저장소를 만듭니다:

```bash
# 저장소 이름 규칙
username.github.io
# 예: bishoe01.github.io
```

⚠️ **중요**: 저장소 이름은 반드시 `username.github.io` 형식이어야 합니다!

### 2단계: 로컬에 저장소 클론

```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

### 3단계: Jekyll 설치 및 초기화

```bash
# Jekyll 설치
gem install jekyll bundler

# 새 Jekyll 사이트 생성
jekyll new . --force

# 의존성 설치
bundle install
```

### 4단계: 기본 설정 파일 구성

`_config.yml` 파일을 수정합니다:

```yaml
title: "Your Blog Title"
description: "블로그 설명을 입력하세요"
author: "Your Name"
email: "your-email@example.com"
url: "https://username.github.io"

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /:categories/:year/:month/:day/:title/
timezone: Asia/Seoul

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Social links
github_username: username
twitter_username: username
```

### 5단계: 첫 포스트 작성

`_posts` 디렉토리에 마크다운 파일을 생성합니다:

```markdown
---
title: "첫 번째 포스트"
date: 2025-06-12
categories: [블로그]
tags: [jekyll, 시작]
---

# 첫 번째 포스트입니다!

마크다운으로 글을 작성할 수 있어요.

## 코드 블록도 지원해요

```javascript
console.log("Hello, Jekyll!");
```

이미지도 삽입할 수 있습니다:
![설명](이미지_경로)
```

파일명 규칙: `YYYY-MM-DD-제목.md`

### 6단계: 로컬에서 테스트

```bash
# 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

### 7단계: GitHub에 푸시

```bash
git add .
git commit -m "Initial blog setup"
git push origin main
```

몇 분 후 `https://username.github.io`에서 블로그를 확인할 수 있습니다!

## 🎨 블로그 커스터마이징

### 테마 적용하기

Jekyll은 다양한 테마를 지원합니다:

```yaml
# _config.yml에 테마 추가
theme: minima
# 또는
remote_theme: "mmistakes/minimal-mistakes"
```

### 인기 Jekyll 테마들
- **Minimal Mistakes**: 가장 인기 있는 테마
- **Beautiful Jekyll**: 깔끔하고 사용하기 쉬움
- **Chirpy**: 다크 모드 지원
- **TeXt**: 다양한 기능 제공

### 커스텀 CSS 추가

`assets/css/main.css` 파일을 생성하여 스타일을 커스터마이징할 수 있습니다:

```css
/* 커스텀 스타일 */
.post-title {
    color: #2c3e50;
    font-weight: 700;
}

.highlight {
    border-radius: 8px;
    padding: 1rem;
}
```

## 📈 SEO 최적화

### 기본 SEO 설정

```yaml
# _config.yml
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

# Google Analytics
google_analytics: "G-XXXXXXXXXX"
```

### 포스트별 SEO 설정

```yaml
---
title: "포스트 제목"
description: "포스트 설명 (검색 결과에 표시)"
keywords: ["키워드1", "키워드2"]
image: "/assets/images/featured-image.jpg"
---
```

## 🔧 고급 기능 추가

### 댓글 시스템 (Disqus)

```html
<!-- _layouts/post.html에 추가 -->
{% if page.comments %}
<div id="disqus_thread"></div>
<script>
    var disqus_config = function () {
        this.page.url = "{{ site.url }}{{ page.url }}";
        this.page.identifier = "{{ page.id }}";
    };
    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://your-site.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
{% endif %}
```

### 검색 기능 추가

```javascript
// Simple search functionality
function searchPosts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const posts = document.querySelectorAll('.post-item');
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const content = post.querySelector('.post-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
```

## 🎯 마무리

Jekyll + GitHub Pages 조합은 개발자에게 최고의 블로그 플랫폼 중 하나입니다. 초기 설정은 조금 복잡할 수 있지만, 한번 구축하고 나면:

- ✅ 완전한 제어권
- ✅ 빠른 속도
- ✅ 무료 호스팅
- ✅ 버전 관리
- ✅ 마크다운 지원

등의 장점을 누릴 수 있어요!

### 다음 단계

1. **커스텀 도메인** 연결하기
2. **HTTPS** 설정하기
3. **PWA** 기능 추가하기
4. **다국어 지원** 추가하기


![샘플 이미지](/assets/images/sample.jpg)
<img src="/assets/images/sample.jpg" alt="샘플 이미지"  >
~
