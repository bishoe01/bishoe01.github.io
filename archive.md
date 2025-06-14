---
layout: page
title: "아카이브 📚"
description: "기술 블로그의 모든 콘텐츠를 주제별로 체계화해서 볼 수 있습니다"
permalink: /archive/
---

<div class="archive-page">
  <!-- Archive Category Tabs -->
  <div class="archive-tabs-container">
    <div class="archive-tabs">
      <button class="archive-tab-button active" data-category="all" data-label="전체">
        <i class="fas fa-th-large"></i>
        <span class="tab-text">전체</span>
      </button>
      <button class="archive-tab-button" data-category="apple-academy" data-label="애플">
        <i class="fas fa-apple-alt"></i>
        <span class="tab-text">Apple Academy</span>
      </button>
      <button class="archive-tab-button" data-category="development" data-label="개발">
        <i class="fas fa-code"></i>
        <span class="tab-text">개발 & 기술</span>
      </button>
      <button class="archive-tab-button" data-category="jekyll-blog" data-label="Jekyll">
        <i class="fas fa-blog"></i>
        <span class="tab-text">Jekyll Blog</span>
      </button>
    </div>
  </div>

  <!-- Archive Content Areas -->
  <div class="archive-content">
    <!-- Professional Categories Only -->
    {% assign professional_categories = "애플아카데미,개발,jekyll-blog" | split: "," %}
    {% assign professional_posts = site.posts | where_exp: 'post', 'professional_categories contains post.categories[0]' %}
    {% assign apple_posts = professional_posts | where_exp: 'post', 'post.categories contains "애플아카데미"' %}
    {% assign dev_posts = professional_posts | where_exp: 'post', 'post.categories contains "개발"' %}
    {% assign jekyll_posts = professional_posts | where_exp: 'post', 'post.categories contains "jekyll-blog"' %}

    <!-- All Posts View -->
    <div class="archive-tab-content active" data-category="all">
      <div class="series-grid">
        <!-- Apple Academy Series -->
        {% if apple_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
            <div class="series-icon">🍎</div>
            <div class="series-info">
              <h2 class="series-title">Apple Academy</h2>
              <p class="series-description">애플 디벨로퍼 아카데미에서의 학습과 프로젝트 경험</p>
              <div class="series-stats">
                <span class="post-count">{{ apple_posts.size }}개 포스트</span>
                <span class="date-range">{{ apple_posts.last.date | date: "%Y.%m" }} - {{ apple_posts.first.date | date: "%Y.%m" }}</span>
              </div>
            </div>
          </div>
          
          <div class="recent-posts">
            {% for post in apple_posts limit: 3 %}
            <div class="post-preview">
              <div class="post-meta">
                <time class="post-date">{{ post.date | date: "%m.%d" }}</time>
                {% if post.tags.size > 0 %}
                <span class="primary-tag"># {{ post.tags.first }}</span>
                {% endif %}
              </div>
              <h4 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title | truncatewords: 8 }}</a>
              </h4>
            </div>
            {% endfor %}
          </div>
          
          <div class="series-footer">
            <a href="/archive/apple-academy/" class="view-all-btn">
              전체 보기 ({{ apple_posts.size }}개) →
            </a>
          </div>
        </div>
        {% endif %}
        
        <!-- Development Series -->
        {% if dev_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
            <div class="series-icon">💻</div>
            <div class="series-info">
              <h2 class="series-title">개발 & 기술</h2>
              <p class="series-description">프로그래밍 언어, 프레임워크, 개발 도구 학습 기록</p>
              <div class="series-stats">
                <span class="post-count">{{ dev_posts.size }}개 포스트</span>
                {% if dev_posts.size > 0 %}
                <span class="date-range">{{ dev_posts.last.date | date: "%Y.%m" }} - {{ dev_posts.first.date | date: "%Y.%m" }}</span>
                {% endif %}
              </div>
            </div>
          </div>
          
          <div class="recent-posts">
            {% for post in dev_posts limit: 3 %}
            <div class="post-preview">
              <div class="post-meta">
                <time class="post-date">{{ post.date | date: "%m.%d" }}</time>
                {% if post.tags.size > 0 %}
                <span class="primary-tag"># {{ post.tags.first }}</span>
                {% endif %}
              </div>
              <h4 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title | truncatewords: 8 }}</a>
              </h4>
            </div>
            {% endfor %}
          </div>
          
          <div class="series-footer">
            <a href="/archive/development/" class="view-all-btn">
              전체 보기 ({{ dev_posts.size }}개) →
            </a>
          </div>
        </div>
        {% endif %}
        
        <!-- Jekyll Blog Series -->
        {% if jekyll_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
            <div class="series-icon">🌐</div>
            <div class="series-info">
              <h2 class="series-title">Jekyll Blog</h2>
              <p class="series-description">Jekyll을 활용한 블로그 구축과 커스터마이징 과정</p>
              <div class="series-stats">
                <span class="post-count">{{ jekyll_posts.size }}개 포스트</span>
                {% if jekyll_posts.size > 0 %}
                <span class="date-range">{{ jekyll_posts.last.date | date: "%Y.%m" }} - {{ jekyll_posts.first.date | date: "%Y.%m" }}</span>
                {% endif %}
              </div>
            </div>
          </div>
          
          <div class="recent-posts">
            {% for post in jekyll_posts limit: 3 %}
            <div class="post-preview">
              <div class="post-meta">
                <time class="post-date">{{ post.date | date: "%m.%d" }}</time>
                {% if post.tags.size > 0 %}
                <span class="primary-tag"># {{ post.tags.first }}</span>
                {% endif %}
              </div>
              <h4 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title | truncatewords: 8 }}</a>
              </h4>
            </div>
            {% endfor %}
          </div>
          
          <div class="series-footer">
            <a href="/archive/jekyll-blog/" class="view-all-btn">
              전체 보기 ({{ jekyll_posts.size }}개) →
            </a>
          </div>
        </div>
        {% endif %}
      </div>
    </div>

    <!-- Apple Academy Posts -->
    <div class="archive-tab-content" data-category="apple-academy">
      <div class="posts-timeline">
        {% for post in apple_posts %}
        <div class="timeline-post">
          <div class="timeline-date">
            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </div>
          <div class="timeline-content">
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% if post.tags.size > 0 %}
            <div class="post-tags">
              {% for tag in post.tags limit: 3 %}
              <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
          </div>
        </div>
        {% endfor %}
      </div>
    </div>

    <!-- Development Posts -->
    <div class="archive-tab-content" data-category="development">
      <div class="posts-timeline">
        {% for post in dev_posts %}
        <div class="timeline-post">
          <div class="timeline-date">
            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </div>
          <div class="timeline-content">
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% if post.tags.size > 0 %}
            <div class="post-tags">
              {% for tag in post.tags limit: 3 %}
              <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
          </div>
        </div>
        {% endfor %}
      </div>
    </div>

    <!-- Jekyll Blog Posts -->
    <div class="archive-tab-content" data-category="jekyll-blog">
      <div class="posts-timeline">
        {% for post in jekyll_posts %}
        <div class="timeline-post">
          <div class="timeline-date">
            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </div>
          <div class="timeline-content">
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% if post.tags.size > 0 %}
            <div class="post-tags">
              {% for tag in post.tags limit: 3 %}
              <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>
</div>

{% if professional_posts.size == 0 %}
<div class="no-posts">
  <div class="no-posts-icon">📝</div>
  <h3>기술 포스트를 준비 중입니다</h3>
  <p>곧 다양한 학습과 프로젝트 경험을 공유할 예정이에요!</p>
</div>
{% endif %}

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.archive-tab-button');
    const tabContents = document.querySelectorAll('.archive-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.querySelector(`.archive-tab-content[data-category="${category}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add animation effect
            const seriesCards = targetContent.querySelectorAll('.series-card, .timeline-post');
            seriesCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    });
});
</script>
