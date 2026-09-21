export function LogoMark({ className = '' }) {
  return <img className={`logo-mark ${className}`} src="/my%20logo.png" alt="Ire logo" />
}

export function LogoLockup({ className = '' }) {
  return (
    <div className={`logo-lockup ${className}`} aria-label="Ireoluwatomiwa Akande">
      <LogoMark />
      <div className="logo-wordmark">
        <strong>IREOLUWATOMIWA</strong>
        <strong>AKANDE</strong>
        <span>SHE IS ALL SHE THINKS SHE IS AND MORE</span>
      </div>
    </div>
  )
}