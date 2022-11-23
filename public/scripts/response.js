// form validation eg. name input
// drag-drop
// submit handling w/ success message

$(() => {
  // hides the error and submit window
  $('.error_name').css('display', 'none');
  $('.submit_window').hide();


  $(document).tooltip({
    position: { my: "left+15 center", at: "right center" }
  });

  $('.question').on('click', () => $('.question').toggle('slide'));

  $("#sortable").sortable({
    placeholder: "placeholder",
    axis : 'y',
    opacity: 0.3,
    cursor: 'grabbing',
    containment: 'parent',
    tolerance: "pointer",
  });

  $('.name_box').on('focus',() => {
    $('.error_name').hide('slow');
  });

  $('.home_button').on('click', () => {
    window.location.href = '../';
  });

  $('.submission').on('submit', function(event) {
    event.preventDefault();
    let result = $('#sortable').sortable('toArray');
    let respondentName = $('.name_box').val();
    // console.log(respondentName);
    // console.log(result);

    if ($(".name_box").is(":visible")) {
      if (!$('.name_box').val()) {
        $('.error_name').show('slow');
        return;
      } else {
        $('#name_greet').text(`Thank you for answering, ${$('.name_box').val()}`);
      }
    }

    //toggles the form and message once the form has been submitted
    $('.submit_window').show();
    $('.submission_form').hide();

    $.post('/polls/:id', {name:respondentName, result:result})
      .then(result => {
        // console.log('post log:', result);
        return result;
      });
  });



});
