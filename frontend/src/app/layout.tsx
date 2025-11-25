import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Promotions Favorites',
  description: 'Browse and manage your favorite promotions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}