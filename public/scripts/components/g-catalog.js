let checksGroups = document.querySelectorAll('.filter-group__checks');

if (checksGroups.length > 0) {
  checksGroups.forEach((group) => {
    let toggle = group.querySelector('.more-checks');
    if (toggle) {
      toggle.onclick = function () {
        group.classList.toggle('_show-all');
        setToggleBlocksHeight();
      };
    }
  });
}

let toggleFilter = document.querySelectorAll('._toggle-filter');
toggleFilter.forEach((btn) => {
  btn.onclick = function () {
    body.classList.toggle('open-filter');
    body.classList.toggle('fixed-body');
  };
});
