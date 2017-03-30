// Custom scripts for kurser.ku.dk
$(document).ready(function () {
  $cachedWidth = $('body').prop('clientWidth');
  $search = $('#searchall');
  $advanced = $('#showall');
  $hiddenColumn = $('.mobile-hidden');

  resetText();
  multipleSelectBox();
  collapsePanels();
  //runDatatable(); Run after table exists

  $advanced.click(function () {
    if ($cachedWidth < 768) {
      $(this).toggleClass('open');
      $hiddenColumn.slideToggle();
    }
  });

  $(window).resize(function () {
    var $newWidth = $('body').prop('clientWidth');
    if ($newWidth !== $cachedWidth) {
      $hiddenColumn.removeAttr('style');
      $advanced.removeClass('open');
      resetText();
      collapsePanels();
      $cachedWidth = $newWidth;
    }
    $cachedWidth = $newWidth;
  });
});

// Function to change text for small screens (DA/ENG)
function resetText() {
  var $lang = $('html').attr('lang');
  $('.main-content .btn').each(function () {
    $(this).html($(this).data($lang));
  });
}

function runDatatable() {
  // Datatable language switcher
  function getLanguage() {
    var en = {
      sLengthMenu: 'Display _MENU_ courses per page',
      sInfo: 'Showing _START_ to _END_ of _TOTAL_ courses'
    };

    var da = {
      sProcessing: 'Henter...',
      sLengthMenu: 'Vis _MENU_ kurser',
      sInfo: 'Viser _START_ til _END_ af _TOTAL_ kurser',
      sInfoEmpty: 'Viser 0 til 0 af 0 kurser',
      sSearch: 'S&oslash;g:',
      sUrl: '',
      oPaginate: {
        sFirst: 'F&oslash;rste',
        sPrevious: 'Forrige',
        sNext: 'N&aelig;ste',
        sLast: 'Sidste'
      }
    };
    var $lang = $('html').attr('lang');
    var $currentLang = ($lang == 'da') ? da : en;
    return $currentLang;
  }

  // Build Datatable
  $('#searchresults').DataTable({
    oLanguage: getLanguage(),
    ordering: true,
    autoWidth: false,
    bFilter: false,
    fixedHeader: true,
    responsive: true
  });
}

// Destroy DataTable - reinitialise with runDatatable()
function destroyDatatable() {
  var $table = $('#searchresults').DataTable();
  $table.destroy();
}

function multipleSelectBox() {
  // Multiple select language switcher
  var multipleSelectLang = function () {
    var da = {
      placeholder: 'V&aelig;lg flere...',
      selectAllText: 'V&aelig;lg alle',
      allSelected: 'Alle valgt',
      countSelected: '# af % valgt',
      width: '100%'
    };
    var en = {
      placeholder: 'Select multiple...',
      width: '100%'
    };
    return ($('html').attr('lang') == 'da') ? da : en;
  };
  // Run Multiple select
  $('select[multiple]').multipleSelect(multipleSelectLang());
}

function collapsePanels() {
  // Collapse panels for mobiles
  var $open = $('.course-item a[aria-expanded="true"]');
  if ($cachedWidth < 769) {
    $open.next('[class*="collapse"]').removeClass('in').removeAttr('style');
    $open.addClass('collapsed');
  } else {
    $open.next('[class*="collapse"]').addClass('in').removeAttr('style');
    $open.removeClass('collapsed');
  }
}
