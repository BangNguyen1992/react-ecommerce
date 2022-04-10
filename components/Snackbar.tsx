import React from 'react'
import styled, { css } from 'styled-components'
import useSnackbar from '../lib/custom-hooks/useSnackbar'

interface Props {
  isActive: boolean
  message: string
  onClick: () => void
}

const StyledSnackbar = styled.div`
  position: fixed;
  z-index: 999;
  font-size: 2rem !important;
  min-width: 25rem;
  visibility: hidden;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  background-color: var(--red) !important;
  bottom: 1rem;

  ${({ isActive }: { isActive: Props['isActive'] }) => {
    return isActive
      ? css`
          visibility: visible;
          transition: 0.3s ease-in-out;
          right: 1rem;
        `
      : css`
          visibility: hidden;
          opacity: 0;
          right: 1rem;
          transition: visibility 0s linear 300ms, opacity 300ms;
        `
  }}
`

export default function Snackbar({ isActive, message, onClick }: Props) {
  return (
    <StyledSnackbar onClick={() => onClick()} isActive={isActive}>
      {message}
    </StyledSnackbar>
  )
}
