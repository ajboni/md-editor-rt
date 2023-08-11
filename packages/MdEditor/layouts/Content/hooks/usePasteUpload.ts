import { useCallback, useContext } from 'react';
import { EditorContext } from '~/Editor';
import bus from '~/utils/event-bus';
import { ContentProps } from '../props';

/**
 * 处理粘贴板
 */
const usePasteUpload = (props: ContentProps) => {
  const { editorId } = useContext(EditorContext);

  // 粘贴板上传
  const pasteHandler = useCallback(
    (e: ClipboardEvent) => {
      if (!e.clipboardData) {
        return;
      }

      // 处理文件
      if (e.clipboardData.files.length > 0) {
        const { files } = e.clipboardData;

        bus.emit(
          editorId,
          'uploadImage',
          Array.from(files).filter((file) => {
            return /image\/.*/.test(file.type);
          })
        );

        e.preventDefault();
        return;
      }

      // 识别vscode代码
      if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
        const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

        bus.emit(editorId, 'replace', 'code', {
          mode: vscCoodInfo.mode,
          text: e.clipboardData.getData('text/plain')
        });

        e.preventDefault();
        return;
      }

      const targetValue = e.clipboardData.getData('text/plain');
      if (props.maxLength && targetValue.length + props.value.length > props.maxLength) {
        bus.emit(editorId, 'errorCatcher', {
          name: 'overlength',
          message: 'The input text is too long',
          data: targetValue
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.autoDetectCode, props.maxLength, props.value]
  );

  return pasteHandler;
};
export default usePasteUpload;
