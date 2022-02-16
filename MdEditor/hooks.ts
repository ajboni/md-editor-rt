import bus from './utils/event-bus';
import { ToolDirective } from './utils/content-help';
import { EditorProp, ToolbarNames } from './type';
import { useEffect } from 'react';
import { prefix } from './config';
import { appendHandler } from './utils/dom';

export const useKeyBoard = (props: EditorProp) => {
  const { editorId } = props;

  const initFunc = (name: ToolbarNames) =>
    props.toolbars?.includes(name) && !props.toolbarsExclude?.includes(name);

  const keyDownHandler = (event: KeyboardEvent) => {
    // 只处理是编辑框内的内容
    if (event.target !== document.querySelector(`#${props.editorId}-textarea`)) {
      return;
    }

    // 按键操作是否会替换内容
    // let toReplaceValue = false;
    // macos中以meta键位配s键位为保存，windows中如此会被系统默认的事件替代
    if (event.ctrlKey || event.metaKey) {
      switch (event.code) {
        case 'KeyS': {
          if (event.shiftKey) {
            // 删除线
            if (initFunc('strikeThrough')) {
              bus.emit(editorId, 'replace', 'strikeThrough' as ToolDirective);
            }
          } else {
            // 触发保存事件
            if (initFunc('save')) {
              bus.emit(editorId, 'onSave', props.modelValue);
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyB': {
          if (initFunc('bold')) {
            bus.emit(editorId, 'replace', 'bold' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyU': {
          if (event.shiftKey) {
            // ctrl+shift+u触发无需列表
            if (initFunc('unorderedList')) {
              bus.emit(editorId, 'replace', 'unorderedList' as ToolDirective);
              event.preventDefault();
            }
          } else {
            // ctrl+u触发下划线
            if (initFunc('underline')) {
              bus.emit(editorId, 'replace', 'underline' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyI': {
          if (event.shiftKey) {
            // ctrl+shift+l触发图片链接
            if (initFunc('image')) {
              bus.emit(editorId, 'openModals', 'image');
              event.preventDefault();
            }
          } else {
            if (initFunc('italic')) {
              bus.emit(editorId, 'replace', 'italic' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'Digit1': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h1' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit2': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h2' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit3': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h3' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit4': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h4' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit5': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h5' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit6': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h6' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowUp': {
          if (initFunc('sup')) {
            bus.emit(editorId, 'replace', 'sup' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowDown': {
          if (initFunc('sub')) {
            bus.emit(editorId, 'replace', 'sub' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyQ': {
          bus.emit(editorId, 'replace', 'quote' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyO': {
          if (initFunc('orderedList')) {
            bus.emit(editorId, 'replace', 'orderedList' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyC': {
          if (event.shiftKey) {
            // ctrl+shift+c触发块级代码
            if (initFunc('code')) {
              bus.emit(editorId, 'replace', 'code' as ToolDirective);
              event.preventDefault();
            }
          } else if (event.altKey) {
            // ctrl+alt+c触发行内代码
            if (initFunc('codeRow')) {
              bus.emit(editorId, 'replace', 'codeRow' as ToolDirective);
              event.preventDefault();
            }
          } else {
            // 接管复制快捷键
            event.preventDefault();
            bus.emit(editorId, 'replace', 'ctrlC');
            break;
          }
          break;
        }
        case 'KeyL': {
          // ctrl+l触发普通链接
          if (initFunc('link')) {
            bus.emit(editorId, 'openModals', 'link');
            event.preventDefault();
          }
          break;
        }
        case 'KeyZ': {
          if (event.shiftKey) {
            // ctrl+shift+z 前进一步
            if (initFunc('next')) {
              bus.emit(editorId, 'ctrlShiftZ');
              event.preventDefault();
            }
          } else {
            // ctrl+z 后退一步
            if (initFunc('revoke')) {
              bus.emit(editorId, 'ctrlZ');
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyF': {
          // ctrl+shift+f 美化内容
          if (event.shiftKey) {
            if (initFunc('prettier')) {
              bus.emit(editorId, 'replace', 'prettier');
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyT': {
          // ctrl+shift+alt+t 新增表格
          if (event.altKey && event.shiftKey) {
            if (initFunc('table')) {
              bus.emit(editorId, 'replace', 'table');
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyX': {
          bus.emit(editorId, 'replace', 'ctrlX');
          event.preventDefault();
          break;
        }
        case 'KeyD': {
          event.preventDefault();
          bus.emit(editorId, 'replace', 'ctrlD');
          break;
        }
      }
    } else if (event.code === 'Tab') {
      event.preventDefault();
      // 缩进
      if (event.shiftKey) {
        bus.emit(editorId, 'replace', 'shiftTab');
      } else {
        bus.emit(editorId, 'replace', 'tab');
      }
    }
  };

  useEffect(() => {
    if (!props.previewOnly) {
      window.addEventListener('keydown', keyDownHandler);
    }

    // 编辑器卸载时移除相应的监听事件
    return () => {
      if (!props.previewOnly) {
        window.removeEventListener('keydown', keyDownHandler);
      }
    };
  }, []);

  useEffect(() => {
    // 每次更新都重新注册save监听
    if (props.previewOnly) {
      return;
    }

    const callback = () => {
      if (props.onSave) {
        props.onSave(props.modelValue);
      }
    };

    bus.remove(editorId, 'onSave', callback);
    // 注册保存事件
    bus.on(editorId, {
      name: 'onSave',
      callback
    });
  }, [props.modelValue]);
};

export const useExpansion = (props: EditorProp) => {
  const {
    iconfontJs,
    prettier,
    prettierCDN,
    prettierMDCDN,
    previewOnly,
    cropperCss,
    cropperJs
  } = props;

  useEffect(() => {
    // 图标
    const iconfontScript = document.createElement('script');
    iconfontScript.src = iconfontJs;
    iconfontScript.id = `${prefix}-icon`;

    // prettier
    const prettierScript = document.createElement('script');
    const prettierMDScript = document.createElement('script');

    prettierScript.src = prettierCDN;
    prettierScript.id = `${prefix}-prettier`;

    prettierMDScript.src = prettierMDCDN;
    prettierMDScript.id = `${prefix}-prettierMD`;

    // 裁剪图片
    const cropperLink = document.createElement('link');
    cropperLink.rel = 'stylesheet';
    cropperLink.href = cropperCss;
    cropperLink.id = `${prefix}-cropperCss`;

    const cropperScript = document.createElement('script');
    cropperScript.src = cropperJs;
    cropperScript.id = `${prefix}-cropper`;

    // 非仅预览模式才添加扩展
    if (!previewOnly) {
      appendHandler(iconfontScript);

      if (!props.Cropper) {
        appendHandler(cropperLink);
        appendHandler(cropperScript);
      }

      if (prettier) {
        appendHandler(prettierScript);
        appendHandler(prettierMDScript);
      }
    }

    return () => {
      if (!previewOnly) {
        iconfontScript.remove();
        cropperLink.remove();
        cropperScript.remove();

        if (prettier) {
          prettierScript.remove();
          prettierMDScript.remove();
        }
      }
    };
  }, []);
};