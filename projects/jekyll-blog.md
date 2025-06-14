---
layout: page
title: "Jekyll 블로그 프로젝트"
description: "Jekyll과 GitHub Pages로 만든 개인 개발 블로그 제작기"
permalink: /projects/AcademyDaily/
---

<div class="project-detail-header">
  <div class="project-info-card">
    <div class="project-icon-large">
      <i class="fas fa-blog"></i>
    </div>
    <div class="project-details">
      <h1>📱 개인 블로그</h1>
      <p class="project-subtitle">Jekyll과 GitHub Pages로 만든 개발 블로그</p>
      <div class="project-meta">
        <div class="meta-item">
          <strong>기간:</strong> 2025.06 ~ 현재
        </div>
        <div class="meta-item">
          <strong>상태:</strong> <span class="status completed">완료</span>
        </div>
        <div class="meta-item">
          <strong>역할:</strong> 풀스택 개발자
        </div>
      </div>
    </div>
  </div>

  <div class="project-links">
    <a href="https://github.com/bishoe01/bishoe01.github.io" class="btn btn-primary" target="_blank">
      <i class="fab fa-github"></i> GitHub 저장소
    </a>
    <a href="/" class="btn btn-secondary">
      <i class="fas fa-external-link-alt"></i> 라이브 사이트
    </a>
  </div>
</div>

<div class="project-tech-stack">
  <h3>🛠 기술 스택</h3>
  <div class="tech-grid">
    <div class="tech-item">
      <i class="fab fa-html5"></i>
      <span>HTML5</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-css3-alt"></i>
      <span>CSS3</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-js-square"></i>
      <span>JavaScript</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-gem"></i>
      <span>Jekyll</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-github"></i>
      <span>GitHub Pages</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-markdown"></i>
      <span>Markdown</span>
    </div>
  </div>
</div>

<div class="project-description">
  <h3>📖 프로젝트 소개</h3>
  <p>개발 과정에서 배운 것들과 경험을 체계적으로 정리하고 공유하기 위해 만든 개인 기술 블로그입니다. Jekyll의 정적 사이트 생성 기능과 GitHub Pages의 무료 호스팅을 활용하여 비용 효율적이면서도 성능이 뛰어난 블로그를 구축했습니다.</p>
  
  <h4>주요 특징</h4>
  <ul>
    <li>반응형 디자인으로 모든 디바이스에서 최적화된 사용자 경험</li>
    <li>다크/라이트 테마 토글 기능</li>
    <li>카테고리별 포스트 필터링 및 태그 시스템</li>
    <li>SEO 최적화 및 소셜 미디어 공유 기능</li>
    <li>코드 하이라이팅 및 수학 공식 렌더링 지원</li>
  </ul>
</div>

<div class="project-posts-section">
  <h3>📚 관련 포스트 시리즈</h3>
  
  {% assign jekyll_posts = site.posts | where_exp: 'post', 'post.categories contains "AcademyDaily"' %}
  
  {% if jekyll_posts.size > 0 %}
    <div class="posts-timeline">
      {% for post in jekyll_posts %}
      <article class="timeline-post">
        <div class="timeline-date">
          <time>{{ post.date | date: "%Y.%m.%d" }}</time>
        </div>
        <div class="timeline-content">
          <h4><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h4>
          {% if post.excerpt %}
          <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
          {% endif %}
          {% if post.tags.size > 0 %}
          <div class="post-tags">
            {% for tag in post.tags limit: 4 %}
            <span class="tag">#{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  {% else %}
    <div class="no-posts">
      <i class="fas fa-pencil-alt"></i>
      <h4>포스트 준비 중</h4>
      <p>이 프로젝트에 대한 상세한 개발 과정을 곧 공유할 예정입니다!</p>
    </div>
  {% endif %}
</div>

<div class="project-navigation">
  <a href="/projects/" class="nav-btn">
    <i class="fas fa-arrow-left"></i> 프로젝트 목록으로
  </a>
  <a href="/projects/web-app/" class="nav-btn">
    다음 프로젝트 <i class="fas fa-arrow-right"></i>
  </a>
</div>
