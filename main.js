// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('mainNav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // 메뉴 항목 클릭 시 메뉴 닫기
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
  
  // 스크롤 시 헤더 스타일 변경
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // 메뉴 카드 호버 효과 (터치 디바이스 지원)
  const menuCards = document.querySelectorAll('.menu-card');
  
  menuCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.classList.add('touched');
    });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touched');
      }, 300);
    });
  });
  
  // 스크롤 애니메이션 (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.info-box, .menu-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // 뉴스 항목 자동 순환 하이라이트
  const newsItems = document.querySelectorAll('.news-list li');
  let currentIndex = 0;
  
  function highlightNewsItem() {
    newsItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.style.backgroundColor = 'rgba(90, 156, 62, 0.1)';
        item.style.borderRadius = '8px';
        item.style.transition = 'background-color 0.3s ease';
      } else {
        item.style.backgroundColor = 'transparent';
      }
    });
    
    currentIndex = (currentIndex + 1) % newsItems.length;
  }
  
  // 3초마다 뉴스 항목 하이라이트 변경
  if (newsItems.length > 0) {
    setInterval(highlightNewsItem, 3000);
    highlightNewsItem(); // 초기 실행
  }
  
  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // 창 크기 변경 시 모바일 메뉴 초기화
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (mobileMenuBtn && nav) {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
      }
    }
  });
  
  console.log('🍙 김밥나라 웹사이트가 로드되었습니다!');
});

