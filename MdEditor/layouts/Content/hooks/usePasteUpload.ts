import { RefObject, useContext, useEffect } from 'react';
import { EditorContext } from '~/Editor';
import bus from '~/utils/event-bus';
import { ContentProps } from '../props';

/**
 * 处理粘贴板
 */
const usePasteUpload = (
  props: ContentProps,
  inputWrapperRef: RefObject<HTMLDivElement>
) => {
  const { editorId, previewOnly } = useContext(EditorContext);

  useEffect(() => {
    // 粘贴板上传
    const pasteHandler = (e: ClipboardEvent) => {
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
      }

      // 识别vscode代码
      if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
        const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

        bus.emit(editorId, 'replace', 'code', {
          mode: vscCoodInfo.mode,
          text: e.clipboardData.getData('text/plain')
        });

        e.preventDefault();
      }
    };

    if (!previewOnly) {
      inputWrapperRef.current?.addEventListener('paste', pasteHandler);
    }

    // 编辑器卸载时移除相应的监听事件
    return () => {
      if (!previewOnly) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputWrapperRef.current?.removeEventListener('paste', pasteHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoDetectCode, inputWrapperRef]);
};
export default usePasteUpload;
