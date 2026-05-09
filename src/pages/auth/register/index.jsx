import { useTheme } from "@/hooks/use-theme";
import RegisterForm from "./components/RegisterForm";
import RegisterSidebar from "./components/RegisterSidebar";

function RegisterPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-background">
      <RegisterSidebar />
      <RegisterForm theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export { RegisterPage as default };
