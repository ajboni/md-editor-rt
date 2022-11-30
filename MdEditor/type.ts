import { CSSProperties, ReactElement } from 'react';
import type { marked, Renderer, Slugger } from 'marked';

declare global {
  interface Window {
    hljs: any;
    prettier: any;
    prettierPlugins: any;
    Cropper: any;
    screenfull: any;
    mermaid: any;
    katex: any;
  }
}

export interface ToolbarTips {
  bold?: string;
  underline?: string;
  italic?: string;
  strikeThrough?: string;
  title?: string;
  sub?: string;
  sup?: string;
  quote?: string;
  unorderedList?: string;
  orderedList?: string;
  task?: string;
  codeRow?: string;
  code?: string;
  link?: string;
  image?: string;
  table?: string;
  mermaid?: string;
  katex?: string;
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  catalog?: string;
  preview?: string;
  htmlPreview?: string;
  github?: string;
  '-'?: string;
  '='?: string;
}

export interface StaticTextDefaultValue {
  toolbarTips?: ToolbarTips;
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  linkModalTips?: {
    linkTitle?: string;
    imageTitle?: string;
    descLabel?: string;
    descLabelPlaceHolder?: string;
    urlLabel?: string;
    urlLabelPlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    successTips?: string;
    failTips?: string;
  };
  mermaid?: {
    // 流程图
    flow?: string;
    // 时序图
    sequence?: string;
    // 甘特图
    gantt?: string;
    // 类图
    class?: string;
    // 状态图
    state?: string;
    // 饼图
    pie?: string;
    // 关系图
    relationship?: string;
    // 旅程图
    journey?: string;
  };
  katex?: {
    inline: string;
    block: string;
  };
  footer?: {
    markdownTotal: string;
    scrollAuto: string;
  };
}

export interface StaticTextDefault {
  'zh-CN': StaticTextDefaultValue;
  'en-US': StaticTextDefaultValue;
}

export type StaticTextDefaultKey = keyof StaticTextDefault;

export type ToolbarNames = keyof ToolbarTips | number;

export type Footers = '=' | 'markdownTotal' | 'scrollSwitch' | number;

export interface SettingType {
  pageFullscreen: boolean;
  fullscreen: boolean;
  preview: boolean;
  htmlPreview: boolean;
}

export interface HeadList {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  active?: boolean;
}

export type Themes = 'light' | 'dark';

export type PreviewThemes = string; // 'default' | 'github' | 'vuepress';

export type MarkedHeadingId = (text: string, level: number, index: number) => string;

export interface EditorProp {
  modelValue: string;
  // 主题，默认light
  theme?: Themes;
  // 外层扩展类名
  className?: string;
  // 历史记录最长条数，默认10
  historyLength?: number;
  // input回调事件
  onChange?: ChangeEvent;
  // 保存事件
  onSave?: SaveEvent;
  // 上传图片事件
  onUploadImg?: UploadImgEvent;
  // 是否页面内全屏，默认false
  pageFullscreen?: boolean;
  // 是否展开预览，默认true
  preview?: boolean;
  // 是否展开html预览，默认false
  htmlPreview?: boolean;
  // 仅预览模式，不显示toolbar和编辑框，默认false
  previewOnly?: boolean;
  // 预设语言名称
  language?: StaticTextDefaultKey | string;
  // 工具栏选择显示
  toolbars?: Array<ToolbarNames>;
  // 工具栏选择不显示
  toolbarsExclude?: Array<ToolbarNames>;
  // 格式化md，默认true
  noPrettier?: boolean;
  // html变化事件
  onHtmlChanged?: HtmlChangedEvent;
  // 获取目录结构
  onGetCatalog?: GetCatalogEvent;
  // 编辑器唯一标识
  editorId?: string;
  tabWidth?: number;
  // 预览中代码是否显示行号
  showCodeRowNumber?: boolean;
  // 预览内容样式
  previewTheme?: PreviewThemes;
  markedHeadingId?: MarkedHeadingId;
  // 编辑器样式
  style?: CSSProperties;
  // 表格预设格子数
  tableShape?: [number, number];
  // 不使用该功能
  noMermaid?: boolean;
  // 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
  // 推荐DOMPurify、sanitize-html
  sanitize?: (html: string) => string;
  placeholder?: string;
  noKatex?: boolean;
  // 自定义的工具栏列表
  defToolbars?: Array<ReactElement>;
  onError?: ErrorEvent;
  codeTheme?: string;
  footers?: Array<Footers>;
  scrollAuto?: boolean;
  defFooters?: Array<string | ReactElement>;
  noIconfont?: boolean;
  formatCopiedText?: (text: string) => string;
  noUploadImg?: boolean;
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   */
  codeStyleReverse?: boolean;
  /**
   * 需要自动调整的预览主题
   * 已默认包含default、mk-cute
   */
  codeStyleReverseList?: Array<string>;
}

export interface ContentType {
  editorId: string;
  tabWidth: number;
  highlight: {
    js: string;
    css: string;
  };
  historyLength: number;
  previewOnly: boolean;
  showCodeRowNumber: boolean;
  usedLanguageText: StaticTextDefaultValue;
  theme: Themes;
  previewTheme: PreviewThemes;
}

