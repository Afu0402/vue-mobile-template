//解决IOS端键盘上移后不能回落的问题。
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);
  document.body.addEventListener('focusout', () => {
    window.scrollTo(0,0);  
  });
  