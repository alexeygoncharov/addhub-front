//Не перенесена страница
// let modalTogglers = document.querySelectorAll('[data-modal]');
// let modals = document.querySelectorAll('.modal');

// modalTogglers.forEach((el) => {
//   el.onclick = function () {
//     let modalId = el.getAttribute('data-modal');
//     openModal(modalId);
//   };
// });

// function closeModals() {
//   modals.forEach((modal) => {
//     modal.classList.remove('_active');
//     body.classList.remove('fixed-body2');
//   });
// }

// function openModal(modalId) {
//   closeModals();
//   let modal = document.querySelector(`#${modalId}`);
//   let closeButtons = modal.querySelectorAll(`._close-modal`);

//   modal.classList.add('_active');
//   body.classList.add('fixed-body2');

//   closeButtons.forEach((btn) => {
//     btn.onclick = () => {
//       modal.classList.remove('_active');
//       body.classList.remove('fixed-body2');
//     };
//   });
// }
