import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { renderCard } from './card-texture'

/* Synchronously creates CanvasTextures (so the first render already has maps),
   then upgrades them when the optional raster images finish loading. */
export function useCardTextures(items, kind, { mirror = false } = {}) {
  const made = useMemo(() => items.map((it) => renderCard(it, { kind })), [items, kind])
  const textures = useMemo(
    () =>
      made.map((m) => {
        const t = new THREE.CanvasTexture(m.canvas)
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 4
        t.minFilter = THREE.LinearMipmapLinearFilter
        if (mirror) { t.wrapS = THREE.RepeatWrapping; t.repeat.x = -1; t.offset.x = 1 }
        return t
      }),
    [made, mirror],
  )
  useEffect(() => {
    let alive = true
    made.forEach((m, i) => m.ready.then(() => { if (alive) textures[i].needsUpdate = true }))
    return () => { alive = false; textures.forEach((t) => t.dispose()) }
  }, [made, textures])
  return textures
}
