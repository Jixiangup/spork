import {Box} from "@primer/react-brand";
import SettingsCard from "@/pages/settings/card.tsx";
import {useTranslation} from "react-i18next";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {getName} from "@tauri-apps/api/app";
import {Stack} from "@primer/react/experimental";
import {FormControl, Select} from "@primer/react";
import {ThemeMod, type ThemeMode} from "@/theme";
import {defaultSettings, Settings} from "@/stores/core.ts";
import {Api} from "@/api";
import {MoonIcon, SunIcon} from "@primer/octicons-react";

const Theme = () => {

  const [appName, setAppName] = useState<string>('Spork');
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const {t} = useTranslation('settings');

  const themeModes: ThemeMode[] = ['sync', 'single'];
  const syncThemeMods: ThemeMod[] = ['light', 'dark'];

  const renderThemeModeOptions = (mode: ThemeMode): ReactNode => {
    if (mode === 'sync') {
      return renderSyncThemeModeOptions();
    }
    return renderSingleThemeModeOptions();
  }

  const renderSingleThemeModeOptions = (): ReactNode => {
    return (
      <>Single Mode Options</>
    )
  }

  const renderSyncThemeModeOptions = (): ReactNode => {
    return (
      <Stack direction='horizontal' className='w-full'>
        {
          syncThemeMods.map((mod) => {
            return (
              <SettingsCard
                active={mod === 'dark'}
                icon={mod === 'light' ? <SunIcon /> : <MoonIcon />}
                className='w-[50%]'
                title={t(`theme_mod_${mod}`)}
                muted={mod === 'dark'}
                enableTitleBorder
                enableDescriptionBorder
              >
                这是内容
              </SettingsCard>
            );
          })
        }
      </Stack>
    );
  }

  const fetchAppName = useCallback(async () => {
    try {
      const name = await getName();
      setAppName(name);
    } catch (e) {
      console.error('Failed to fetch app name:', e);
    }
  }, []);

  const fetchAppSettings = useCallback(async () => {
    try {
      const fetchedSettings = await Api.getSettingsApi().settings();
      setSettings(fetchedSettings);
    } catch (e) {
      console.error('Failed to fetch settings:', e);
    }
  }, []);

  useEffect(() => {
    fetchAppName().then();
  }, [fetchAppName]);

  useEffect(() => {
    fetchAppSettings().then();
  }, [fetchAppSettings]);

  const renderThemeMode = (): ReactNode => {
    return (
      <Stack>
        <FormControl>
          <Stack padding={'none'} className={'w-full'}>
            <FormControl.Label>{t('theme_mode_label')}</FormControl.Label>
            <Select
              className={'w-1/6'}
              name='theme_mode'
              value={settings.theme.mode}
              onChange={async (e) => {
                const newMode = e.target.value as ThemeMode;
                const newSettings = {
                  ...settings,
                  theme: {
                    ...settings.theme,
                    mode: newMode,
                  },
                };
                try {
                  await Api.getSettingsApi().updateSettings(newSettings);
                } catch (e) {
                  console.error('Failed to update theme mode:', e);
                  return;
                }
                setSettings(newSettings);
              }}
            >
              {
                themeModes.map((mode) => (
                  <Select.Option key={mode} value={mode}>
                    {t(`theme_mode_${mode}_label`)}
                  </Select.Option>
                ))
              }
            </Select>
            {renderThemeModeOptions(settings.theme.mode)}
          </Stack>
        </FormControl>
      </Stack>
    )
  }

  return (
    <Box>
      <SettingsCard title={t('theme_title')}>
        <span>
          {t('theme_description', {appName})}
        </span>
        {renderThemeMode()}
      </SettingsCard>
    </Box>
  );
}

export default Theme;