---
layout: page
title: "Apple Academy 🍎"
description: "애플 디벨로퍼 아카데미에서의 학습과 프로젝트 경험을 모아봤습니다"
permalink: /archive/apple-academy/
---

<div class="series-detail-header">
    <div class="back-navigation">
        <a href="/archive/" class="back-btn">← 아카이브로 돌아가기</a>
    </div>
    
    <div class="series-hero">
        <div class="hero-icon">🍎</div>
        <div class="hero-content">
            <h1>Apple Academy</h1>
            <p class="hero-description">
                애플 디벨로퍼 아카데미에서의 Challenge-Based Learning(CBL) 경험과 
                iOS 개발 학습 과정을 기록한 시리즈입니다.
            </p>
            {% assign apple_posts = site.posts | where_exp: 'post', 'post.categories contains "AppleDeveloperAcademy"' %}
            <div class="hero-stats">
                <span class="stat">📝 {{ apple_posts.size }}개 포스트</span>
                {% if apple_posts.size > 0 %}
                <span class="stat">📅 {{ apple_posts.last.date | date: "%Y.%m" }} - {{ apple_posts.first.date | date: "%Y.%m" }}</span>
                {% endif %}
            </div>
        </div>
    </div>
</div>

<div class="series-detail-content">
    {% if apple_posts.size > 0 %}
    
    <!-- 최신 포스트 하이라이트 -->
    <div class="featured-post">
        {% assign latest_post = apple_posts.first %}
        <div class="featured-label">최신 포스트</div>
        <article class="featured-article">
            <div class="featured-meta">
                <time class="featured-date">{{ latest_post.date | date: "%Y년 %m월 %d일" }}</time>
                {% if latest_post.tags.size > 0 %}
                <div class="featured-tags">
                    {% for tag in latest_post.tags limit: 3 %}
                    <span class="tag"># {{ tag }}</span>
                    {% endfor %}
                </div>
                {% endif %}
            </div>
            <h2 class="featured-title">
                <a href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a>
            </h2>
            {% if latest_post.description %}
            <p class="featured-description">{{ latest_post.description }}</p>
            {% elsif latest_post.excerpt %}
            <p class="featured-description">{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
            {% endif %}
            <a href="{{ latest_post.url | relative_url }}" class="featured-link">포스트 읽기 →</a>
        </article>
    </div>
    
    <!-- 모든 포스트 목록 -->
    <div class="posts-timeline">
        <h2 class="timeline-title">전체 포스트</h2>
        
        {% assign posts_by_year = apple_posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
        
        {% for year_group in posts_by_year %}
        <div class="timeline-year">
            <h3 class="year-title">{{ year_group.name }}</h3>
            
            <div class="timeline-posts">
                {% for post in year_group.items %}
                <article class="timeline-post">
                    <div class="post-date-badge">
                        <span class="month">{{ post.date | date: "%m" }}</span>
                        <span class="day">{{ post.date | date: "%d" }}</span>
                    </div>
                    
                    <div class="post-content">
                        <div class="post-meta">
                            {% if post.tags.size > 0 %}
                            <div class="post-tags">
                                {% for tag in post.tags limit: 2 %}
                                <span class="tag"># {{ tag }}</span>
                                {% endfor %}
                                {% if post.tags.size > 2 %}
                                <span class="tag-more">+{{ post.tags.size | minus: 2 }}</span>
                                {% endif %}
                            </div>
                            {% endif %}
                        </div>
                        
                        <h3 class="post-title">
                            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        </h3>
                        
                        {% if post.description %}
                        <p class="post-excerpt">{{ post.description | truncatewords: 15 }}</p>
                        {% elsif post.excerpt %}
                        <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 15 }}</p>
                        {% endif %}
                    </div>
                </article>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
    
    {% else %}
    <div class="no-posts">
        <div class="no-posts-icon">📝</div>
        <h3>Apple Academy 포스트를 준비 중입니다</h3>
        <p>곧 애플 아카데미에서의 경험을 공유할 예정이에요!</p>
    </div>
    {% endif %}
