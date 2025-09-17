const startContent = () => {
  return (
    <div className="flex items-center w-32">
      <img className="w-full h-full" src="/assets/shionlib-logo.png" alt="Shionlib Logo" />
    </div>
  )
}

const endContent = () => {
  return <div className="max-h-full">{/* <ThemeSwitcher /> */}</div>
}

const ShionlibTopBar = () => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-3 h-16"></div>
  )
}
export default ShionlibTopBar
