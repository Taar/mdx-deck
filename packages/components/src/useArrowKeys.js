import { useEffect } from 'react'

const keys = {
  right: 39,
  left: 37,
  space: 32,
}

const inputElements = ['INPUT', 'TEXTAREA', 'A', 'BUTTON']

export default function useArrowKeys(next, previous) {
  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault()

      const { keyCode, metaKey, ctrlKey, altKey } = e
      const { activeElement } = document

      if (inputElements.includes(activeElement.tagName)) {
        return
      }

      if (metaKey || ctrlKey || altKey) return

      switch (keyCode) {
        case keys.left:
          previous()
          break
        case keys.right:
        case keys.space:
          next()
          break
      }
    }

    document.body.addEventListener('keydown', handleKeyDown)

    return function cleanUp() {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  })
}
