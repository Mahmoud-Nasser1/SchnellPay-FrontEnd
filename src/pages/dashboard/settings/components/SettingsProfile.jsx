import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsProfile({
  emailNotif,
  setEmailNotif,
  smsNotif,
  setSmsNotif,
  saved,
  handleSave,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="gradient-card flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-primary-foreground shadow-navy">
          JD
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground">john@example.com</p>
          <div className="secure-badge mt-1 inline-flex">
            <Check className="h-3 w-3" /> KYC Verified
          </div>
        </div>
       
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "First Name", value: "John", placeholder: "First name" },
          { label: "Last Name", value: "Doe", placeholder: "Last name" },
          { label: "Email", value: "john@example.com", placeholder: "Email" },
          { label: "Phone", value: "+1 (555) 000-0001", placeholder: "Phone" },
        ].map(({ label, value, placeholder }) => (
          <div key={label}>
            <Label className="text-xs font-medium text-foreground">{label}</Label>
            <Input className="mt-1.5" defaultValue={value} placeholder={placeholder} />
          </div>
        ))}
      </div>
    
      <Button variant="accent" className="shadow-glow" onClick={handleSave}>
        {saved ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Saved!
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
