/** EN:
 * ContentProvider Component
 *
 * This is a React functional component that serves as a content provider.
 * It takes three props:
 * - data: Data to be displayed or processed
 * - showEditorInProd: A flag to show or hide the editor in production
 * - standaloneServer: A flag to indicate if it runs on a standalone server
 *
 * Depending on the props, the component performs one of the following:
 * - If 'data' is falsy or 'showEditorInProd' is truthy, it returns a div with specific attributes.
 * - Otherwise, it returns JSX that includes a link to a Tailwind CSS file, inline styles, HTML content, and a ToastContainer.
 *
 * Exports:
 * - ContentProvider (React Component)
 */

/** ES:
 * Componente ContentProvider
 *
 * Este es un componente funcional de React que funciona como proveedor de contenido.
 * Acepta tres propiedades:
 * - data: Datos para mostrar o procesar
 * - showEditorInProd: Una bandera para mostrar u ocultar el editor en producción
 * - standaloneServer: Una bandera para indicar si se ejecuta en un servidor independiente
 *
 * Dependiendo de las propiedades, el componente realiza una de las siguientes acciones:
 * - Si 'data' es falso o 'showEditorInProd' es verdadero, devuelve un div con atributos específicos.
 * - De lo contrario, devuelve JSX que incluye un enlace a un archivo CSS de Tailwind, estilos en línea, contenido HTML y un ToastContainer.
 *
 * Exporta:
 * - ContentProvider (Componente React)
 */

import React, { FC, useEffect, useState, useRef } from 'react'
import { ContentProviderProps } from '../../../types'
import { ToastContainer } from '../toast'

import cssOverrides from '../styles/overrides'

import { tailwindCssUrl } from '../../../server/config'

const ContentProvider: FC<ContentProviderProps> = ({
  data,
  showEditorInProd = false,
  standaloneServer = false,
}) => {
  const mounted = useRef<boolean>(false)
  const [css, setCss] = useState<string | undefined>()
  const [html, setHtml] = useState<string | undefined>()

  const isDev = !data
  const showEditor = isDev || showEditorInProd
  const startServer = isDev && !showEditorInProd

  const [tailwindLoaded, setTailwindLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (mounted.current) return

    const $style = document.createElement('style')
    $style.innerHTML = cssOverrides
    document.head.appendChild($style)

    if (showEditor) {
      import('./initEditor').then((c) => c.initEditor(startServer, standaloneServer))
    } else {
      const templateData = data?.find(({ name }) => name === location.pathname)
      if (!templateData) return

      const content = JSON.parse(templateData.content)
      setCss(content.css)
      setHtml(content.html)
    }

    mounted.current = true
  }, [])

  if (showEditor)
    return (
      <div style={{ height: '100%', margin: '0 auto' }}>
        <div id="gjs"></div>
      </div>
    )
  else
    return (
      <>
        <link rel="stylesheet" onLoad={() => setTailwindLoaded(true)} href={tailwindCssUrl} />
        <style> {css}</style>
        {(!standaloneServer || tailwindLoaded) && (
          <div dangerouslySetInnerHTML={{ __html: html ?? '' }}></div>
        )}
        <ToastContainer />
      </>
    )
}
export { ContentProvider }
