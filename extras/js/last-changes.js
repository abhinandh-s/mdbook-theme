document.addEventListener('DOMContentLoaded', function () {
  var footer = document.getElementById('last-change');
  var target = document.getElementById('mdbook-content');
  if (!footer || !target) return;

  var slot = document.createElement('div');
  slot.className = 'last-change-slot';
  slot.appendChild(footer);

  target.insertBefore(slot, target.firstChild);
});