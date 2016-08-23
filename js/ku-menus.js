// jscs:disable
/* ======================================================================
 * Bootstrap: v3.3.7
 * Custom menu script for University of Copenhagen: ku.dk
 * ====================================================================== */

+ function ($) {
  'use strict';

  // var $kuNav = $('#kunav');
  // var $navBar = $('#navbar');
  var $cachedWidth = $('body').prop('clientWidth');
  if ($cachedWidth <= 768) {
    // Global menu folding
    //   $navBar.on('show.bs.collapse', function () {
    //     $kuNav.show();
    //   });
    //   $navBar.on('hide.bs.collapse', function () {
    //     $kuNav.hide();
    //   });

    // Clicking left menu button or content area closes global menu
    //   $('#btn_left, #content').click(function () {
    //     $navBar.collapse('hide');
    //   });
  }

  $(window).resize(function () {
    var $newWidth = $('body').prop('clientWidth');
    if ($newWidth !== $cachedWidth) {
      if ($cachedWidth <= 768) {
        $('#mobileleftmenu').remove(); // Remove mobile menu
      }
      $cachedWidth = $newWidth;
    }
  });
}(jQuery);
