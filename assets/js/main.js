/**
* Template Name: Squadfree
* Template URL: https://bootstrapmade.com/squadfree-free-bootstrap-template-creative/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra nếu đang ở trang 'service-details.html'
    if (window.location.pathname.includes('service-details.html')) {
      // Hiển thị phần đầu tiên mặc định trong trang service-details.html
      showSection('tutor');
  
      // Gắn sự kiện click cho tất cả các liên kết trong menu chính (navmenu)
      var links = document.querySelectorAll('.navmenu a');
      links.forEach(function (link) {
        link.addEventListener('click', function (e) {
          if (link.getAttribute('href').includes('service-details.html')) {
            e.preventDefault(); // Ngăn điều hướng mặc định
            var sectionId = link.getAttribute('href').split('#')[1]; // Lấy ID từ href
            showSection(sectionId); // Hiển thị nội dung tương ứng
            history.pushState(null, null, link.getAttribute('href')); // Cập nhật URL
          } else if (link.getAttribute('href').includes('.html')) {
            window.location.href = link.getAttribute('href'); // Điều hướng trang khác
          }
        });
      });
  
      // Gắn sự kiện click cho danh sách dịch vụ (services-list)
      var serviceLinks = document.querySelectorAll('.services-list a');
      serviceLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault(); // Ngăn điều hướng mặc định
          var sectionId = link.getAttribute('href').replace('#', ''); // Lấy ID
  
          showSection(sectionId); // Hiển thị section tương ứng
          history.pushState(null, null, '#' + sectionId); // Cập nhật URL
        });
      });
  
      // Xử lý khi trang tải lại hoặc có hash trong URL
      var currentHash = window.location.hash.replace('#', '');
      if (currentHash) {
        showSection(currentHash);
      }
  
      // Xử lý sự kiện khi nhấn nút quay lại trên trình duyệt
      window.addEventListener('popstate', function () {
        var currentHash = window.location.hash.replace('#', '') || 'tutor';
        showSection(currentHash);
      });
    } else {
      // Nếu không phải trang service-details.html, điều hướng bình thường
      var links = document.querySelectorAll('.navmenu a');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          window.location.href = link.getAttribute('href');
        });
      });
    }
  });
  
  /**
   * Hàm hiển thị section tương ứng
   */
  function showSection(sectionId) {
    // Ẩn tất cả các phần nội dung
    document.querySelectorAll('.service-detail-section').forEach(function (section) {
      section.style.display = 'none';
      section.classList.remove('active');
    });
  
    // Hiển thị section được chọn
    var activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.style.display = 'block';
      setTimeout(() => activeSection.classList.add('active'), 20);
    }
  
    // Cập nhật trạng thái active trong menu chính và services-list
    document.querySelectorAll('.navmenu a, .services-list a').forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('active');
      }
    });
  }
  
  $(document).ready(function() {
    $('.toggle-pdf').click(function() {
        var pdfContainer = $(this).next('.pdf-container');
        $(this).toggleClass('open'); // Thêm class khi click để xoay mũi tên
        if (pdfContainer.is(':hidden')) {
            pdfContainer.slideDown('slow');
        } else {
            pdfContainer.slideUp('slow');
        }
    });
});

})();