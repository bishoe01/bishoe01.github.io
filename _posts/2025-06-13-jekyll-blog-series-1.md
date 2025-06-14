---
layout: post
title: "Jekyll 블로그 제작기 #1 - 시작하기"
date: 2025-06-13 16:00:00 +0900
categories: [jekyll-blog]
tags: [jekyll, github-pages, 웹개발]
excerpt: "Jekyll과 GitHub Pages를 이용해 개인 블로그를 만드는 과정을 시리즈로 공유합니다."
---

# Jekyll 블로그 제작기 시리즈를 시작하며

안녕하세요! 오늘부터 Jekyll과 GitHub Pages를 이용해 이 블로그를 만드는 과정을 시리즈로 공유하려고 합니다. 🎯

## 왜 Jekyll을 선택했을까?

여러 블로그 플랫폼을 고민하다가 Jekyll을 선택한 이유들:

### 1. **완전한 커스터마이징**
- HTML, CSS, JavaScript를 자유롭게 수정 가능
- 원하는 디자인과 기능을 마음대로 구현

### 2. **GitHub Pages 무료 호스팅**
- 별도의 서버 비용 없음
- Git을 통한 버전 관리와 배포 자동화

### 3. **마크다운 지원**
- 개발자에게 친숙한 마크다운 문법
- 코드 하이라이팅 기본 지원

### 4. **빠른 로딩 속도**
- 정적 사이트 생성으로 빠른 페이지 로딩
- CDN과 연동 시 더욱 빠른 성능

## 초기 설정 과정

### 1. Ruby 환경 설정

```bash
# macOS에서 Homebrew 사용
brew install ruby
gem install bundler jekyll
```

### 2. Jekyll 사이트 생성

```bash
jekyll new bishoe01.github.io
cd bishoe01.github.io
bundle exec jekyll serve
```

### 3. GitHub Repository 연결

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/bishoe01/bishoe01.github.io.git
git push -u origin main
```

## 다음 편 예고

다음 포스트에서는:
- 커스텀 테마 적용하기
- 레이아웃 구조 이해하기
- CSS 스타일링 시작하기

에 대해 다뤄보겠습니다!

---

**Jekyll 블로그 제작기 시리즈**
1. **시작하기** ← 현재 글
2. 테마 커스터마이징 (다음 편)
3. 반응형 디자인 적용
4. SEO 최적화
5. 고급 기능 추가

궁금한 점이나 건의사항이 있으시면 언제든 [연락](/contact/)해주세요! 🚀
