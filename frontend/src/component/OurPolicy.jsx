const handleSubmit = (e) => {
  e.preventDefault()
}
const OurPolicy = () => {

  return (
    <footer className="bg-gray-50 text-gray-600 px-20 py-12 border-t border-gray-200">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-gray-900 text-2xl font-bold mb-3">ekart</h2>
          <p className="text-sm mb-2 text-gray-500">
          Best Quality Cloths And Others Products.
          </p>
          <p className="text-sm">123 Cloths, Style & Fashion</p>
          <p className="text-sm">Email: support@ekart.com</p>
          <p className="text-sm">Phone: (+91) 9045269598</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-900 hover:underline cursor-pointer transition-all">Contact Us</li>
            <li className="hover:text-gray-900 hover:underline cursor-pointer transition-all">Shipping & Returns</li>
            <li className="hover:text-gray-900 hover:underline cursor-pointer transition-all">FAQs</li>
            <li className="hover:text-gray-900 hover:underline cursor-pointer transition-all">Order Tracking</li>
            <li className="hover:text-gray-900 hover:underline cursor-pointer transition-all">Size Guide</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer hover:text-gray-900 text-gray-500 transition-all">f</span>
            <span className="cursor-pointer hover:text-gray-900 text-gray-500 transition-all">📷</span>
            <span className="cursor-pointer hover:text-gray-900 text-gray-500 transition-all">🐦</span>
            <span className="cursor-pointer hover:text-gray-900 text-gray-500 transition-all">📌</span>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">
            Stay in the Loop
          </h3>
          <p className="text-sm mb-4 text-gray-500">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form className="flex gap-2" onClick={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 text-sm outline-none w-full" required
            />
            <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md text-sm transition-all">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500">
        © 2026 <span className="text-gray-900 font-medium">ekart</span>. All rights reserved
      </div>

    </footer>
  );
};

export default OurPolicy;