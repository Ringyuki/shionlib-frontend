import { useState } from 'react'
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { ContentEditable } from '@/components/editor/libs/editor-ui/content-editable'
import { ActionsPlugin } from '@/components/editor/libs/plugins/actions/actions-plugin'
import { CharacterLimitPlugin } from '@/components/editor/libs/plugins/actions/character-limit-plugin'
import { ClearEditorActionPlugin } from '@/components/editor/libs/plugins/actions/clear-editor-plugin'
import { EditModeTogglePlugin } from '@/components/editor/libs/plugins/actions/edit-mode-toggle-plugin'
import { MarkdownTogglePlugin } from '@/components/editor/libs/plugins/actions/markdown-toggle-plugin'
import { MaxLengthPlugin } from '@/components/editor/libs/plugins/actions/max-length-plugin'
import { TreeViewPlugin } from '@/components/editor/libs/plugins/actions/tree-view-plugin'
import { AutoLinkPlugin } from '@/components/editor/libs/plugins/auto-link-plugin'
import { CodeActionMenuPlugin } from '@/components/editor/libs/plugins/code-action-menu-plugin'
import { CodeHighlightPlugin } from '@/components/editor/libs/plugins/code-highlight-plugin'
import { ComponentPickerMenuPlugin } from '@/components/editor/libs/plugins/component-picker-menu-plugin'
import { ContextMenuPlugin } from '@/components/editor/libs/plugins/context-menu-plugin'
import { DragDropPastePlugin } from '@/components/editor/libs/plugins/drag-drop-paste-plugin'
import { DraggableBlockPlugin } from '@/components/editor/libs/plugins/draggable-block-plugin'
import { AutoEmbedPlugin } from '@/components/editor/libs/plugins/embeds/auto-embed-plugin'
import { TwitterPlugin } from '@/components/editor/libs/plugins/embeds/twitter-plugin'
import { YouTubePlugin } from '@/components/editor/libs/plugins/embeds/youtube-plugin'
import { FloatingLinkEditorPlugin } from '@/components/editor/libs/plugins/floating-link-editor-plugin'
import { FloatingTextFormatToolbarPlugin } from '@/components/editor/libs/plugins/floating-text-format-plugin'
import { ImagesPlugin } from '@/components/editor/libs/plugins/images-plugin'
import { KeywordsPlugin } from '@/components/editor/libs/plugins/keywords-plugin'
import { LayoutPlugin } from '@/components/editor/libs/plugins/layout-plugin'
import { LinkPlugin } from '@/components/editor/libs/plugins/link-plugin'
import { ListMaxIndentLevelPlugin } from '@/components/editor/libs/plugins/list-max-indent-level-plugin'
import { MentionsPlugin } from '@/components/editor/libs/plugins/mentions-plugin'
import { AlignmentPickerPlugin } from '@/components/editor/libs/plugins/picker/alignment-picker-plugin'
import { BulletedListPickerPlugin } from '@/components/editor/libs/plugins/picker/bulleted-list-picker-plugin'
import { CheckListPickerPlugin } from '@/components/editor/libs/plugins/picker/check-list-picker-plugin'
import { CodePickerPlugin } from '@/components/editor/libs/plugins/picker/code-picker-plugin'
import { EmbedsPickerPlugin } from '@/components/editor/libs/plugins/picker/embeds-picker-plugin'
import { HeadingPickerPlugin } from '@/components/editor/libs/plugins/picker/heading-picker-plugin'
import { ImagePickerPlugin } from '@/components/editor/libs/plugins/picker/image-picker-plugin'
import { NumberedListPickerPlugin } from '@/components/editor/libs/plugins/picker/numbered-list-picker-plugin'
import { ParagraphPickerPlugin } from '@/components/editor/libs/plugins/picker/paragraph-picker-plugin'
import { QuotePickerPlugin } from '@/components/editor/libs/plugins/picker/quote-picker-plugin'
import {
  DynamicTablePickerPlugin,
  TablePickerPlugin,
} from '@/components/editor/libs/plugins/picker/table-picker-plugin'
import { TabFocusPlugin } from '@/components/editor/libs/plugins/tab-focus-plugin'
import { BlockFormatDropDown } from '@/components/editor/libs/plugins/toolbar/block-format-toolbar-plugin'
import { FormatBulletedList } from '@/components/editor/libs/plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from '@/components/editor/libs/plugins/toolbar/block-format/format-check-list'
import { FormatCodeBlock } from '@/components/editor/libs/plugins/toolbar/block-format/format-code-block'
import { FormatHeading } from '@/components/editor/libs/plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from '@/components/editor/libs/plugins/toolbar/block-format/format-numbered-list'
import { FormatParagraph } from '@/components/editor/libs/plugins/toolbar/block-format/format-paragraph'
import { FormatQuote } from '@/components/editor/libs/plugins/toolbar/block-format/format-quote'
import { ClearFormattingToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/clear-formatting-toolbar-plugin'
import { CodeLanguageToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/code-language-toolbar-plugin'
import { ElementFormatToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/element-format-toolbar-plugin'
import { FontBackgroundToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/font-background-toolbar-plugin'
import { FontColorToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/font-color-toolbar-plugin'
import { FontFormatToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/font-format-toolbar-plugin'
import { FontSizeToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/font-size-toolbar-plugin'
import { HistoryToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/history-toolbar-plugin'
import { LinkToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/link-toolbar-plugin'
import { SubSuperToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/subsuper-toolbar-plugin'
import { ToolbarPlugin } from '@/components/editor/libs/plugins/toolbar/toolbar-plugin'
import { HR } from '@/components/editor/libs/transformers/markdown-hr-transformer'
import { IMAGE } from '@/components/editor/libs/transformers/markdown-image-transformer'
import { TABLE } from '@/components/editor/libs/transformers/markdown-table-transformer'
import { TWEET } from '@/components/editor/libs/transformers/markdown-tweet-transformer'
import { Separator } from '@/components/shionui/Separator'
import { Kbd } from '@/components/shionui/Kbd'
import { useTranslations } from 'next-intl'

const maxLength = 500

export function Plugins({}) {
  const t = useTranslations('Components.Editor.Plugins')
  const tPicker = useTranslations('Components.Editor.Picker')
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }
  const placeholder = (
    <span className="flex items-center gap-1">
      {t('placeholderPrefix')}
      <Kbd>/</Kbd>
      {t('placeholderSuffix')}
    </span>
  )
  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="!h-7" />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={['h1', 'h2', 'h3']} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatCodeBlock />
              <FormatQuote />
            </BlockFormatDropDown>
            {blockType === 'code' ? (
              <CodeLanguageToolbarPlugin />
            ) : (
              <>
                <FontSizeToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
                <FontFormatToolbarPlugin format="bold" />
                <FontFormatToolbarPlugin format="italic" />
                <FontFormatToolbarPlugin format="underline" />
                <FontFormatToolbarPlugin format="strikethrough" />
                <Separator orientation="vertical" className="!h-7" />
                <SubSuperToolbarPlugin />
                <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
                <Separator orientation="vertical" className="!h-7" />
                <ClearFormattingToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
                <FontColorToolbarPlugin />
                <FontBackgroundToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
                <ElementFormatToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
              </>
            )}
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block min-h-72 max-h-[80vh] overflow-auto px-8 py-4 text-base focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        <MentionsPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <KeywordsPlugin />
        <ImagesPlugin captionsEnabled={false} />

        <LayoutPlugin />

        <AutoEmbedPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

        <MarkdownShortcutPlugin
          transformers={[
            TABLE,
            HR,
            IMAGE,
            TWEET,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
        <TabFocusPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />

        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            TablePickerPlugin({ t: (key: string) => tPicker(key) }),
            CheckListPickerPlugin(),
            NumberedListPickerPlugin(),
            BulletedListPickerPlugin(),
            QuotePickerPlugin(),
            CodePickerPlugin(),
            // DividerPickerPlugin(),
            EmbedsPickerPlugin({ embed: 'tweet' }),
            // EmbedsPickerPlugin({ embed: 'youtube-video' }),
            ImagePickerPlugin(),
            // ColumnsLayoutPickerPlugin(),
            AlignmentPickerPlugin({ alignment: 'left' }),
            AlignmentPickerPlugin({ alignment: 'center' }),
            AlignmentPickerPlugin({ alignment: 'right' }),
            AlignmentPickerPlugin({ alignment: 'justify' }),
          ]}
          dynamicOptionsFn={({ queryString }) =>
            DynamicTablePickerPlugin({ queryString, t: (key: string) => tPicker(key) })
          }
        />

        <ContextMenuPlugin />
        <DragDropPastePlugin />

        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem}
          setIsLinkEditMode={setIsLinkEditMode}
        />

        <ListMaxIndentLevelPlugin />
      </div>
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            <MaxLengthPlugin maxLength={maxLength} />
            <CharacterLimitPlugin maxLength={maxLength} charset="UTF-16" />
          </div>
          <div className="flex flex-1 justify-end">
            <MarkdownTogglePlugin
              shouldPreserveNewLinesInMarkdown={true}
              transformers={[
                TABLE,
                HR,
                IMAGE,
                TWEET,
                CHECK_LIST,
                ...ELEMENT_TRANSFORMERS,
                ...MULTILINE_ELEMENT_TRANSFORMERS,
                ...TEXT_FORMAT_TRANSFORMERS,
                ...TEXT_MATCH_TRANSFORMERS,
              ]}
            />
            <EditModeTogglePlugin />
            <>
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
            </>
            <TreeViewPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  )
}
