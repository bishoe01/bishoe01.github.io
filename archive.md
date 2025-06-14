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
      <button class="archive-tab-button" data-category="academy-daily" data-label="아카데미일상">
        <i class="fas fa-calendar-day"></i>
        <span class="tab-text">아카데미일상</span>
      </button>
    </div>
  </div>

  <!-- Archive Content Areas -->
  <div class="archive-content">
    <!-- Professional Categories Only -->
    {% assign professional_categories = "AppleDeveloperAcademy,개발,아카데미일상" | split: "," %}
    {% assign professional_posts = site.posts | where_exp: 'post', 'professional_categories contains post.categories[0]' %}
    {% assign apple_posts = professional_posts | where_exp: 'post', 'post.categories contains "AppleDeveloperAcademy"' %}
    {% assign dev_posts = professional_posts | where_exp: 'post', 'post.categories contains "개발"' %}
    {% assign academy_daily_posts = professional_posts | where_exp: 'post', 'post.categories contains "아카데미일상"' %}

    <!-- All Posts View -->
    <div class="archive-tab-content active" data-category="all">
      <div class="series-grid">
        <!-- Apple Academy Series -->
        {% if apple_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
            <div class="series-header-content">
            <h2 class="series-title">Apple Academy</h2>
            <div class="series-icon">🍎</div>
            </div>
            <div class="series-info">  
              <p class="series-description">애플 디벨로퍼 아카데미에서의 학습과 프로젝트 경험</p>
              <div class="series-stats">
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
            <a href="/archive/?category=apple-academy" class="view-all-btn">
              전체 보기 ({{ apple_posts.size }}개) →
            </a>
          </div>
        </div>
        {% endif %}
        
        <!-- Development Series -->
        {% if dev_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
          <div class="series-header-content">
            <h2 class="series-title">개발 & 기술</h2>
            <div class="series-icon">💻</div>
        </div>
            
            <div class="series-info">
              <p class="series-description">프로그래밍 언어, 프레임워크, 개발 도구 학습 기록</p>
              <div class="series-stats">
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
            <a href="/archive/?category=development" class="view-all-btn">
              전체 보기 ({{ dev_posts.size }}개) →
            </a>
          </div>
        </div>
        {% endif %}
        
        <!-- 아카데미일상 Series -->
        {% if academy_daily_posts.size > 0 %}
        <div class="series-card">
          <div class="series-header">
            <div class="series-header-content">
              <h2 class="series-title">아카데미일상</h2>
              <div class="series-icon">🌱</div>
            </div>
            <div class="series-info">  
              <p class="series-description">아카데미 일상생활의 소소한 순간들과 성장 기록</p>
              <div class="series-stats">
                <span class="date-range">{{ academy_daily_posts.last.date | date: "%Y.%m" }} - {{ academy_daily_posts.first.date | date: "%Y.%m" }}</span>
              </div>
            </div>
          </div>
          
          <div class="recent-posts">
            {% for post in academy_daily_posts limit: 3 %}
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
            <a href="/archive/?category=academy-daily" class="view-all-btn">
              전체 보기 ({{ academy_daily_posts.size }}개) →
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

    <!-- 아카데미일상 Posts -->
    <div class="archive-tab-content" data-category="academy-daily">
      <div class="posts-timeline">
        {% for post in academy_daily_posts %}
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
    
    // URL 파라미터에서 카테고리 읽기
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // 기본값은 'all'
    let activeCategory = 'all';
    
    // URL 파라미터가 있으면 해당 카테고리로 설정
    if (categoryParam) {
        activeCategory = categoryParam;
    }
    
    // 초기 활성화
    activateTab(activeCategory);
    
    // 탭 클릭 이벤트
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            activateTab(category);
            
            // URL 업데이트 (브라우저 히스토리에 추가)
            const newUrl = category === 'all' ? '/archive/' : `/archive/?category=${category}`;
            history.pushState(null, '', newUrl);
        });
    });
    
    function activateTab(category) {
        // 모든 탭과 컨텐츠에서 active 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 해당 탭 버튼 활성화
        const targetButton = document.querySelector(`.archive-tab-button[data-category="${category}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // 해당 컨텐츠 표시
        const targetContent = document.querySelector(`.archive-tab-content[data-category="${category}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // 애니메이션 효과
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
        }
    }
});
</script>
