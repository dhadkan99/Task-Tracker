const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Task Tracker</h1>
          <nav className="space-x-6">
            <a
              href="/"
              className="text-gray-600 transition-colors hover:text-blue-500"
            >
              Home
            </a>
            {/* <a
              href="/login"
              className="text-gray-600 transition-colors hover:text-blue-500"
            >
              Login
            </a> */}
            <a
              href="/dash"
              className="text-gray-600 transition-colors hover:text-blue-500"
            >
              DashBoard
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
