const envVarsNames = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const

type EnvVarName = (typeof envVarsNames)[number]

type EnvVars = Record<EnvVarName, string>

const makeEnvVars = (): EnvVars => {
  const result = {} as EnvVars
  const notFoundEnvVars: EnvVarName[] = []
  for (const envName of envVarsNames) {
    const value = import.meta.env[envName]
    if (value) {
      result[envName] = value
    } else {
      notFoundEnvVars.push(envName)
    }
  }

  if (notFoundEnvVars.length > 0) {
    throw new Error(`Some env variables are not defined: ${notFoundEnvVars.join(',')}.`)
  }

  return result
}

export const envVars: EnvVars = makeEnvVars()
