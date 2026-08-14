document.addEventListener('DOMContentLoaded', function () {
  var original = document.getElementById('last-change');
  var target = document.getElementById('mdbook-content');
  if (!original || !target) return;

  // Pull values off the original before it's removed.
  var timeEl = original.querySelector('time');
  var linkEl = original.querySelector('a');

  var isoDate   = timeEl ? timeEl.getAttribute('datetime') : '';
  var shownDate = timeEl ? timeEl.textContent : '';
  var commitUrl = linkEl ? linkEl.getAttribute('href') : '';
  var commitSha = linkEl ? linkEl.textContent : '';

  // Build the replacement from scratch.
  var rebuilt = document.createElement('footer');
  rebuilt.id = 'last-change';

  var timeNode = document.createElement('time');
  timeNode.setAttribute('datetime', isoDate);
  timeNode.textContent = shownDate;

  var linkNode = document.createElement('a');
  linkNode.setAttribute('href', commitUrl);
  linkNode.textContent = commitSha;

  rebuilt.append('Last change: ', timeNode, ', commit: ', linkNode);

  var slot = document.createElement('div');
  slot.className = 'last-change-slot';
  slot.appendChild(rebuilt);

  original.remove();
  target.appendChild(slot);
});