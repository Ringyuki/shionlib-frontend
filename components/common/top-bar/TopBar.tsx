import ThemeSwitcher from '@/components/common/top-bar/ThemeSwitcher'
import { LoginOrRegisteDialog } from '@/components/common/user/LoginOrRegisteDialog'

const startContent = () => {
  return (
    <div className="flex items-center w-32">
      <img className="w-full h-full" src="/assets/images/shionlib-logo.png" alt="Shionlib Logo" />
    </div>
  )
}

const endContent = () => {
  return (
    <div className="max-h-full flex items-center gap-2">
      <ThemeSwitcher />
      <LoginOrRegisteDialog />
    </div>
  )
}

const ShionlibTopBar = () => {
  return (
    <div className="fixed top-4 left-1/2 rounded-xl -translate-x-1/2 z-50 w-full max-w-7xl px-3 h-16 flex items-center justify-between dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.05)] backdrop-blur-lg">
      {startContent()}
      {endContent()}
    </div>
  )
}
export default ShionlibTopBar
