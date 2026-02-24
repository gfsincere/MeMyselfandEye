<template>
  <div class="blog-editor">
    <div class="editor-field">
      <label for="post-content">Content</label>
      <div class="editor-toolbar">
        <button type="button" @click="insertMarkdown('**', '**')" title="Bold">B</button>
        <button type="button" @click="insertMarkdown('*', '*')" title="Italic"><em>I</em></button>
        <button type="button" @click="insertMarkdown('## ', '')" title="Heading">H</button>
        <button type="button" @click="insertMarkdown('- ', '')" title="List">List</button>
        <button type="button" @click="insertMarkdown('[', '](url)')" title="Link">Link</button>
        <button type="button" @click="insertMarkdown('```\n', '\n```')" title="Code">Code</button>
      </div>
      <textarea
        id="post-content"
        ref="contentRef"
        v-model="content"
        placeholder="Write your post in markdown..."
        rows="12"
      ></textarea>
    </div>
    <div class="editor-preview" v-if="content">
      <h4>Preview</h4>
      <div class="preview-content" v-html="renderedPreview"></div>
    </div>
    <div class="editor-actions">
      <button type="button" class="save-btn" @click="handleSave" :disabled="!canSave">
        Save Post
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'BlogEditor',
  props: {
    onSave: {
      type: Function,
      default: () => {},
    },
    initialTitle: {
      type: String,
      default: '',
    },
    initialContent: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const content = ref('')
    const contentRef = ref(null)
    const canSave = computed(() => {
      return Boolean((props.initialTitle || '').trim() && content.value.trim())
    })

    watch(
      () => props.initialContent,
      (nextContent) => {
        content.value = nextContent || ''
      },
      { immediate: true }
    )

    const renderedPreview = computed(() => {
      let text = content.value
      text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')
      text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>')
      text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>')
      text = text.replace(/^- (.*$)/gm, '<li>$1</li>')
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      text = text.replace(/\n\n/g, '</p><p>')
      text = '<p>' + text + '</p>'
      return text
    })

    function insertMarkdown(before, after) {
      const el = contentRef.value
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const selected = content.value.substring(start, end)
      content.value =
        content.value.substring(0, start) +
        before + selected + after +
        content.value.substring(end)
      el.focus()
      const cursorPos = start + before.length + selected.length
      requestAnimationFrame(() => {
        el.setSelectionRange(cursorPos, cursorPos)
      })
    }

    function handleSave() {
      const slug = props.initialTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      props.onSave({
        title: props.initialTitle,
        content: content.value,
        slug,
        date: new Date().toISOString().split('T')[0],
      })
      content.value = ''
    }

    return { content, contentRef, renderedPreview, insertMarkdown, handleSave, canSave }
  },
}
</script>

<style scoped>
.blog-editor {
  background: #fafafa;
  border: 2px solid #222;
  padding: 30px;
  margin-top: 40px;
  font-family: 'Manrope', sans-serif;
}

.blog-editor h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #343a40;
}

.editor-field {
  margin-bottom: 20px;
}

.editor-field label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #343a40;
}

.editor-field input {
  width: 100%;
  padding: 10px 14px;
  font-size: 1rem;
  border: 2px solid #ccc;
  font-family: 'Manrope', sans-serif;
  transition: border-color 0.2s;
}

.editor-field input:focus {
  outline: none;
  border-color: #000;
}

.editor-toolbar {
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
}

.editor-toolbar button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.15s;
}

.editor-toolbar button:hover {
  background: #eee;
}

.editor-field textarea {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 2px solid #ccc;
  font-family: 'Manrope', sans-serif;
  resize: vertical;
  transition: border-color 0.2s;
}

.editor-field textarea:focus {
  outline: none;
  border-color: #000;
}

.editor-preview {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
}

.editor-preview h4 {
  color: #999;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.preview-content {
  line-height: 1.7;
  color: #333;
}

.editor-actions {
  margin-top: 20px;
}

.save-btn {
  padding: 12px 32px;
  background: #000;
  color: #fff;
  border: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background: #333;
}

.save-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