export interface MermaidTemplate {
  /**
   * 流程图
   */
  flow?: string;
  /**
   * 时序图
   */
  sequence?: string;
  /**
   * 甘特图
   */
  gantt?: string;
  /**
   * 类图
   */
  class?: string;
  /**
   * 状态图
   */
  state?: string;
  /**
   * 饼图
   */
  pie?: string;
  /**
   * 关系图
   */
  relationship?: string;
  /**
   * 旅程图
   */
  journey?: string;
}

export type RewriteHeading = (
  text: string,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  raw: string,
  slugger: Slugger,
  index: number
) => string;

export interface RewriteRenderer extends Omit<Renderer, 'heading'> {
  heading: RewriteHeading;
}

export interface ConfigOption {
  /**
   * 覆盖编辑器默认的renderer属性
   * @see https://marked.js.org/using_pro#renderer
   */
  markedRenderer?: (renderer: RewriteRenderer) => RewriteRenderer;
  /**
   * 自定义 marked 扩展
   * @see https://marked.js.org/using_pro#extensions
   */
  markedExtensions?: Array<marked.TokenizerExtension & marked.RendererExtension>;
  /**
   * 自定义 marked option，不推荐在这么覆盖renderer，这会导致内部逻辑混乱！
   * @see https://marked.js.org/using_advanced#options
   */
  markedOptions?: marked.MarkedOptions;
  /**
   * 编辑器内部依赖库
   */
  editorExtensions?: {
    highlight?: {
      instance?: any;
      js?: string;
      css?: CodeCss;
    };
    prettier?: {
      prettierInstance?: any;
      parserMarkdownInstance?: any;

      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    iconfont?: string;
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  };
  editorConfig?: {
    /**
     * 自定义提示语言
     */
    languageUserDefined?: { [key: string]: StaticTextDefaultValue };
    /**
     * 自定义内部mermaid模块
     */
    mermaidTemplate?: MermaidTemplate;
    /**
     * 输入渲染延迟（ms）
     */
    renderDelay?: number;
  };
}

/**
 * 扩展编辑器内部功能，包括marked和一些内部依赖实例，如highlight、cropper等
 */
export type Config = (options: ConfigOption) => void;

/**
 * 编辑器操作潜在的错误
 */
export interface InnerError {
  name: string;
  message: string;
}

export interface CodeCss {
  [key: string]: {
    light: string;
    dark: string;
  };
}

export interface StaticProp {
  previewOnly: boolean;
  editorId: string;
  noMermaid: boolean;
  noKatex: boolean;
  noPrettier: boolean;
  noUploadImg: boolean;
  noIconfont: boolean;
}

export type UpdateSetting = (k: keyof SettingType, v?: boolean | undefined) => void;

export type ChangeEvent = (v: string) => void;
export type SaveEvent = (v: string, h: Promise<string>) => void;
export type UploadImgEvent = (
  files: Array<File>,
  callBack: (urls: string[]) => void
) => void;
export type HtmlChangedEvent = (h: string) => void;
export type GetCatalogEvent = (list: HeadList[]) => void;
export type ErrorEvent = (err: InnerError) => void;

export interface ExposeEvent {
  pageFullscreen(status: boolean): void;
  fullscreen(status: boolean): void;
  preview(status: boolean): void;
  htmlPreview(status: boolean): void;
  catalog(status: boolean): void;
}

export interface InsertParam {
  // 插入的内容
  targetValue: string;
  // 是否选中插入的内容
  select: boolean;
  // 选中位置的开始偏移量
  deviationStart: number;
  // 选中位置的结束偏移量
  deviationEnd: number;
}

export type InsertContentGenerator = (selectedText: string) => InsertParam;

export interface ExposeParam {
  /**
   * 添加事件监听
   *
   * @param eventName 事件名称
   * @param callBack 事件回调函数
   */
  on<E extends keyof ExposeEvent, C extends ExposeEvent[E]>(
    eventName: E,
    callBack: C
  ): void;

  /**
   * 切换页面内全屏
   *
   * @param status 是否页面全屏
   */
  togglePageFullscreen(status?: boolean): void;

  /**
   * 切换屏幕全屏
   *
   * @param status 是否屏幕全屏
   */
  toggleFullscreen(status?: boolean): void;

  /**
   * 切换是否显示预览
   *
   * @param status 是否显示预览
   */
  togglePreview(status?: boolean): void;

  /**
   * 切换是否显示html预览
   *
   * @param status html预览状态
   */
  toggleHtmlPreview(status?: boolean): void;

  /**
   * 切换是否显示目录
   *
   * @param status 是否显示目录，不设置默认相反
   */
  toggleCatalog(status?: boolean): void;

  /**
   * 触发保存
   */
  triggerSave(): void;

  /**
   * 手动向文本框插入内容
   *
   * @param {Function} generate 构造插入内容方法
   * 构造方法提供「当前选中」的内容为入参
   * 返回「待插入内容」和插入的属性
   * 入参 selectedText 当前选中的内容
   *
   * targetValue     待插入内容
   * select         插入后是否自动选中内容
   * deviationStart 插入后选中位置的开始偏移量
   * deviationEnd   插入后选中位置的结束偏移量
   *
   */
  insert(generate: InsertContentGenerator): void;
}
