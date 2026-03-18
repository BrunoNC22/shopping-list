import type { PropsWithChildren } from "react"

export const Background = ({ children }: PropsWithChildren) => {
  return (
    <div 
      className="font-display"
      style={{
        backgroundImage: `url("/aurora-boreal2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        height: "100vh",
        overflowY: "auto"
      }}
    >
      {children}
    </div>
  )
}