import './styles/global.sass'

export const metadata = {
  title: 'Calculator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
