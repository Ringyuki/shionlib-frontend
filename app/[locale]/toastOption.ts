import { ToasterProps } from 'react-hot-toast'

export const toastOptions: ToasterProps['toastOptions'] = {
  success: {
    iconTheme: {
      primary: 'var(--toast-text-success)',
      secondary: 'var(--toast-bg-success)',
    },
    style: {
      background: 'var(--toast-bg-success)',
      color: 'var(--toast-text-success)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--toast-text-destructive)',
      secondary: 'var(--toast-bg-destructive)',
    },
    style: {
      background: 'var(--toast-bg-destructive)',
      color: 'var(--toast-text-destructive)',
    },
  },
}

export const toastProps: ToasterProps = {
  toastOptions: toastOptions,
  containerClassName:
    'break-all [body[data-scroll-locked]_&]:pr-[var(--removed-body-scroll-bar-size,0px)] scroll-adjust',
  containerStyle: { paddingRight: 'var(--removed-body-scroll-bar-size, 0px)' },
}
