import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { useMemo } from 'react';
import { useEformsContext } from '../../store';
import { getDesignTokens, getThemedComponents } from '../../styles';
import { ReactParent } from '../../types';

function BrandProvider({ children }: ReactParent) {
  const [state] = useEformsContext();
  const theme = useMemo(() => {
    const designTokens = getDesignTokens(state.theme);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, { components: getThemedComponents(newTheme) });
    console.log(newTheme);
    return newTheme;
  }, [state.theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default BrandProvider;
