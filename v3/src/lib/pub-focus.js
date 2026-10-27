/* Cross-section request: scroll to the Publications list and expand one entry. */
export const PUB_FOCUS = 'pub:focus'
export function focusPublication(id) {
  window.dispatchEvent(new CustomEvent(PUB_FOCUS, { detail: id }))
}
