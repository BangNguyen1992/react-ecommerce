import { useEffect, useState } from 'react'

export default function useSnackbar() {
  const [isActive, setIsActive] = useState(false)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(3000)

  useEffect(() => {
    if (isActive)
      setTimeout(() => {
        setIsActive(false)
      }, duration)
  }, [isActive, duration])

  function openSnackbar(msg: string, dur = 30000) {
    setMessage(msg)
    setDuration(dur)
    setIsActive(true)
  }

  function closeSnackbar() {
    setIsActive(false)
  }

  return { isActive, message, openSnackbar, closeSnackbar }
}
