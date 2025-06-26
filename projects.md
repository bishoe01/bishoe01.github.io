---
layout: page
title: "프로젝트 🚀"
description: "제가 작업한 다양한 프로젝트들을 둘러보세요"
permalink: /projects/
---

<div class="projects-page">
  <!-- Project Category Tabs -->
  <div class="project-tabs-container">
    <div class="project-tabs">
      <button class="tab-button active" data-category="all" data-label="전체">
        <i class="fas fa-th-large"></i>
        <span class="tab-text">전체</span>
      </button>
      <button class="tab-button" data-category="web" data-label="웹">
        <i class="fas fa-laptop-code"></i>
        <span class="tab-text">AppleChallenges</span>
      </button>
      <button class="tab-button" data-category="mobile" data-label="모바일">
        <i class="fas fa-mobile-alt"></i>
        <span class="tab-text">모바일 & 앱</span>
      </button>
      <button class="tab-button" data-category="tools" data-label="도구">
        <i class="fas fa-tools"></i>
        <span class="tab-text">도구 & 인프라</span>
      </button>
    </div>
  </div>

  <!-- Project Content Areas -->
  <div class="project-content">
    <!-- Web Development Projects -->
    <div class="tab-content" data-category="web">
      <div class="projects-grid">
        <div class="project-card modern" data-project="mentbox">
          <div class="project-image">
            <i class="fas fa-blog project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>📱 MentBox</h3>
              <div class="project-status">
                <span class="status completed">완료</span>
              </div>
            </div>
            <p class="project-description">멘토와의 소통 공간</p>
            <div class="project-tech">
              <span class="tech-tag">SwiftUI</span>
              <span class="tech-tag">Firebase</span>
              <span class="tech-tag">AppleLogin</span>
            </div>
            <div class="project-footer">
              {% assign mentbox_posts = site.posts | where_exp: 'post', 'post.categories contains "Mentbox"' %}
              <span class="post-count">{{ mentbox_posts.size }}개 포스트</span>
              <a href="/projects/mentbox/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern" data-project="web-app">
          <div class="project-image">
            <i class="fas fa-laptop-code project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>💻 웹 앱</h3>
              <div class="project-status">
                <span class="status developing">개발 중</span>
              </div>
            </div>
            <p class="project-description">React와 Node.js 풀스택 애플리케이션</p>
            <div class="project-tech">
              <span class="tech-tag">React</span>
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">MongoDB</span>
            </div>
            <div class="project-footer">
              {% assign webapp_posts = site.posts | where_exp: 'post', 'post.categories contains "web-app"' %}
              <span class="post-count">{{ webapp_posts.size }}개 포스트</span>
              <a href="/projects/web-app/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Mobile & App Projects -->
    <div class="tab-content" data-category="mobile">
      <div class="projects-grid">
        <div class="project-card modern" data-project="mobile-app">
          <div class="project-image">
            <i class="fas fa-mobile-alt project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>📱 모바일 앱</h3>
              <div class="project-status">
                <span class="status planning">아이디어 단계</span>
              </div>
            </div>
            <p class="project-description">React Native 크로스플랫폼 앱</p>
            <div class="project-tech">
              <span class="tech-tag">React Native</span>
              <span class="tech-tag">Expo</span>
              <span class="tech-tag">Firebase</span>
            </div>
            <div class="project-footer">
              {% assign mobile_posts = site.posts | where_exp: 'post', 'post.categories contains "mobile-app"' %}
              <span class="post-count">{{ mobile_posts.size }}개 포스트</span>
              <a href="/projects/mobile-app/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern future" data-project="desktop-app">
          <div class="project-image">
            <i class="fas fa-desktop project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>🖥️ 데스크톱 앱</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">Electron 기반 데스크톱 애플리케이션</p>
            <div class="project-tech">
              <span class="tech-tag">Electron</span>
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">SQLite</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tools & Infrastructure Projects -->
    <div class="tab-content" data-category="tools">
      <div class="projects-grid">
        <div class="project-card modern future" data-project="dev-tools">
          <div class="project-image">
            <i class="fas fa-tools project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>🔧 개발 도구</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">개발자를 위한 유틸리티 도구모음</p>
            <div class="project-tech">
              <span class="tech-tag">CLI</span>
              <span class="tech-tag">Bash</span>
              <span class="tech-tag">Python</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern future" data-project="automation">
          <div class="project-image">
            <i class="fas fa-cogs project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>⚙️ 자동화</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">업무 자동화 스크립트 및 워크플로우</p>
            <div class="project-tech">
              <span class="tech-tag">GitHub Actions</span>
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">Jenkins</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Projects View -->
    <div class="tab-content active" data-category="all">
      <div class="projects-grid">
        <!-- Web Projects -->
        <div class="project-card modern" data-project="mentbox">
          <div class="project-image">
            <i class="fas fa-blog project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>📱 MentBox</h3>
              <div class="project-status">
                <span class="status completed">완료</span>
              </div>
            </div>
            <p class="project-description">멘토와의 소통 공간</p>
            <div class="project-tech">
              <span class="tech-tag">SwiftUI</span>
              <span class="tech-tag">Firebase</span>
              <span class="tech-tag">AppleLogin</span>
            </div>
            <div class="project-footer">
              {% assign mentbox_posts = site.posts | where_exp: 'post', 'post.categories contains "Mentbox"' %}
              <span class="post-count">{{ mentbox_posts.size }}개 포스트</span>
              <a href="/projects/mentbox/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern" data-project="web-app">
          <div class="project-image">
            <i class="fas fa-laptop-code project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>💻 웹 앱</h3>
              <div class="project-status">
                <span class="status developing">개발 중</span>
              </div>
            </div>
            <p class="project-description">React와 Node.js 풀스택 애플리케이션</p>
            <div class="project-tech">
              <span class="tech-tag">React</span>
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">MongoDB</span>
            </div>
            <div class="project-footer">
              {% assign webapp_posts = site.posts | where_exp: 'post', 'post.categories contains "web-app"' %}
              <span class="post-count">{{ webapp_posts.size }}개 포스트</span>
              <a href="/projects/web-app/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        
        <!-- Mobile Projects -->
        <div class="project-card modern" data-project="mobile-app">
          <div class="project-image">
            <i class="fas fa-mobile-alt project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>📱 모바일 앱</h3>
              <div class="project-status">
                <span class="status planning">아이디어 단계</span>
              </div>
            </div>
            <p class="project-description">React Native 크로스플랫폼 앱</p>
            <div class="project-tech">
              <span class="tech-tag">React Native</span>
              <span class="tech-tag">Expo</span>
              <span class="tech-tag">Firebase</span>
            </div>
            <div class="project-footer">
              {% assign mobile_posts = site.posts | where_exp: 'post', 'post.categories contains "mobile-app"' %}
              <span class="post-count">{{ mobile_posts.size }}개 포스트</span>
              <a href="/projects/mobile-app/" class="project-link">자세히 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern future" data-project="desktop-app">
          <div class="project-image">
            <i class="fas fa-desktop project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>🖥️ 데스크톱 앱</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">Electron 기반 데스크톱 애플리케이션</p>
            <div class="project-tech">
              <span class="tech-tag">Electron</span>
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">SQLite</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>

        <!-- Tools Projects -->
        <div class="project-card modern future" data-project="dev-tools">
          <div class="project-image">
            <i class="fas fa-tools project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>🔧 개발 도구</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">개발자를 위한 유틸리티 도구모음</p>
            <div class="project-tech">
              <span class="tech-tag">CLI</span>
              <span class="tech-tag">Bash</span>
              <span class="tech-tag">Python</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>

        <div class="project-card modern future" data-project="automation">
          <div class="project-image">
            <i class="fas fa-cogs project-icon"></i>
          </div>
          <div class="project-content-inner">
            <div class="project-header">
              <h3>⚙️ 자동화</h3>
              <div class="project-status">
                <span class="status future">예정</span>
              </div>
            </div>
            <p class="project-description">업무 자동화 스크립트 및 워크플로우</p>
            <div class="project-tech">
              <span class="tech-tag">GitHub Actions</span>
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">Jenkins</span>
            </div>
            <div class="project-footer">
              <span class="post-count">0개 포스트</span>
              <a href="#" class="project-link disabled">준비 중 <i class="fas fa-clock"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="projects-footer">
  <h3>🔍 더 많은 프로젝트</h3>
  <p>실험적인 코드와 작은 프로젝트들은 <a href="https://github.com/bishoe01" target="_blank">GitHub <i class="fas fa-external-link-alt"></i></a>에서 확인하실 수 있습니다!</p>
  
  <div class="contribute-section">
    <h4>🤝 함께 만들어요!</h4>
    <p>흥미로운 아이디어나 협업 제안이 있으시면 <a href="/contact/">연락</a>해주세요. 함께 멋진 것을 만들어보아요! 🚀</p>
  </div>
</div>
