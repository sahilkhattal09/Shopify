export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-xl font-bold mb-10">
          <img
            src="/Logo/Shopmart.png" // ← replace with your actual image path
            alt="sHOPMART LOGO logo"
            className="w-12 h-12 object-contain"
          />
          SHOPMART
        </div>

        <ul className="space-y-4">
          <li className="font-semibold text-blue-700">Dashboard</li>
          <li>Projects</li>
          <li>Task list</li>
          <li>Services</li>
          <li>
            Notifications <span className="ml-1 text-green-500">●</span>
          </li>
          <li>Chat</li>
        </ul>
      </div>
      <div className="text-sm">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="rounded-full mb-2"
        />
        Emily Jonson
        <br />
        <span className="text-gray-500">jonson@bress.com</span>
      </div>
    </aside>
  );
}
