export function Footer() {
    return (
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-green-400 text-xl font-bold">Alpha</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-400">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  