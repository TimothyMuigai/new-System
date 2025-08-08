import {
  CalendarClock,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  PiggyBank,
  Receipt,
  Settings
} from "lucide-react";
import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: LayoutDashboard, color: "#4F46E5", href: "/" },
  { name: "Income", icon: DollarSign, color: "#10B981", href: "/income" },
  { name: "Expenses", icon: Receipt, color: "#F87171", href: "/expense" },
  { name: "Budget", icon: PiggyBank, color: "#F59E0B", href: "/budget" },
  { name: "Subscriptions", icon: CalendarClock, color: "#8B5CF6", href: "/subscription" },
  { name: "Settings", icon: Settings, color: "#ccc", href: "/settings" },
];

function Sidebar() {
  const { logoutUser } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed md:static top-0 left-0 z-40 transition-all duration-300 ease-in-out flex-shrink-0 h-full
        bg-gray-800 bg-opacity-50 backdrop-blur-md border-r border-gray-700`}
        animate={{
          width: isMobile
            ? isSidebarOpen
              ? 256 
              : 0
            : isSidebarOpen
            ? 256
            : 80, 
        }}
      >
        <div className="h-full p-4 flex flex-col">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>

          <AnimatePresence>
            {(!isMobile || isSidebarOpen) && (
              <motion.div
                className="flex flex-col flex-grow mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <nav className="flex-grow">
                  {SIDEBAR_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => isMobile && setSidebarOpen(false)}
                    >
                      <motion.div
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                      >
                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                        <AnimatePresence>
                          {isSidebarOpen && (
                            <motion.span
                              className="ml-4 whitespace-nowrap"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2, delay: 0.2 }}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </Link>
                  ))}
                </nav>

                <motion.div
                  className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  onClick={() => {
                    logoutUser();
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  <LogOut size={20} style={{ color: "#EF4444", minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;
