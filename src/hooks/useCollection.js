import { useCallback, useState } from 'react'
import { getCollection, createItem, updateItem, removeItem } from '../lib/db'

// Hook genérico para leer/crear/editar/borrar una colección de la "base" demo,
// opcionalmente filtrada (por ejemplo, por storeId).
export function useCollection(collectionName, filterFn) {
  const [items, setItems] = useState(() => {
    const all = getCollection(collectionName)
    return filterFn ? all.filter(filterFn) : all
  })

  const reload = useCallback(() => {
    const all = getCollection(collectionName)
    setItems(filterFn ? all.filter(filterFn) : all)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])

  const create = useCallback(
    (item) => {
      const created = createItem(collectionName, item)
      reload()
      return created
    },
    [collectionName, reload]
  )

  const update = useCallback(
    (id, patch) => {
      const updated = updateItem(collectionName, id, patch)
      reload()
      return updated
    },
    [collectionName, reload]
  )

  const remove = useCallback(
    (id) => {
      removeItem(collectionName, id)
      reload()
    },
    [collectionName, reload]
  )

  return { items, reload, create, update, remove }
}
