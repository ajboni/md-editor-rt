import React, { createContext, useCallback, useState } from 'react';
import {
  useCatalog,
  useConfig,
  useErrorCatcher,
  useExpansion,
  useKeyBoard,
  useUploadImg
} from './hooks';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import { classnames } from './utils';
import { prefix, staticTextDefault, defaultProps, config } from './config';
import { ContentType, EditorProp, StaticProp, Themes } from './type';
import DropdownToolbar from './extensions/DropdownToolbar';
import NormalToolbar from './extensions/NormalToolbar';
import ModalToolbar from './extensions/ModalToolbar';
import MdCatalog from './extensions/MdCatalog';
import bus from './utils/event-bus';

import './styles/index.less';
import '@vavt/markdown-theme/css/all.css';

export const EditorContext = createContext<ContentType>({
  editorId: '',
  tabWidth: 2,
  theme: 'light',
  highlight: {
    css: '',
    js: ''
  },
  historyLength: 10,
  previewOnly: false,
  showCodeRowNumber: false,
  usedLanguageText: staticTextDefault['zh-CN'],
  previewTheme: 'default'
});

const Editor = (props: EditorProp) => {
  const {
    modelValue = defaultProps.modelValue,
    theme = defaultProps.theme as Themes,
    className = defaultProps.className,
    toolbars = defaultProps.toolbars,
    toolbarsExclude = defaultProps.toolbarsExclude,
    defToolbars = defaultProps.defToolbars,
    previewOnly = defaultProps.previewOnly,
    editorId = defaultProps.editorId,
    tabWidth = defaultProps.tabWidth,
    historyLength = defaultProps.historyLength,
    showCodeRowNumber = defaultProps.showCodeRowNumber,
    previewTheme = defaultProps.previewTheme,
    noPrettier = defaultProps.noPrettier,
    tableShape = defaultProps.tableShape as [number, number],
    noMermaid = defaultProps.noMermaid,
    noKatex = defaultProps.noKatex,
    placeholder = defaultProps.placeholder,
    onChange = defaultProps.onChange,
    onHtmlChanged = defaultProps.onHtmlChanged,
    onGetCatalog = defaultProps.onGetCatalog,
    sanitize = defaultProps.sanitize,
    onError = defaultProps.onError,
    markedHeadingId = defaultProps.markedHeadingId,
    footers = defaultProps.footers,
    defFooters = defaultProps.defFooters,
    noUploadImg = defaultProps.noUploadImg
  } = props;

  const [staticProps] = useState<StaticProp>(() => {
    return {
      previewOnly,
      editorId
    };
  });

  const [state, setState] = useState<{
    scrollAuto: boolean;
  }>(() => {
    return {
      scrollAuto: props.scrollAuto === undefined ? true : !!props.scrollAuto
    };
  });

  const onScrollAutoChange = useCallback(
    (v: boolean) => {
      setState((_state) => {
        return {
          ..._state,
          scrollAuto: v
        };
      });
    },
    [setState]
  );

  const wrapOnChange = useCallback(
    (value: string) => {
      // 可控组件，更新前保存选中位置
      bus.emit(staticProps.editorId, 'saveHistoryPos');
      onChange(value);
    },
    [onChange]
  );

  // 快捷键监听
  useKeyBoard(props, staticProps);
  // 扩展库引用
  useExpansion(props, staticProps);
  // 上传图片监控
  useUploadImg(props, staticProps);
  // 错误捕获
  useErrorCatcher(staticProps.editorId, onError);
  // 目录状态
  const { catalogShow, catalogStyle } = useCatalog(props, staticProps);
  // 部分配置重构
  const [highlight, usedLanguageText, setting, updateSetting] = useConfig(props);

  return (
    <EditorContext.Provider
      value={{
        editorId: staticProps.editorId,
        tabWidth,
        theme,
        highlight,
        historyLength,
        previewOnly: staticProps.previewOnly,
        showCodeRowNumber,
        usedLanguageText,
        previewTheme
      }}
    >
      <div
        id={staticProps.editorId}
        className={classnames([
          prefix,
          className,
          theme === 'dark' && `${prefix}-dark`,
          setting.fullscreen || setting.pageFullScreen ? `${prefix}-fullscreen` : '',
          staticProps.previewOnly && `${prefix}-previewOnly`
        ])}
        style={props.style}
      >
        {!staticProps.previewOnly && (
          <ToolBar
            noPrettier={noPrettier}
            toolbars={toolbars}
            toolbarsExclude={toolbarsExclude}
            setting={setting}
            updateSetting={updateSetting}
            tableShape={tableShape}
            defToolbars={defToolbars}
            noUploadImg={noUploadImg}
          />
        )}
        <Content
          value={modelValue}
          onChange={wrapOnChange}
          setting={setting}
          onHtmlChanged={onHtmlChanged}
          onGetCatalog={onGetCatalog}
          sanitize={sanitize}
          noMermaid={noMermaid}
          placeholder={placeholder}
          noKatex={noKatex}
          markedHeadingId={markedHeadingId}
          scrollAuto={state.scrollAuto}
          formatCopiedText={props.formatCopiedText}
        />
        {!staticProps.previewOnly && footers?.length > 0 && (
          <Footer
            modelValue={modelValue}
            footers={footers}
            defFooters={defFooters}
            scrollAuto={state.scrollAuto}
            onScrollAutoChange={onScrollAutoChange}
          />
        )}
        {catalogShow && (
          <MdCatalog
            theme={theme}
            style={catalogStyle}
            className={`${prefix}-catalog-editor`}
            editorId={staticProps.editorId}
            markedHeadingId={markedHeadingId}
          />
        )}
      </div>
    </EditorContext.Provider>
  );
};

Editor.DropdownToolbar = DropdownToolbar;
Editor.NormalToolbar = NormalToolbar;
Editor.MdCatalog = MdCatalog;
Editor.ModalToolbar = ModalToolbar;
Editor.config = config;
Editor.extension = {};

export * from './type';

export default Editor;
