import { useEffect, useState } from 'react'

export default function useIndex(history, url, pathname, initialIndex) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(
    function pushHistory() {
      console.log('useIndex pre new url', url, index)
      const base = url === '/' ? '' : url
      const newPath = `${base}/${index}`
      // Only push to history if the url has changed
      if (newPath === pathname) {
        return
      }
      console.log('Setting new path', newPath)
      history.push(newPath)
    },
    [history, url, pathname, index]
  )

  return [index, setIndex]
}
