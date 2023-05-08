import React, { useEffect, useState } from 'react';
import Header from './Header';
// import Preview from './Preview';
import PreviewOnly from './PreviewOnly';
import './style.less';

export type Theme = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );
  const [previewTheme, setPreviewTheme] = useState<string>(
    () => localStorage.getItem('previewTheme') || 'default'
  );
  const [codeTheme, setCodeTheme] = useState<string>(
    () => localStorage.getItem('codeTheme') || 'atom'
  );
  const [lang, setLang] = useState<'zh-CN' | 'en-US'>(
    () => (localStorage.getItem('lang') as 'zh-CN' | 'en-US') || 'zh-CN'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('previewTheme', previewTheme);
    localStorage.setItem('codeTheme', codeTheme);
    localStorage.setItem('lang', lang);
  }, [codeTheme, lang, previewTheme, theme]);

  return (
    <div className={['app', theme === 'dark' && 'theme-dark'].join(' ')}>
      <Header
        theme={theme}
        onChange={setTheme}
        onPreviewChange={setPreviewTheme}
        onCodeThemeChange={setCodeTheme}
        onLangChange={setLang}
      />
      <div className="page-body">
        {/* <Preview
          lang={lang}
          theme={theme}
          previewTheme={previewTheme}
          codeTheme={codeTheme}
        /> */}
        <PreviewOnly theme={theme} previewTheme={previewTheme} codeTheme={codeTheme} />
      </div>
    </div>
  );
}

export default App;
