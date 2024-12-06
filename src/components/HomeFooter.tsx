export default function Footer() {
  return (
    <footer className="bg-blue-900 py-10 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-bold">Address</h3>
          <p>123 Crypto St, Finexo City</p>
          <p>Email: demo@example.com</p>
        </div>
        <div>
          <h3 className="font-bold">Links</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Subscribe</h3>
          <input
            type="email"
            className="mt-2 w-full rounded p-2 text-gray-800"
            placeholder="Enter email"
          />
          <button className="mt-4 rounded bg-blue-600 px-6 py-2 hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}
