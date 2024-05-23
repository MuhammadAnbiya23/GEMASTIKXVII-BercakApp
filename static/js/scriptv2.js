document.getElementById('colorfulModeSwitch').addEventListener('change', function() {
    document.body.classList.toggle('colorful-mode');
  });
  function handleSwitchChange() {
    var switchElement = document.getElementById('colorModeSwitch');
    if (!switchElement.checked) {
        window.location.href = 'indexv2.html';
    }
}