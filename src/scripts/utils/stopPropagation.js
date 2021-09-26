const modals = Array.from(document.querySelectorAll('.modal'));

/*
 * Prevent the click event from propagating to modal containers, because
 * that would cause the modal to close.
 */

export function stopPropagation() {
  for (const modal of modals) {
    const firstEl = modal.firstElementChild;
    firstEl.addEventListener('click', e => e.stopPropagation());
  }
}
