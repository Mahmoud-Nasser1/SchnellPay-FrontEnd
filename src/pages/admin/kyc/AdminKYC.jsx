import { useState, useEffect } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

// Sub-components
import { KYCCards } from "./components/KYCCards";
import { KYCStats } from "./components/KYCStats";

function AdminKYC() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      const res = await api.get("/kyc/stats");
      setStats(res.data.data);
    } catch (error) {
      console.error("Failed to fetch KYC stats");
    }
  };

  const fetchKYC = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/kyc?page=${page}&limit=5${statusFilter ? `&status=${statusFilter}` : ""}`);
      setRecords(res.data.data.records);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch KYC submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchKYC();
  }, [page, statusFilter]);

  const handleReview = async (kycId, action, reason = "") => {
    try {
      await api.patch(`/kyc/${kycId}`, { action, rejection_reason: reason });
      toast({
        title: action === "approve" ? "KYC Approved" : "KYC Rejected",
        description: `User has been notified via email and in-app notification.`,
      });
      fetchStats();
      fetchKYC();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Action failed",
        variant: "destructive",
      });
    }
  };

  const onReject = (kyc) => {
    const reason = window.prompt(`Enter rejection reason for ${kyc.f_name} ${kyc.l_name}:`);
    if (reason) {
      handleReview(kyc.KYC_ID, "reject", reason);
    }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeDown} custom={0} className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">KYC Approval</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and verify platform identity requests
          </p>
        </div>
        <div className="flex gap-2">
          {["", "pending", "approved", "rejected"].map((f) => (
            <Button
              key={f}
              variant={statusFilter === f ? "accent" : "ghost-muted"}
              size="sm"
              onClick={() => { setStatusFilter(f); setPage(1); }}
              className="capitalize"
            >
              {f || "All"}
            </Button>
          ))}
        </div>
      </motion.div>

      <KYCStats stats={stats} />

      <KYCCards 
        records={records} 
        loading={loading} 
        onApprove={(kyc) => handleReview(kyc.KYC_ID, "approve")}
        onReject={onReject}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm font-medium">Page {page} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages || loading}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default AdminKYC;
