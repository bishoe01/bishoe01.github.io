---
layout: page
title: "웹 앱 프로젝트"
description: "React와 Node.js로 구현하는 풀스택 웹 애플리케이션"
permalink: /projects/web-app/
---

<div class="project-detail-header">
  <div class="project-info-card">
    <div class="project-icon-large">
      <i class="fas fa-laptop-code"></i>
    </div>
    <div class="project-details">
      <h1>💻 웹 앱 프로젝트</h1>
      <p class="project-subtitle">React와 Node.js로 구현하는 풀스택 웹 애플리케이션</p>
      <div class="project-meta">
        <div class="meta-item">
          <strong>기간:</strong> 2025.05 ~ 진행 중
        </div>
        <div class="meta-item">
          <strong>상태:</strong> <span class="status developing">개발 중</span>
        </div>
        <div class="meta-item">
          <strong>역할:</strong> 풀스택 개발자
        </div>
      </div>
    </div>
  </div>

  <div class="project-links">
    <a href="#" class="btn btn-primary" target="_blank">
      <i class="fab fa-github"></i> GitHub 저장소
    </a>
    <a href="#" class="btn btn-secondary disabled">
      <i class="fas fa-external-link-alt"></i> 데모 (준비 중)
    </a>
  </div>
</div>

<div class="project-tech-stack">
  <h3>🛠 기술 스택</h3>
  <div class="tech-grid">
    <div class="tech-item">
      <i class="fab fa-react"></i>
      <span>React</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-node-js"></i>
      <span>Node.js</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-server"></i>
      <span>Express</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-database"></i>
      <span>MongoDB</span>
    </div>
    <div class="tech-item">
      <i class="fab fa-sass"></i>
      <span>SCSS</span>
    </div>
    <div class="tech-item">
      <i class="fas fa-cloud"></i>
      <span>AWS</span>
    </div>
  </div>
</div>

<div class="project-description">
  <h3>📖 프로젝트 소개</h3>
  <p>사용자 친화적인 인터페이스와 효율적인 백엔드 시스템을 갖춘 풀스택 웹 애플리케이션입니다. 현대적인 AppleChallenges 기술을 활용하여 확장 가능하고 유지보수가 용이한 애플리케이션을 구축하는 것이 목표입니다.</p>
  
  <h4>주요 기능</h4>
  <ul>
    <li>사용자 인증 및 권한 관리 시스템</li>
    <li>실시간 데이터 업데이트 (WebSocket)</li>
    <li>반응형 UI/UX 디자인</li>
    <li>RESTful API 설계</li>
    <li>데이터 시각화 대시보드</li>
  </ul>

  <h4>현재 진행 상황</h4>
  <div class="progress-section">
    <div class="progress-item">
      <span class="progress-label">프론트엔드</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 75%"></div>
      </div>
      <span class="progress-percent">75%</span>
    </div>
    <div class="progress-item">
      <span class="progress-label">백엔드</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 60%"></div>
      </div>
      <span class="progress-percent">60%</span>
    </div>
    <div class="progress-item">
      <span class="progress-label">데이터베이스</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 80%"></div>
      </div>
      <span class="progress-percent">80%</span>
    </div>
  </div>
</div>

<div class="project-posts-section">
  <h3>📚 개발 과정 기록</h3>
  
  {% assign webapp_posts = site.posts | where_exp: 'post', 'post.categories contains "web-app"' %}
  
  {% if webapp_posts.size > 0 %}
    <div class="posts-timeline">
      {% for post in webapp_posts %}
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
      <i class="fas fa-code"></i>
      <h4>개발 블로그 준비 중</h4>
      <p>웹 앱 개발 과정에서의 경험과 노하우를 곧 공유할 예정입니다!</p>
    </div>
  {% endif %}
</div>

<div class="project-navigation">
  <a href="/projects/AcademyDaily/" class="nav-btn">
    <i class="fas fa-arrow-left"></i> 이전 프로젝트
  </a>
  <a href="/projects/ai-project/" class="nav-btn">
    다음 프로젝트 <i class="fas fa-arrow-right"></i>
  </a>
</div>
