/**
 * TypeScript Interfaces
 *
 * This section defines several TypeScript interfaces to type various components and properties:
 *
 * - RootProps: Used for typing the root element of the HTML tree.
 * - dataType: Defines the type for the 'data' property in the StaticBuildProps interface.
 * - StaticBuildProps: Describes the type for the props of the StaticBuild component.
 * - ContentProviderProps: Describes the type for the props of the ContentProvider component.
 */

/**
 * Interfaces TypeScript
 *
 * Esta sección define varias interfaces de TypeScript para tipificar varios componentes y propiedades:
 *
 * - RootProps: Se usa para tipificar el elemento raíz del árbol HTML.
 * - dataType: Define el tipo para la propiedad 'data' en la interfaz StaticBuildProps.
 * - StaticBuildProps: Describe el tipo para las propiedades del componente StaticBuild.
 * - ContentProviderProps: Describe el tipo para las propiedades del componente ContentProvider.
 */

interface RootProps {
  childNodes: RootProps[]
  attrs: map<string, string>
  tagName: string
  classNames: string
  nodeType: number
  innerText: string
  constructor: any
}
export { RootProps }

interface dataType {
  content: string
  name?: string
}
export { dataType }

interface StaticBuildProps {
  data?: dataType[]
}

interface ContentProviderProps extends StaticBuildProps {
  showEditorInProd: boolean
  standaloneServer: boolean
}
export { ContentProviderProps }
