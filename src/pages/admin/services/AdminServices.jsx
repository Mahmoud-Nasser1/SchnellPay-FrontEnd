import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import api from "@/lib/api";

// Sub-components
import { ServicesTable } from "./components/ServicesTable";
import { ServiceModal } from "./components/ServiceModal";

const CATEGORIES = ["Payments", "Bills", "Airtime", "Transfers", "Crypto"];

function AdminServices() {
  const [list, setList] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both services and providers (for the modal dropdown)
      const [servicesRes, providersRes] = await Promise.all([
        api.get(`/bills/admin/services?page=${page}&limit=${limit}&search=${query}`),
        api.get("/bills/admin/providers?limit=100") // Get all providers for selection
      ]);
      
      setList(servicesRes.data.data);
      setTotal(servicesRes.data.total);
      setProviders(providersRes.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, query]);

  const startCreate = () => {
    setEditing({ 
      service_id: null, 
      service_name: "", 
      service_category: "Payments", 
      provider_id: providers[0]?.provider_id || null, 
      fee: 0, 
      is_active: true 
    });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.service_name.trim()) {
      toast({ title: "Missing name", description: "Service name is required.", variant: "destructive" });
      return;
    }
    if (!editing.provider_id) {
      toast({ title: "Missing provider", description: "Please select a provider.", variant: "destructive" });
      return;
    }

    try {
      setSaveLoading(true);
      const payload = {
        provider_id: editing.provider_id,
        service_name: editing.service_name,
        category: editing.service_category,
        fee: editing.fee,
        is_active: editing.is_active
      };

      if (editing.service_id) {
        const response = await api.put(`/bills/admin/services/${editing.service_id}`, payload);
        // Refresh list to show joined provider name correctly
        fetchData();
        toast({ title: "Service updated", description: editing.service_name });
      } else {
        await api.post("/bills/admin/services", payload);
        fetchData();
        toast({ title: "Service added", description: editing.service_name });
      }
      setOpen(false);
      setEditing(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save service",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const remove = async (s) => {
    if (!window.confirm(`Are you sure you want to delete ${s.service_name}?`)) return;
    try {
      await api.delete(`/bills/admin/services/${s.service_id}`);
      fetchData();
      toast({ title: "Service deleted", description: s.service_name });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const toggle = async (s) => {
    const newStatus = !s.is_active;
    try {
      const payload = {
        provider_id: s.provider_id,
        service_name: s.service_name,
        category: s.service_category,
        fee: s.fee,
        is_active: newStatus
      };
      await api.put(`/bills/admin/services/${s.service_id}`, payload);
      setList((l) => l.map((x) => (x.service_id === s.service_id ? { ...x, is_active: newStatus } : x)));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={fadeDown}
        custom={0}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">Configure offered services and platform fees</p>
        </div>
        <Button variant="accent" onClick={startCreate} className="shadow-glow">
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </motion.div>

      <ServicesTable 
        services={list}
        loading={loading}
        query={query}
        setQuery={(q) => { setQuery(q); setPage(1); }}
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
        onEdit={(s) => { setEditing(s); setOpen(true); }}
        onDelete={remove}
        onToggle={toggle}
      />

      <ServiceModal 
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
        setEditing={setEditing}
        onSave={save}
        loading={saveLoading}
        providers={providers}
        categories={CATEGORIES}
      />
    </motion.div>
  );
}

export default AdminServices;
