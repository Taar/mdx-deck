import { useEffect } from 'react'
import { navigate } from '@reach/router'
import { modes } from './modes'

const keys = {
  p: 80,
  o: 79,
  g: 71,
  n: 78,
}

/*
const STORAGE_INDEX = 'mdx-slide'
const STORAGE_STEP = 'mdx-step'
*/

const inputElements = ['INPUT', 'TEXTAREA', 'A', 'BUTTON']

export default function useNavigation(history, location) {
  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault()
      console.log('Location', location)

      const { keyCode, metaKey, ctrlKey, altKey, shiftKey } = e
      const { activeElement } = document

      if (inputElements.includes(activeElement.tagName)) {
        return
      }

      if (metaKey || ctrlKey) return
      const alt = altKey && !shiftKey

      if (keyCode === keys.p && shiftKey && altKey) {
        history.push('/print')
        return
      }

      if (alt) {
        switch (keyCode) {
          case keys.p:
            const pathIndex = location.pathname.split('/')[1]
            const initialIndex =
              pathIndex != null && pathIndex.length !== 0
                ? parseInt(pathIndex)
                : 0
            history.push(`/presenter/${initialIndex}`)
            break
          case keys.o:
            history.push('/overview')
            break
          case keys.g:
            history.push('/grid')
            break
          case keys.n:
            history.push('/')
            break
        }
      }
    }

    document.body.addEventListener('keydown', handleKeyDown)
    //window.addEventListener('storage', this.handleStorageChange)

    return function cleanUp() {
      console.log('Cleaning up Navigation ...')
      document.body.removeEventListener('keydown', handleKeyDown)
      //window.removeEventListener('storage', this.handleStorageChange)
    }
  }, [history, location])
}
