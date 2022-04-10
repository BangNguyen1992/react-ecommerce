import { useEffect, useState } from 'react'

export default function useSnackbar() {
  const [isActive, setIsActive] = useState(false)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(3000)

  useEffect(() => {
    let willCloseSnackbar
    if (isActive) {
      willCloseSnackbar = setTimeout(() => setIsActive(false), duration)
    }
    return () => {
      clearTimeout(willCloseSnackbar)
    }
  }, [isActive, duration])

  function openSnackbar(msg: string, dur = 3000) {
    setMessage(msg)
    setDuration(dur)
    setIsActive(true)
  }

  function closeSnackbar() {
    setIsActive(false)
  }

  return { isActive, message, openSnackbar, closeSnackbar }
}
