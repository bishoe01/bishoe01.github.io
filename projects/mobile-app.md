---
layout: page
title: "모바일 앱 프로젝트"
description: "React Native로 개발하는 크로스플랫폼 모바일 앱"
permalink: /projects/mobile-app/
---

<div class="project-detail-header">
  <div class="project-info-card">
    <div class="project-icon-large">
      <i class="fas fa-mobile-alt"></i>
    </div>
    <div class="project-details">
      <h1>📱 모바일 앱</h1>
      <p class="project-subtitle">React Native로 개발하는 크로스플랫폼 모바일 앱</p>
      <div class="project-meta">
        <div class="meta-item">
          <strong>기간:</strong> 2025.08 ~ 아이디어 단계
        </div>
        <div class="meta-item">
          <strong>상태:</strong> <span class="status planning">아이디어 단계</span>
        </div>
        <div class="meta-item">
          <strong>역할:</strong> 모바일 개발자
        </div>
      </div>
    </div>
  </div>

  <div class="project-links">
    <a href="#" class="btn btn-primary disabled">
      <i class="fab fa-github"></i> GitHub (기획 중)
    </a>
    <a href="#" class="btn btn-secondary disabled">
      <i class="fas fa-download"></i> 앱 다운로드 (개발 예정)
    </a>
  </div>
</div>

<div class="project-tech-stack">
  <h3>🛠 기술 스택</h3>
  <div class="tech-grid">
    <div class="tech-item">
      <i class="fab fa-react"></i>
      <span>React Native</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-mobile"></i>
      <span>Expo</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-fire"></i>
      <span>Firebase</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-js-square"></i>
      <span>TypeScript</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-palette"></i>
      <span>Styled Components</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-bell"></i>
      <span>Push Notifications</span>
    </div>
  </div>
</div>

<div class="project-description">
  <h3>📖 프로젝트 소개</h3>
  <p>일상의 편리함을 더하는 모바일 애플리케이션을 개발하는 프로젝트입니다. React Native를 활용하여 iOS와 Android 모두에서 네이티브 수준의 성능과 사용자 경험을 제공하는 앱을 만드는 것이 목표입니다.</p>
  
  <h4>예상 기능</h4>
  <ul>
    <li>직관적이고 아름다운 사용자 인터페이스</li>
    <li>오프라인 모드 지원</li>
    <li>실시간 알림 시스템</li>
    <li>소셜 로그인 연동</li>
    <li>데이터 동기화 및 백업</li>
    <li>다국어 지원</li>
  </ul>

  <h4>아이디어 브레인스토밍</h4>
  <div class="idea-grid">
    <div class="idea-card">
      <h5>📚 학습 도우미 앱</h5>
      <p>개발자를 위한 학습 진도 관리 및 기술 스택 트래킹</p>
    </div>
    <div class="idea-card">
      <h5>💰 가계부 앱</h5>
      <p>간편한 가계부 기록과 지출 패턴 분석</p>
    </div>
    <div class="idea-card">
      <h5>🏃‍♂️ 운동 기록 앱</h5>
      <p>개인 운동 루틴 관리 및 성과 추적</p>
    </div>
    <div class="idea-card">
      <h5>🎯 할 일 관리 앱</h5>
      <p>프로젝트 기반 태스크 관리 및 협업 도구</p>
    </div>
  </div>
</div>

<div class="project-posts-section">
  <h3>📚 모바일 개발 여정</h3>
  
  {% assign mobile_posts = site.posts | where_exp: 'post', 'post.categories contains "mobile-app"' %}
  
  {% if mobile_posts.size > 0 %}
    <div class="posts-timeline">
      {% for post in mobile_posts %}
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
      <i class="fas fa-mobile-alt"></i>
      <h4>모바일 개발 시작 예정</h4>
      <p>React Native 학습과 앱 개발 과정을 곧 공유할 예정입니다!</p>
    </div>
  {% endif %}
</div>

<div class="project-navigation">
  <a href="/projects/ai-project/" class="nav-btn">
    <i class="fas fa-arrow-left"></i> 이전 프로젝트
  </a>
  <a href="/projects/" class="nav-btn">
    프로젝트 목록으로 <i class="fas fa-th"></i>
  </a>
</div>
