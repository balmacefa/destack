/**
 * ContentProviderReact Component
 *
 * This is a React functional component that serves as a wrapper around the ContentProvider component.
 *
 * Features:
 * - Uses React hooks for managing state and side effects.
 * - Conditionally loads templates depending on the environment (development/production).
 * - Utilizes the 'loadTemplate' utility to fetch data.
 * - Checks for a property 'components' in the fetched data before setting it to the state.
 *
 * Components and Types:
 * - ContentProvider: Imported from './index'.
 * - dataType: Defines the type of 'data' state.
 *
 * Purpose:
 * To serve as a React wrapper for ContentProvider that can dynamically load templates based on the current environment.
 *
 * Language: ISO 639-1 en
 */

/**
 * Componente ContentProviderReact
 *
 * Este es un componente funcional de React que sirve como un contenedor alrededor del componente ContentProvider.
 *
 * Características:
 * - Utiliza hooks de React para gestionar el estado y los efectos secundarios.
 * - Carga condicionalmente plantillas dependiendo del entorno (desarrollo/producción).
 * - Utiliza la utilidad 'loadTemplate' para obtener datos.
 * - Verifica la existencia de una propiedad 'components' en los datos obtenidos antes de establecerla en el estado.
 *
 * Componentes y Tipos:
 * - ContentProvider: Importado desde './index'.
 * - dataType: Define el tipo del estado 'data'.
 *
 * Propósito:
 * Servir como un contenedor de React para ContentProvider que puede cargar dinámicamente plantillas en función del entorno actual.
 *
 * Idioma: ISO 639-1 es
 */

import React, { FC, useEffect, useState, useRef } from 'react'

import { ContentProvider } from './index'
import { dataType } from '../../../types'

import { loadTemplate } from '../utils'

const isDev = '_self' in React.createElement('div')

const ContentProviderReact: FC = () => {
  const mounted = useRef<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [data, setData] = useState<dataType[] | undefined>()

  const loadData = async () => {
    const data = await loadTemplate(true)

    if (!data) return
    const content = JSON.parse(data)

    if (!content.components) return
    setData(content)
    setLoaded(true)
  }

  useEffect(() => {
    if (mounted.current) return

    if (!isDev) {
      loadData()
    } else {
      setData(undefined)
      setLoaded(true)
    }

    mounted.current = true
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {loaded && <ContentProvider data={data} standaloneServer={true} showEditorInProd={false} />}
    </div>
  )
}

export { ContentProviderReact }
