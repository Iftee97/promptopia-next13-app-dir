import "@/styles/globals.css"

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        {children}
      </body>
    </html>
  )
}
