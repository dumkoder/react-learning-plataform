'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import type { Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { useContent, getContent } from '@/hooks/useContent'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { content } = useContent();
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="text-muted-foreground">{getContent(content, 'common.loading', 'Loading editor...')}</div>
      </div>
    );
  },
})

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'javascript',
  height = '400px' 
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    // Configure TypeScript/JavaScript settings
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    })

    // Add React types
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare module 'react' {
        export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
        export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
        export function useContext<T>(context: React.Context<T>): T;
        export function useReducer<R extends React.Reducer<any, any>>(
          reducer: R,
          initialState: React.ReducerState<R>,
          initializer?: undefined
        ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
        export const Component: React.ComponentType<any>;
        export const Fragment: React.ComponentType<any>;
        export interface Context<T> {
          Provider: React.ComponentType<{ value: T; children?: React.ReactNode }>;
          Consumer: React.ComponentType<{ children: (value: T) => React.ReactNode }>;
        }
        export function createContext<T>(defaultValue: T): Context<T>;
        export type ReactNode = string | number | React.ReactElement | React.ReactFragment | React.ReactPortal | boolean | null | undefined;
        export interface ReactElement<P = any> {
          type: React.ComponentType<P>;
          props: P;
          key: React.Key | null;
        }
        export type ComponentType<P = {}> = React.ComponentClass<P> | React.FunctionComponent<P>;
        export type FunctionComponent<P = {}> = (props: P) => React.ReactElement | null;
        export interface ComponentClass<P = {}> {
          new (props: P): React.Component<P>;
        }
        export class Component<P = {}, S = {}> {
          props: P;
          state: S;
          setState(state: Partial<S> | ((prevState: S) => Partial<S>)): void;
          render(): React.ReactNode;
        }
      }
    `, 'react.d.ts')

    // Set editor theme
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      },
    })
    monaco.editor.setTheme('customTheme')
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          lineHeight: 24,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          quickSuggestions: true,
          parameterHints: {
            enabled: true,
          },
          hover: {
            enabled: true,
          },
        }}
      />
    </div>
  )
}