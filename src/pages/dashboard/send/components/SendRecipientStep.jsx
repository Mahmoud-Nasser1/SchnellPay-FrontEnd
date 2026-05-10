import { Search, ArrowRight, Shield, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function SendRecipientStep({ selected, setSelected, setStep }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ["users-search", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length < 3) return [];
      const res = await api.get(`/users/search?q=${debouncedSearch}`);
      const apiUsers = res.data?.data?.users || [];
      return apiUsers.map(u => ({
        id: u.user_name,
        name: u.full_name,
        username: u.user_name,
        verified: u.is_verified,
        avatar: (u.full_name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
      }));
    },
    enabled: debouncedSearch.length >= 3,
  });

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium text-foreground">Search recipient</Label>
        <div className="relative mt-1.5">
          <Search className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
            isFetching ? "text-accent animate-pulse" : "text-muted-foreground"
          )} />
          <Input 
            placeholder="Username or Name (min. 3 chars)" 
            className="h-11 pl-10" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isFetching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {search.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mb-3 text-sm font-medium text-muted-foreground">Search results</p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {isFetching ? (
                  // Skeleton Loaders
                  [1, 2, 3].map((i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex w-full items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-16 animate-pulse rounded bg-muted/50" />
                      </div>
                    </motion.div>
                  ))
                ) : searchResults?.length > 0 ? (
                  searchResults.map((user) => (
                    <motion.button
                      key={user.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelected(user)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                        selected?.username === user.username
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50 hover:bg-muted/50",
                      )}
                    >
                      <div className="gradient-card flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                        {user.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.name}
                          </p>
                          {user.verified && <Shield className="h-3 w-3 text-accent" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                      </div>
                      {selected?.username === user.username && (
                        <Check className="h-4 w-4 shrink-0 text-accent" />
                      )}
                    </motion.button>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-8 text-center"
                  >
                    <p className="text-sm text-muted-foreground">No users found for "{search}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="accent"
        size="lg"
        className="w-full shadow-glow py-6"
        disabled={!selected}
        onClick={() => setStep("amount")}
      >
        Continue <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
