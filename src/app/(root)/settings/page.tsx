import { DarkModeButton } from "@/components/DarkModeButton";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  children?: React.JSX.Element;
}

const Settings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      <div className="space-y-6">
        <SettingsRow
          title="Dark Mode"
          description="Toggle between light and dark theme"
        >
          <DarkModeButton />
        </SettingsRow>

        <SettingsRow
          title="Notifications"
          description="Manage your notification preferences"
        >
          <Button>Configure</Button>
        </SettingsRow>

        <SettingsRow
          title="Privacy"
          description="Control your privacy settings"
        >
          <Button>Manage</Button>
        </SettingsRow>

        <SettingsRow
          title="Account"
          description="View and update your account details"
        >
          <Button>Edit</Button>
        </SettingsRow>
      </div>
    </div>
  );
};

const SettingsRow = ({ title, description, children }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Settings;
