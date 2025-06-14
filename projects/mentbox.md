---
layout: page
title: "MentBox - 일상 기록 프로젝트"
description: "아카데미 및 일상 생활의 기록과 성찰을 담는 프로젝트"
permalink: /projects/mentbox/
---

<div class="project-detail-header">
  <div class="project-info-card">
    <div class="project-icon-large">
      <i class="fas fa-blog"></i>
    </div>
    <div class="project-details">
      <h1>📝 MentBox</h1>
      <p class="project-subtitle">아카데미 일상과 성장의 기록을 담는 공간</p>
      <div class="project-meta">
        <div class="meta-item">
          <strong>기간:</strong> 2025.03 ~ 현재
        </div>
        <div class="meta-item">
          <strong>상태:</strong> <span class="status developing">진행 중</span>
        </div>
        <div class="meta-item">
          <strong>역할:</strong> 일상 기록자
        </div>
      </div>
    </div>
  </div>

  <div class="project-links">
    <a href="/projects/mentbox/" class="btn btn-primary">
      <i class="fas fa-book"></i> 기록 보기
    </a>
    <a href="/archive/" class="btn btn-secondary">
      <i class="fas fa-archive"></i> 전체 아카이브
    </a>
  </div>
</div>

<div class="project-tech-stack">
  <h3>🛠 기록 영역</h3>
  <div class="tech-grid">
    <div class="tech-item">
      <i class="fas fa-swimming-pool"></i>
      <span>수영 & 운동</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-code"></i>
      <span>알고리즘 스터디</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-book-reader"></i>
      <span>독서 및 학습</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-apple-alt"></i>
      <span>아카데미 동아리</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-heart"></i>
      <span>일상 성찰</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-users"></i>
      <span>인간관계</span>
    </div>
  </div>
</div>

<div class="project-description">
  <h3>📖 프로젝트 소개</h3>
  <p>Apple Developer Academy 생활과 일상의 소중한 순간들을 기록하고 성찰하는 공간입니다. 아카데미에서의 학습, 프로젝트 경험과 함께 수영, 독서, 인간관계 등 일상생활의 다양한 면면을 소박하게 담아냅니다.</p>
  
  <h4>기록의 의미</h4>
  <ul>
    <li>아카데미 생활의 제대로 된 기록과 성찰</li>
    <li>일상 속 작은 성장과 변화들을 놓치지 않는 세심한 관찰</li>
    <li>개인적인 여정을 진솔하고 솔직하게 기록</li>
    <li>학습, 운동, 독서, 인간관계 등 다양한 영역의 균형있는 성장</li>
    <li>미래의 나에게 남김 의미있는 기록들</li>
  </ul>
</div>

<div class="project-posts-section">
  <h3 style="margin-bottom: 1rem;">📚 관련 포스트 시리즈</h3>
  
  {% assign mentbox_posts = site.posts | where_exp: 'post', 'post.categories contains "Mentbox"' %}
  
  {% if mentbox_posts.size > 0 %}
    <div class="posts-timeline">
      {% for post in mentbox_posts %}
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
