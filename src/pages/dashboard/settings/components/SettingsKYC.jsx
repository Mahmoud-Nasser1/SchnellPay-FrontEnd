import { Check, Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import KycFileUpload from "./KycFileUpload";

export default function SettingsKYC({
  kycUploads,
  setKycUploads,
  kycSubmitting,
  kycSubmitted,
  handleKycSubmit,
}) {
  return (
    <div className="space-y-5">
      <div className="gradient-accent rounded-xl p-5 text-accent-foreground shadow-glow">
        <div className="mb-2 flex items-center gap-3">
          <Check className="h-6 w-6" />
          <h3 className="font-display text-lg font-bold">Identity Verified</h3>
        </div>
        <p className="text-sm text-accent-foreground/80">
          Your account is fully verified. You have full access to all features.
        </p>
      </div>
      {[
        { label: "Government ID", status: "Verified", date: "Jun 12, 2025" },
        { label: "Selfie / Liveness Check", status: "Verified", date: "Jun 12, 2025" },
        { label: "Address Proof", status: "Verified", date: "Jun 15, 2025" },
        { label: "Source of Funds", status: "Pending", date: "In review" },
      ].map(({ label, status, date }) => (
        <div
          key={label}
          className="flex items-center justify-between border-b border-border/50 py-3 last:border-0"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              status === "Verified" ? "badge-success" : "badge-warning",
            )}
          >
            {status}
          </span>
        </div>
      ))}
      {/* Upload National ID */}
      <div className="space-y-4 border-t border-border pt-4">
        <div>
          <h4 className="mb-1 font-display font-semibold text-foreground">
            Upload Identity Documents
          </h4>
          <p className="text-xs text-muted-foreground">
            Upload your National ID or Passport for verification. All files are
            encrypted and secure.
          </p>
        </div>
        <KycFileUpload
          label="National ID / Passport Photo (Front)"
          onUpload={(f) => setKycUploads((u) => ({ ...u, front: f }))}
        />
        <KycFileUpload
          label="National ID / Passport Photo (Back)"
          onUpload={(f) => setKycUploads((u) => ({ ...u, back: f }))}
        />
        <KycFileUpload
          label="Selfie with ID (Hold your ID next to your face)"
          onUpload={(f) => setKycUploads((u) => ({ ...u, selfie: f }))}
        />
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            All documents are encrypted with 256-bit SSL and never shared with third
            parties.
          </span>
        </div>
        {kycSubmitted ? (
          <div className="gradient-success flex items-center gap-3 rounded-xl p-4 text-accent-foreground shadow-glow">
            <Check className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Documents Submitted Successfully</p>
              <p className="text-xs text-accent-foreground/80">
                Review typically takes 24–48 hours.
              </p>
            </div>
          </div>
        ) : (
          <Button
            variant="accent"
            className="w-full shadow-glow"
            disabled={Object.keys(kycUploads).length === 0 || kycSubmitting}
            onClick={handleKycSubmit}
          >
            {kycSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                Submitting...
              </div>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Documents for Review
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
