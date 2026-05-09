import { useState } from "react";
import { Search, Filter, Check, X, Eye, AlertCircle, UserX, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeDown, stagger } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
const initialUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    country: "US",
    joined: "Jul 1, 2025",
    status: "active",
    kyc: "verified",
    balance: "$12,450",
    role: "user",
  },
  {
    id: 2,
    name: "Carlos Rivera",
    email: "carlos@example.com",
    country: "MX",
    joined: "Jul 2, 2025",
    status: "active",
    kyc: "pending",
    balance: "$3,200",
    role: "user",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    country: "UK",
    joined: "Jul 3, 2025",
    status: "suspended",
    kyc: "rejected",
    balance: "$0",
    role: "user",
  },
  {
    id: 4,
    name: "Aarav Patel",
    email: "aarav@example.com",
    country: "IN",
    joined: "Jul 4, 2025",
    status: "active",
    kyc: "verified",
    balance: "$8,900",
    role: "user",
  },
  {
    id: 5,
    name: "Liu Wei",
    email: "liu@example.com",
    country: "CN",
    joined: "Jul 5, 2025",
    status: "active",
    kyc: "pending",
    balance: "$5,670",
    role: "user",
  },
  {
    id: 6,
    name: "Ana Sousa",
    email: "ana@example.com",
    country: "BR",
    joined: "Jul 6, 2025",
    status: "active",
    kyc: "verified",
    balance: "$22,100",
    role: "admin",
  },
];
function ViewModal({ user, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lifted"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">User Details</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-muted/50 p-4">
          <div className="gradient-card flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-primary-foreground">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-1 flex gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                  user.status === "active" ? "badge-success" : "badge-danger",
                )}
              >
                {user.status}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                  user.kyc === "verified"
                    ? "badge-success"
                    : user.kyc === "pending"
                      ? "badge-warning"
                      : "badge-danger",
                )}
              >
                {user.kyc} KYC
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            ["Country", user.country],
            ["Joined", user.joined],
            ["Balance", user.balance],
            ["Role", user.role],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between border-b border-border/50 py-2 last:border-0"
            >
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-sm font-semibold capitalize text-foreground">{v}</span>
            </div>
          ))}
        </div>
        <Button variant="accent" className="mt-5 w-full shadow-glow" onClick={onClose}>
          Close
        </Button>
      </motion.div>
    </motion.div>
  );
}
function ConfirmModal({ title, desc, onConfirm, onClose, variant = "destructive" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-lifted"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full",
            variant === "destructive" ? "bg-destructive/10" : "bg-accent/10",
          )}
        >
          {variant === "destructive" ? (
            <AlertCircle className="h-7 w-7 text-destructive" />
          ) : (
            <Check className="h-7 w-7 text-accent" />
          )}
        </div>
        <h3 className="mb-2 font-display font-bold text-foreground">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{desc}</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "accent"}
            className="flex-1"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const { toast } = useToast();
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );
  const handleAction = (type, user) => {
    if (type === "view") {
      setViewUser(user);
      return;
    }
    setConfirmAction({ type, user });
  };
  const executeAction = () => {
    if (!confirmAction) return;
    const { type, user } = confirmAction;
    setUsers((prev) =>
      prev
        .map((u) => {
          if (u.id !== user.id) return u;
          if (type === "suspend")
            return { ...u, status: u.status === "suspended" ? "active" : "suspended" };
          return u;
        })
        .filter((u) => !(type === "delete" && u.id === user.id)),
    );
    toast({
      title:
        type === "suspend"
          ? user.status === "suspended"
            ? "User activated"
            : "User suspended"
          : "User deleted",
      description: `${user.name} has been ${type === "delete" ? "removed" : type === "suspend" && user.status === "suspended" ? "reactivated" : "suspended"}.`,
    });
    setConfirmAction(null);
  };
  return (
    <>
      <AnimatePresence>
        {viewUser && <ViewModal user={viewUser} onClose={() => setViewUser(null)} />}
        {confirmAction && (
          <ConfirmModal
            title={
              confirmAction.type === "delete"
                ? "Delete User"
                : confirmAction.user.status === "suspended"
                  ? "Reactivate User"
                  : "Suspend User"
            }
            desc={
              confirmAction.type === "delete"
                ? `Are you sure you want to permanently delete ${confirmAction.user.name}? This cannot be undone.`
                : confirmAction.user.status === "suspended"
                  ? `Reactivate ${confirmAction.user.name}'s account?`
                  : `Suspend ${confirmAction.user.name}'s account? They won't be able to log in.`
            }
            variant={
              confirmAction.type === "delete"
                ? "destructive"
                : confirmAction.user.status === "suspended"
                  ? "accent"
                  : "destructive"
            }
            onConfirm={executeAction}
            onClose={() => setConfirmAction(null)}
          />
        )}
      </AnimatePresence>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={fadeDown} custom={0} className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Users Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">{users.length} total users</p>
          </div>
          <Button variant="accent" size="sm" className="shadow-glow">
            Export CSV
          </Button>
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={1}
          className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["User", "Country", "Joined", "Balance", "KYC", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="gradient-card flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-primary-foreground">
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.country}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.joined}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{u.balance}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          u.kyc === "verified"
                            ? "badge-success"
                            : u.kyc === "pending"
                              ? "badge-warning"
                              : "badge-danger",
                        )}
                      >
                        {u.kyc}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          u.status === "active" ? "badge-success" : "badge-danger",
                        )}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAction("view", u)}
                          title="View Details"
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleAction("suspend", u)}
                          title={u.status === "suspended" ? "Reactivate" : "Suspend"}
                          className={cn(
                            "rounded-lg p-1.5 transition-colors",
                            u.status === "suspended"
                              ? "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                              : "text-muted-foreground hover:bg-warning/10 hover:text-warning",
                          )}
                        >
                          {u.status === "suspended" ? (
                            <UserCheck className="h-3.5 w-3.5" />
                          ) : (
                            <UserX className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleAction("delete", u)}
                          title="Delete User"
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              <p className="font-medium">No users found</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
export { AdminUsers as default };
