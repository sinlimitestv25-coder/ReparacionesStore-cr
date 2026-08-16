import { useAuth } from '../../context/AuthContext'
import { useTenant } from '../../context/TenantContext'
import { Card } from '../../components/ui/Card'
import { SettingsForm } from '../../components/SettingsForm'

export function Settings() {
  const { changePassword } = useAuth()
  const { store, updateStore } = useTenant()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-500">Marca, políticas de recibo y tu contraseña.</p>
      </div>

      <Card className="max-w-2xl">
        <SettingsForm
          logoDataUrl={store.logoDataUrl}
          bannerDataUrl={store.bannerDataUrl}
          onLogoChange={(logoDataUrl) => updateStore({ logoDataUrl })}
          onBannerChange={(bannerDataUrl) => updateStore({ bannerDataUrl })}
          intakeTerms={store.intakeTerms}
          onIntakeTermsChange={(intakeTerms) => updateStore({ intakeTerms })}
          repairTerms={store.repairTerms}
          onRepairTermsChange={(repairTerms) => updateStore({ repairTerms })}
          onChangePassword={changePassword}
        />
      </Card>
    </div>
  )
}
