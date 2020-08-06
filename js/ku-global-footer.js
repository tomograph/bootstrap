/* ========================================================================
 * Bootstrap: v3.3.7
 * Custom script for University of Copenhagen: ku.dk
 * ======================================================================== */


+function($) {
  'use strict';

  // Check if the page is responsive
  var $isResponsive = ($('html').hasClass('non-responsive')) ? true : false;
  var $footerHeader = $('#globalfooter .footer-heading[data-heading="toggle"]');
  var $footerColumn = $('#globalfooter .footer-heading[data-heading="toggle"] + .footerlinks');
  var $cachedWidth = $('body').prop('clientWidth');

  var collapseFooter = function(el, ev) {
    // Collapse footer at lowest breakpoint
    if ($isResponsive === false && window.matchMedia('(max-width: 767px)').matches) {
      ev.preventDefault();
      $(el).next('ul').slideToggle();
      $(el).toggleClass('open');

      $(el).next('ul').find('li').each(function(idx, li) {
        var expanded = $(this).find('a').attr('aria-expanded') == 'false' ? true : false;
        $(this).find('a').attr('aria-expanded', expanded)
      });

    } else {
      $(el).next('ul').show();
    }
  };

  $footerHeader.click(function(e) {
    collapseFooter(this, e);
  });

  $(window).resize(function() {
    var $newWidth = $('body').prop('clientWidth');
    if ($isResponsive === false && $newWidth !== $cachedWidth) {
      $footerHeader.removeClass('open');
      $footerColumn.removeAttr('style');
      $cachedWidth = $newWidth;
    }
  });
}(jQuery);
