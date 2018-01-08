/* ========================================================================
 * Copyright 2017
 * University of Copenhagen, FA Communications
 * Important!!: Alle functions to be run must be wrapped in:
 *
 * (function($) {
 *     Execute code...
 * })(jQuery);
*
 * ========================================================================*/

// Fix viewport width on Windows Phone: http://getbootstrap.com/getting-started/#support-ie10-width

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  );
  document.querySelector('head').appendChild(msViewportStyle);
}

// Toggle icon in accordions
function flipIcon(e) {
$(e.target)
  .prev('.panel-heading')
  .toggleClass('open');
}

(function($) {
  // Fix for select boxes on Android 4.1: http://getbootstrap.com/getting-started/#support-android-stock-browser
  var nua = navigator.userAgent;
  var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
  if (isAndroid) {
    $('select.form-control').removeClass('form-control').css('width', '100%');
  }

  // Toggle icon in accordions
  $('.panel-accordion').each(function () {
     if ($(this).find('.panel-heading').next('.panel-collapse').hasClass('in')) {
         $(this).find('.panel-heading').addClass('open');
     }
 });
  $('.panel-accordion').on('hide.bs.collapse', flipIcon);
  $('.panel-accordion').on('show.bs.collapse', flipIcon);

  // Open / close all accordions
  $('.closeall').click(function () {
    $('.panel-collapse.in')
      .collapse('hide');
  });
  $('.openall').click(function () {
    $('.panel-collapse:not(".in")')
      .collapse('show');
  });

  // Truncate multiple lines of text in News in global menu
  var $chars = 80; // number of characters
  var $news = $('ul.dropdown-menu.nyheder li a');
  if ($news) {
    $news.each(function (i, v) {
      var txt = $(this).text();
      if (txt.length > $chars) {
        $(this).html($(this).html().substring(0, $chars) + '...');
      }
    });
  }

  // Global smooth scroll to top
  var $scroller = '<div class=\'scrolltop fade\' id=\'scrolltop\' title=\'Top\'><span class=\'glyphicon-menu-up\'></span></div>';

  // Add scroller after footer
$($scroller).appendTo('body');

  scrollFunction();

  window.onscroll = function () {
    scrollFunction()
  };

  function scrollFunction() {
    var $scroll = $('#scrolltop');
    if ($scroll) {
      if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        $scroll.addClass('in');
      } else {
        $scroll.removeClass('in');
      }
    }
  }

  $('#scrolltop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

})(jQuery);
