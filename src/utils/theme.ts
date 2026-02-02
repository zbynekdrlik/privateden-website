import themeData from "../content/settings/theme.json";

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  background: string;
  backgroundAlt: string;
  headerBackground: string;
  text: string;
  textLight: string;
  textMuted: string;
}

export function getThemeColors(): ThemeColors {
  return themeData.colors;
}

export function generateCSSVariables(): string {
  const c = themeData.colors;
  return `
    :root {
      --color-primary: ${c.primary};
      --color-primary-light: ${c.primaryLight};
      --color-primary-dark: ${c.primaryDark};
      --color-accent: ${c.accent};
      --color-accent-light: ${c.accentLight};
      --color-accent-dark: ${c.accentDark};
      --color-background: ${c.background};
      --color-background-alt: ${c.backgroundAlt};
      --color-header-bg: ${c.headerBackground};
      --color-text: ${c.text};
      --color-text-light: ${c.textLight};
      --color-text-muted: ${c.textMuted};
    }
  `;
}
