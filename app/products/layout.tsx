import { ScrollProvider } from '../components/ScrollProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  )
}
