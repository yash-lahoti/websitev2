import { useSyncExternalStore } from 'react'

/*
 * Tiny global store for the slide viewer: any section can open a lecture from any origin.
 * `source: 'ribbon'` means the 3D card is hidden while the viewer (or its return flight) is on screen.
 * `el` is a DOM element to fly back to on close (re-measured at close time).
 */
let state = { open: false, returning: false, id: null, page: 1, origin: null, cover: null, el: null, source: null, at: 0 }
const subs = new Set()
const emit = () => subs.forEach((f) => f())

export function openLecture(id, { page = 1, origin = null, cover = null, el = null, source = null } = {}) {
  state = { open: true, returning: false, id, page, origin, cover, el, source, at: Date.now() }
  emit()
}
export function closeLecture() {
  state = { ...state, open: false, returning: true }
  emit()
}
export function endReturn() {
  state = { ...state, returning: false }
  emit()
}
export const getViewerState = () => state
export function useViewer() {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => state)
}

const origins = new Map()
export function registerOrigin(id, fn) { origins.set(id, fn); return () => origins.delete(id) }
export function originFor(id) { return origins.get(id)?.() || null }
