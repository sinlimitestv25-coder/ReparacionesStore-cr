import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../hooks/useSettings'
import { Card } from '../../components/ui/Card'
import { SettingsForm } from '../../components/SettingsForm'

export function AdminSettings() {
  const { changePassword } = useAuth()
  const { settings, update: updateSettings } = useSettings()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-500">Marca del panel general y tu contraseña.</p>
      </div>

      <Card className="max-w-2xl">
        <SettingsForm
          logoDataUrl={settings.logoDataUrl}
          bannerDataUrl={settings.bannerDataUrl}
          onLogoChange={(logoDataUrl) => updateSettings({ logoDataUrl })}
          onBannerChange={(bannerDataUrl) => updateSettings({ bannerDataUrl })}
          loginImageDataUrl={settings.loginImageDataUrl}
          onLoginImageChange={(loginImageDataUrl) => updateSettings({ loginImageDataUrl })}
          onAdminPinChange={(adminPin) => updateSettings({ adminPin })}
          onChangePassword={changePassword}
        />
      </Card>
    </div>
  )
}
