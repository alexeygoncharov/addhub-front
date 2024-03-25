export default function () {
  if (!process.client) return;
  document.body.classList.toggle('_open-search');
  document.body.classList.toggle('fixed-body');
}
