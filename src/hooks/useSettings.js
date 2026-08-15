import { useState } from 'react'
import { getSettings, updateSettings } from '../lib/db'

export function useSettings() {
  const [settings, setSettings] = useState(() => getSettings())

  const update = (patch) => {
    const updated = updateSettings(patch)
    setSettings(updated)
    return updated
  }

  return { settings, update }
}
