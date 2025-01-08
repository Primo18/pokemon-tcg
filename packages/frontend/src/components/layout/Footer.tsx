export function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>Pokémon TCG Explorer &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
