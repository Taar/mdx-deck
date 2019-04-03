import { useEffect } from 'react'
import { navigate } from '@reach/router'
import { modes } from './modes'

const keys = {
  p: 80,
  o: 79,
  g: 71,
  g: 78,
}

/*
const STORAGE_INDEX = 'mdx-slide'
const STORAGE_STEP = 'mdx-step'
*/

const inputElements = ['INPUT', 'TEXTAREA', 'A', 'BUTTON']

export default function useNavigation(history) {
  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault()

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
            history.push('/presenter')
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
      document.body.removeEventListener('keydown', handleKeyDown)
      //window.removeEventListener('storage', this.handleStorageChange)
    }
  })
}
