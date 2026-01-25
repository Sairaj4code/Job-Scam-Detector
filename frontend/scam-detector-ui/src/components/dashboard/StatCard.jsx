export default function StatCard({ icon: Icon, label, value, trend, color, bgColor }) {
  const colorClasses = {
    green: {
      icon: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/30",
      value: "text-green-600 dark:text-green-400",
      trend: "text-green-600 dark:text-green-400"
    },
    red: {
      icon: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/30",
      value: "text-red-600 dark:text-red-400",
      trend: "text-red-600 dark:text-red-400"
    },
    blue: {
      icon: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/30",
      value: "text-blue-600 dark:text-blue-400",
      trend: "text-blue-600 dark:text-blue-400"
    },
    orange: {
      icon: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/30",
      value: "text-orange-600 dark:text-orange-400",
      trend: "text-orange-600 dark:text-orange-400"
    },
    gray: {
      icon: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-100 dark:bg-gray-800",
      value: "text-gray-600 dark:text-gray-400",
      trend: "text-gray-600 dark:text-gray-400"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.trend}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className={`text-3xl font-bold ${colors.value}`}>{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}
