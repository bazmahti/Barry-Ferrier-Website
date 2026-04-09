import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
  RemoveFormatting, Minus
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank' }).run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setShowImageInput(false);
    setImageUrl('');
  }, [editor, imageUrl]);

  if (!editor) return null;

  return (
    <div className="border-b border-border bg-muted/30 p-1.5" data-testid="rich-text-toolbar">
      <div className="flex flex-wrap gap-0.5">
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}

          title="Bold"
          data-testid="rte-bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}

          title="Italic"
          data-testid="rte-italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('underline') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}

          title="Underline"
          data-testid="rte-underline"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleStrike().run()}

          title="Strikethrough"
          data-testid="rte-strike"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </Button>

        <div className="w-px bg-border mx-1 self-stretch" />

        <Button
          type="button"
          size="icon"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}

          title="Heading 1"
          data-testid="rte-h1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}

          title="Heading 2"
          data-testid="rte-h2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}

          title="Heading 3"
          data-testid="rte-h3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </Button>

        <div className="w-px bg-border mx-1 self-stretch" />

        <Button
          type="button"
          size="icon"
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}

          title="Bullet List"
          data-testid="rte-bullet-list"
        >
          <List className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}

          title="Numbered List"
          data-testid="rte-ordered-list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}

          title="Quote"
          data-testid="rte-blockquote"
        >
          <Quote className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}

          title="Code Block"
          data-testid="rte-code-block"
        >
          <Code className="w-3.5 h-3.5" />
        </Button>

        <div className="w-px bg-border mx-1 self-stretch" />

        <Button
          type="button"
          size="icon"
          variant={editor.isActive('link') ? 'default' : 'ghost'}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            } else {
              const previousUrl = editor.getAttributes('link').href || '';
              setLinkUrl(previousUrl);
              setShowLinkInput(true);
            }
          }}

          title="Insert Link"
          data-testid="rte-link"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setShowImageInput(true)}

          title="Insert Image"
          data-testid="rte-image"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}

          title="Horizontal Rule"
          data-testid="rte-hr"
        >
          <Minus className="w-3.5 h-3.5" />
        </Button>

        <div className="w-px bg-border mx-1 self-stretch" />

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}

          title="Clear Formatting"
          data-testid="rte-clear-format"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}

          title="Undo"
          data-testid="rte-undo"
        >
          <Undo className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}

          title="Redo"
          data-testid="rte-redo"
        >
          <Redo className="w-3.5 h-3.5" />
        </Button>
      </div>

      {showLinkInput && (
        <div className="flex items-end gap-2 mt-2 p-2 bg-background rounded border border-border">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Link URL</Label>
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
              data-testid="rte-link-input"
            />
          </div>
          <Button type="button" size="sm" onClick={setLink} data-testid="rte-link-apply">
            Apply
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => { setShowLinkInput(false); setLinkUrl(''); }}>
            Cancel
          </Button>
        </div>
      )}

      {showImageInput && (
        <div className="flex items-end gap-2 mt-2 p-2 bg-background rounded border border-border">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Image URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addImage()}
              data-testid="rte-image-input"
            />
          </div>
          <Button type="button" size="sm" onClick={addImage} data-testid="rte-image-apply">
            Insert
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => { setShowImageInput(false); setImageUrl(''); }}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default function RichTextEditor({ content, onChange, placeholder, minHeight = '200px' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-neon-cyan underline', target: '_blank', rel: 'noopener noreferrer' },
      }),
      ImageExt.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full' },
      }),
      Underline,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm dark:prose-invert max-w-none focus:outline-none p-3`,
        style: `min-height: ${minHeight}`,
        'data-testid': 'rte-content-area',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content]);

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background" data-testid="rich-text-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
