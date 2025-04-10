import { MapPin, Globe, Building, Map, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingAddressCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-2 mb-4">
        <MapPin size={18} className="text-indigo-500" />
        <h2 className="font-semibold text-gray-800">Shipping Address</h2>
      </div>

      <div className="ml-6 pl-4 border-l-2 border-indigo-100 space-y-3 text-gray-700">
        {/* Country */}
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-indigo-400" />
          <p className="font-medium">{order.address.country}</p>
        </div>

        {/* State/Province */}
        <div className="flex items-center space-x-2">
          <Building size={16} className="text-indigo-400" />
          <p className="text-gray-600">{order.address.state}</p>
        </div>

        {/* City */}
        <div className="flex items-center space-x-2">
          <Map size={16} className="text-indigo-400" />
          <p className="text-gray-600">{order.address.city}</p>
        </div>

        {/* ZIP/Postal Code */}
        <div className="flex items-center space-x-2">
          <Mail size={16} className="text-indigo-400" />
          <p className="text-gray-600">{order.address.zip}</p>
        </div>

        {/* Street */}
        <div className="flex items-center space-x-2">
          <MapPin size={28} className="text-indigo-400" />
          <p className="text-gray-600">{order.address.street}</p>
        </div>
      </div>
    </motion.div>
  );
}
