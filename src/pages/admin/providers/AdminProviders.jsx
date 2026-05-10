import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import api from "@/lib/api";

// Sub-components
import { ProvidersTable } from "./components/ProvidersTable";
import { ProviderModal } from "./components/ProviderModal";

function AdminProviders() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { toast } = useToast();

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/bills/admin/providers?page=${page}&limit=${limit}&search=${query}`);
      setList(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch providers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [page, query]); // Refetch when page or search query changes

  const startCreate = () => {
    setEditing({ provider_id: null, provider_name: "", provider_code: "", contact_mail: "", is_active: true });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.provider_name.trim() || !editing.provider_code.trim()) {
      toast({
        title: "Missing fields",
        description: "Name and code are required.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editing.contact_mail || !emailRegex.test(editing.contact_mail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid contact email.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaveLoading(true);
      const payload = {
        name: editing.provider_name,
        code: editing.provider_code,
        contact_email: editing.contact_mail,
        is_active: editing.is_active
      };

      if (editing.provider_id) {
        const response = await api.put(`/bills/admin/providers/${editing.provider_id}`, payload);
        setList((l) => l.map((p) => (p.provider_id === editing.provider_id ? response.data.data : p)));
        toast({ title: "Provider updated", description: editing.provider_name });
      } else {
        await api.post("/bills/admin/providers", payload);
        fetchProviders(); // Refresh list to show new provider with pagination
        toast({ title: "Provider added", description: editing.provider_name });
      }
      setOpen(false);
      setEditing(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save provider",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Are you sure you want to delete ${p.provider_name}?`)) return;
    try {
      await api.delete(`/bills/admin/providers/${p.provider_id}`);
      fetchProviders(); // Refresh list to adjust pagination
      toast({ title: "Provider deleted", description: p.provider_name });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete provider",
        variant: "destructive",
      });
    }
  };

  const toggle = async (p) => {
    const newStatus = !p.is_active;
    try {
      const payload = {
        name: p.provider_name,
        code: p.provider_code,
        contact_email: p.contact_mail,
        is_active: newStatus
      };
      await api.put(`/bills/admin/providers/${p.provider_id}`, payload);
      setList((l) => l.map((x) => (x.provider_id === p.provider_id ? { ...x, is_active: newStatus } : x)));
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
          <h1 className="font-display text-2xl font-bold text-foreground">Providers</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage payment and service providers</p>
        </div>
        <Button variant="accent" onClick={startCreate} className="shadow-glow">
          <Plus className="h-4 w-4" /> Add Provider
        </Button>
      </motion.div>

      <ProvidersTable 
        providers={list}
        loading={loading}
        query={query}
        setQuery={(q) => { setQuery(q); setPage(1); }} // Reset to page 1 on search
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
        onEdit={(p) => { setEditing(p); setOpen(true); }}
        onDelete={remove}
        onToggle={toggle}
      />

      <ProviderModal 
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
        setEditing={setEditing}
        onSave={save}
        loading={saveLoading}
      />
    </motion.div>
  );
}

export default AdminProviders;
