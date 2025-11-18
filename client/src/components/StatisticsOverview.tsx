import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Ticket } from "@shared/schema";

export function StatisticsOverview() {
  const { tickets } = useAppSelector((state) => state.tickets);
  
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t: Ticket) => t.status === "pending").length;
  const activeTickets = tickets.filter((t: Ticket) => t.status === "in-progress").length;
  const completedTickets = tickets.filter((t: Ticket) => t.status === "completed").length;
  
  const configuredPercentage = totalTickets > 0 ? 100 : 0;
  const activePercentage = totalTickets > 0 ? Math.round((activeTickets / totalTickets) * 100) : 0;
  const healthPercentage = totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;

  const stats = [
    {
      icon: CheckCircle,
      label: "Total Presets",
      value: totalTickets,
      subValue: `${configuredPercentage}% configured`,
      subText: totalTickets === 0 ? "No tickets yet" : "Fully configured",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      icon: AlertCircle,
      label: "Open Alerts",
      value: openTickets,
      subValue: openTickets > 0 ? "Requires immediate action" : "All clear",
      subText: "",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      icon: Activity,
      label: "Active Presets",
      value: activeTickets,
      subValue: `${activePercentage}% active`,
      subText: "Monitoring in progress",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      icon: TrendingUp,
      label: "Total Alerts",
      value: totalTickets,
      subValue: "Across all systems",
      subText: "",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold" data-testid="text-overview-title">
          Alert Dashboard Overview
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs font-medium text-foreground mt-0.5">
                {stat.subValue}
              </div>
              {stat.subText && (
                <div className="text-xs text-muted-foreground">
                  {stat.subText}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-xs text-muted-foreground">System Health</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16">
                <svg className="transform -rotate-90" width="64" height="64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(healthPercentage / 100) * 175.93} 175.93`}
                    className="text-green-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{healthPercentage}%</span>
                </div>
              </div>
              <div className="text-xs">
                <div className="font-medium text-foreground">
                  {completedTickets} of {totalTickets}
                </div>
                <div className="text-muted-foreground">systems online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
