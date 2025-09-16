'use client'

import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

function ShionlibHomeBtn({ onClick }: { onClick: () => void }) {
  const t = useTranslations('ShionlibHome')
  return <Button label={t('title')} onClick={onClick} size="small" />
}

export default function ShonlibPage() {
  const toast = useRef<Toast>(null)
  const showToast = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    })
  }
  return (
    <div className="container mx-auto my-4 space-y-6">
      <ShionlibHomeBtn onClick={showToast} />
      <Button label="Test" text className="primary" size="small" />
      <Toast ref={toast} />
    </div>
  )
}
