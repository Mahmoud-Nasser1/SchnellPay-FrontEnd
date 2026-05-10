import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Sub-components
import { StatsCards } from "./components/StatsCards";
import { OverviewCharts } from "./components/OverviewCharts";
import { RecentRegistrations } from "./components/RecentRegistrations";

function AdminOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setData(response.data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard statistics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const { stats, chartData, recentUsers } = data;

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeDown} custom={0}>
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform health and key metrics at a glance
        </p>
      </motion.div>

      <StatsCards stats={stats} />
      
      <OverviewCharts chartData={chartData} />

      <RecentRegistrations users={recentUsers} />
    </motion.div>
  );
}

export default AdminOverview;