</div>

<style>
.series-detail-header {
    margin-bottom: 3rem;
}

.back-navigation {
    margin-bottom: 1.5rem;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    color: #6c757d;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.back-btn:hover {
    color: #007bff;
}

.series-hero {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    padding-left: 4rem;
    padding-right: 4rem;
}

.hero-icon {
    font-size: 4rem;
    min-width: 80px;
}

.hero-content h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
}

.hero-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    opacity: 0.95;
}

.hero-stats {
    display: flex;
    gap: 1.5rem;
    font-size: 0.95rem;
    opacity: 0.9;
}

.stat {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.series-detail-content {
    max-width: 800px;
    margin: 0 auto;
}

.featured-post {
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    border-left: 4px solid #007bff;
}

.featured-label {
    color: #007bff;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
}

.featured-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.featured-date {
    color: #6c757d;
    font-size: 0.9rem;
    font-weight: 500;
}

.featured-tags {
    display: flex;
    gap: 0.5rem;
}

.featured-tags .tag {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;
}

.featured-title {
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    line-height: 1.3;
}

.featured-title a {
    color: #343a40;
    text-decoration: none;
    transition: color 0.3s ease;
}

.featured-title a:hover {
    color: #007bff;
}

.featured-description {
    color: #495057;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
}

.featured-link {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.featured-link:hover {
    color: #0056b3;
}

.posts-timeline {
    margin-top: 2rem;
}

.timeline-title {
    font-size: 1.5rem;
    color: #343a40;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
}

.timeline-year {
    margin-bottom: 2.5rem;
}

.year-title {
    font-size: 1.2rem;
    color: #495057;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.timeline-posts {
    display: flex;
    flex-direction: column;
}

.timeline-post {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.timeline-post:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

.post-date-badge {
    min-width: 50px;
    height: 50px;
    background: #007bff;
    color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

.post-date-badge .month {
    font-size: 0.65rem;
    opacity: 0.8;
}

.post-date-badge .day {
    font-size: 1rem;
}

.post-content {
    flex: 1;
}

.post-meta {
    margin-bottom: 0.8rem;
}

.post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.post-tags .tag {
    background: #e9ecef;
    color: #495057;
    padding: 0.15rem 0.4rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 500;
}

.tag-more {
    background: #dee2e6;
    color: #6c757d;
    padding: 0.15rem 0.4rem;
    border-radius: 6px;
    font-size: 0.7rem;
}

.post-title {
    margin: 0 0 0.6rem 0;
    font-size: 1.1rem;
    line-height: 1.3;
    font-weight: 600;
}

.post-title a {
    color: #343a40;
    text-decoration: none;
    transition: color 0.3s ease;
}

.post-title a:hover {
    color: #007bff;
}

.post-excerpt {
    color: #6c757d;
    line-height: 1.4;
    margin: 0 0 0.8rem 0;
    font-size: 0.9rem;
}

.read-more {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.read-more:hover {
    color: #0056b3;
}

.no-posts {
    text-align: center;
    padding: 4rem 2rem;
    color: #6c757d;
}

.no-posts-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.no-posts h3 {
    margin-bottom: 1rem;
    color: #495057;
}

@media (max-width: 768px) {
    .series-hero {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
        margin-left: -1rem;
        margin-right: -1rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    
    .hero-icon {
        font-size: 3rem;
    }
    
    .hero-content h1 {
        font-size: 2rem;
    }
    
    .hero-stats {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .timeline-post {
        flex-direction: column;
        gap: 0.8rem;
        padding: 0.8rem;
    }
    
    .post-date-badge {
        align-self: flex-start;
        min-width: 45px;
        height: 45px;
    }
    
    .post-date-badge .day {
        font-size: 0.9rem;
    }
    
    .post-date-badge .month {
        font-size: 0.6rem;
    }
    
    .post-title {
        font-size: 1rem;
        margin: 0 0 0.5rem 0;
    }
    
    .post-excerpt {
        font-size: 0.85rem;
        margin: 0 0 0.6rem 0;
    }
    
    .featured-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>
