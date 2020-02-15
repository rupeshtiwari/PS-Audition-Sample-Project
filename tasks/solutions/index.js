// Task 1: Wait till document is ready
$(function() {
  // Task 2: Increment Score
  $('.increment').on('click', function() {
    const previousValue = $('input').val() || 0;
    const newValue = +previousValue + 1;
    $('input').val(newValue);
  });

  // Task 3: Decrement Score
  $('.decrement').on('click', function() {
    const previousValue = $('input').val() || 0;
    if (previousValue < 1) {
      return false;
    }
    const newValue = +previousValue - 1;
    $('input').val(newValue);
  });
});

