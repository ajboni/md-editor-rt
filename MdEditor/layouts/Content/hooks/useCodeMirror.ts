import { useContext, useEffect, useRef, useState } from 'react';
import { EditorView, minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown } from '@codemirror/lang-markdown';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import { configOption } from '~/config';
import bus from '~/utils/event-bus';
import { directive2flag, ToolDirective } from '~/utils/content-help';
import { EditorContext } from '~/Editor';

import CodeMirrorUt from '../codemirror';
import { oneDark } from '../codemirror/themeOneDark';
import { oneLight } from '../codemirror/themeLight';
import { ContentProps } from '../props';
import createCommands from '../codemirror/commands';

import usePasteUpload from './usePasteUpload';
import useAttach from './useAttach';

/**
 * 文本编辑区组件
 *
 * @param props
 * @returns
 */
const useCodeMirror = (props: ContentProps) => {
  const { tabWidth, editorId, theme } = useContext(EditorContext);

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const codeMirrorUt = useRef<CodeMirrorUt>();

  const [mdEditorCommands] = useState(() => createCommands(editorId, props));

  // 粘贴上传
  const pasteHandler = usePasteUpload(props);

  const [defaultExtensions] = useState(() => {
    return [
      keymap.of([...mdEditorCommands, indentWithTab]),
      minimalSetup,
      markdown({ codeLanguages: languages }),
      // 横向换行
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        update.docChanged && props.onChange(update.state.doc.toString());
      }),
      EditorView.domEventHandlers({
        paste: pasteHandler,
        blur: props.onBlur,
        focus: props.onFocus
      })
    ];
  });

  const getExtensions = () => {
    if (theme === 'light') {
      return configOption.codeMirrorExtensions!(
        theme,
        [...defaultExtensions, oneLight],
        mdEditorCommands
      );
    }

    return configOption.codeMirrorExtensions!(
      theme,
      [...defaultExtensions, oneDark],
      mdEditorCommands
    );
  };

  useEffect(() => {
    const startState = EditorState.create({
      doc: props.value
    });

    const view = new EditorView({
      state: startState,
      parent: inputWrapperRef.current!
    });

    codeMirrorUt.current = new CodeMirrorUt(view);

    codeMirrorUt.current.setTabSize(tabWidth);
    codeMirrorUt.current.setExtensions(getExtensions());
    codeMirrorUt.current.setPlaceholder(props.placeholder);
    // view.dispatch({
    //   changes: { from: 10, insert: '*' },
    //   selection: { anchor: 11 }
    // });

    // view.dispatch({
    //   selection: EditorSelection.create(
    //     [
    //       EditorSelection.range(20, 32),
    //       // EditorSelection.range(6, 7),
    //       EditorSelection.cursor(32)
    //     ],
    //     1
    //   )
    // });

    // console.log(view.state.selection.main);
    // console.log(view.state.sliceDoc());
    if (props.autoFocus) {
      view.focus();
    }

    // console.log()
    // view.dispatch(view.state.replaceSelection('`vscode`'));

    bus.on(editorId, {
      name: 'ctrlZ',
      callback() {
        undo(view);
      }
    });

    bus.on(editorId, {
      name: 'ctrlShiftZ',
      callback() {
        redo(view);
      }
    });

    // 注册指令替换内容事件
    bus.on(editorId, {
      name: 'replace',
      callback(direct: ToolDirective, params = {}) {
        const { text, options } = directive2flag(direct, codeMirrorUt.current!, params);
        codeMirrorUt.current?.replaceSelectedText(text, options);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      codeMirrorUt.current?.setExtensions(getExtensions());
    } else {
      codeMirrorUt.current?.setExtensions(getExtensions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    // 可控组件，只有不是输入的时候才手动设置编辑区的内容
    if (codeMirrorUt.current?.getValue() !== props.value) {
      codeMirrorUt.current?.setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    codeMirrorUt.current?.setDisabled(props.disabled!);
  }, [props.disabled]);

  useEffect(() => {
    codeMirrorUt.current?.setDisabled(props.readOnly!);
  }, [props.readOnly]);

  useEffect(() => {
    if (props.maxLength) {
      codeMirrorUt.current?.setMaxLength(props.maxLength);
    }
  }, [props.maxLength]);

  // 附带的设置
  useAttach(codeMirrorUt);

  return {
    inputWrapperRef,
    codeMirrorUt
  };
};

export default useCodeMirror;
