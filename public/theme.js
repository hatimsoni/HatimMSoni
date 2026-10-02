// Runs before the page paints to prevent a flash of the wrong theme.
(function () {
  var saved;
  try { saved = localStorage.getItem('hatim-theme'); } catch (_) {}
  var theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f8f3' : '#101110');
})();
