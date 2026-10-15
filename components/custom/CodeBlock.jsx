import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash'
import shell from 'react-syntax-highlighter/dist/cjs/languages/hljs/shell'
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml'
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import dockerfile from 'react-syntax-highlighter/dist/cjs/languages/hljs/dockerfile'
import nginx from 'react-syntax-highlighter/dist/cjs/languages/hljs/nginx'
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql'
import ini from 'react-syntax-highlighter/dist/cjs/languages/hljs/ini'
import plaintext from 'react-syntax-highlighter/dist/cjs/languages/hljs/plaintext'
import { IoIosCopy, IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Only the languages the posts use: the full highlight.js build is ~10x larger.
const LANGUAGES = {
  javascript, js: javascript, jsx: javascript, function: javascript, regularFunction: javascript, const: javascript,
  typescript, ts: typescript, tsx: typescript,
  bash, sh: bash, shell, curl: bash,
  python, py: python,
  json,
  xml, html: xml,
  css,
  yaml, yml: yaml,
  dockerfile, docker: dockerfile,
  nginx,
  sql,
  ini, dotenv: ini, env: ini,
  text: plaintext, plaintext
}
Object.entries(LANGUAGES).forEach(([name, grammar]) => SyntaxHighlighter.registerLanguage(name, grammar))

export function parseLanguageByClass (className) {
  if (!className) return 'javascript'
  const lang = className.replace(/^language-/, '').split(/\s+/)[0]
  if (LANGUAGES[lang]) return lang
  const lower = lang.toLowerCase()
  return LANGUAGES[lower] ? lower : 'plaintext'
}

// vs2015 on our indigo background, with the dim colours lifted to pass WCAG AA contrast.
const theme = {
  ...vs2015,
  'hljs-comment': { ...vs2015['hljs-comment'], color: '#8fb98a' },
  'hljs-quote': { ...vs2015['hljs-quote'], color: '#8fb98a' },
  'hljs-regexp': { ...vs2015['hljs-regexp'], color: '#e0a07a' },
  'hljs-template-tag': { ...vs2015['hljs-template-tag'], color: '#e0a07a' }
}

const CodeBlock = ({ code, className }) => {
  const [copied, setCopied] = useState(false)
  const notify = () => {
    toast(<ToastDisplay className='bg-neutral-700 m-2' />)
    copy()
  }

  function ToastDisplay () {
    return (
      <div className='m-2'>
        <p className='text-md'>Copied to clipboard !</p>
      </div>
    )
  }
  const copy = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <div className="relative">
      <button
        className="absolute flex flex-row  top-0 right-0 p-2">
        <span className='m-1 pb-1 basis-3/4 text-xs'>{parseLanguageByClass(className)}</span>
        <CopyToClipboard text={code}
          onCopy={(copied) => notify()}>
          {copied
            ? <IoIosCheckmarkCircleOutline className="text-lg m-1 text-green-500 basis-1/4 transform-gpu scale-100
                    hover:scale-[1.02] " />
            : <IoIosCopy className="text-lg m-1 basis-1/4 hover:text-white transform-gpu scale-100
                    hover:scale-[1.02] " />}

        </CopyToClipboard>

      </button>
      <SyntaxHighlighter
        className=''
        language={parseLanguageByClass(className)}
        style={theme}
        customStyle={{ background: '#0e0c28', padding: '44px 20px 18px', borderRadius: 16, margin: '24px 0', fontSize: 15, lineHeight: 1.6 }}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={false}
        showInlineLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        closeButton={false}
        limit={1}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark" />
    </div>
  )
}

export default CodeBlock
