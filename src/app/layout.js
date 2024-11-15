import * as React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { header, headers } from 'next/headers';

import '@/styles/global.css';

import { config } from '@/config';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsProvider } from '@/contexts/settings';
import { Analytics } from '@/components/core/analytics';
import { I18nProvider } from '@/components/core/i18n-provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { SettingsButton } from '@/components/core/settings/settings-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';
import ContextProvider from '@/context';

export const metadata = { title: config.site.name };

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: config.site.themeColor,
};

export default async function Layout({ children }) {
  const settings = applyDefaultSettings(await getPersistedSettings());
  const cookies = headers().get('cookie');

  return (
    <html lang={settings.language} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <Analytics>
          <LocalizationProvider>
            <UserProvider>
              <SettingsProvider settings={settings}>
                <I18nProvider lng={settings.language}>
                  <ThemeProvider>
                    <ContextProvider cookies={cookies}>
                     {children}
                    </ContextProvider>
                    <SettingsButton />
                    <Toaster position="bottom-right" />
                  </ThemeProvider>
                </I18nProvider>
              </SettingsProvider>
            </UserProvider>
          </LocalizationProvider>
        </Analytics>
      </body>
    </html>
  );
}
