/**
 * ThemeProvider and ThemeContext
 *
 * This React file performs the following tasks:
 *
 * - Imports necessary modules and components, such as React hooks, shared UI components, and utility functions.
 * - Defines several interfaces for component and context typings.
 * - Initializes an array of theme data with their names and folder references.
 * - Creates a ThemeContext using React's createContext API.
 * - Implements the ThemeProvider functional component, which:
 *    1. Manages the current theme index and other state variables.
 *    2. Implements a side-effect to set the initial theme.
 *    3. Defines a function (updateIndex) to update components and categories based on the selected theme.
 *
 * Exports:
 * - ThemeContext: Context providing access to theme-related variables and functions.
 * - ThemeProvider: React component that wraps the application to provide the ThemeContext.
 *
 * Purpose:
 * This code initializes and provides a context for theme management across the application. It ensures that the UI components conform to the selected theme and allows for easy switching between different themes.
 */

import React, { createContext, useState, useEffect } from 'react'

import { Element } from '@craftjs/core'

import Child from '../shared/Child'

import { Container } from '../shared/Container'
import { Text } from '../shared/Text'
import { Link } from '../shared/Link'
import { Svg } from '../shared/Svg'
import { Button } from '../shared/Button'
import { Image } from '../shared/Image'
import { Component } from '../shared/Child'

import { getThemeUrl } from '../utils/fetch'

const themes = [
  { name: 'Hyper UI', folder: 'hyperui' },
  { name: 'Tailblocks', folder: 'tailblocks' },
  { name: 'Flowrift', folder: 'flowrift' },
  { name: 'Meraki UI', folder: 'meraki-light' },
  { name: 'Preline', folder: 'preline' },
  { name: 'Flowbite', folder: 'flowbite' },
  // TODO ADD Dynamic themes from data folder
]

interface ComponentInterface {
  folder: string
  source: any
}

interface ComponentInterfaceFull extends ComponentInterface {
  displayName: string
  category: string
  source: string
  themeFolder: string
  blockFolder: string
}

interface ContextInterface {
  components: ComponentInterfaceFull[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  resolver: object
  updateIndex: (arg0: number) => void
  standaloneServer: boolean
}

const _resolver = {
  Container,
  Component,
  Element,
  Text,
  Child,
  Link,
  Button,
  Image,
  Svg,
}

const defaultValue = {
  components: [],
  categories: [],
  themeNames: [],
  themeIndex: 0,
  updateIndex: () => {},
  standaloneServer: false,
  resolver: _resolver,
}

const ThemeContext = createContext<ContextInterface>(defaultValue)

type ProviderProps = { children: React.ReactNode; standaloneServer: boolean }

const ThemeProvider: React.FC<ProviderProps> = ({ children, standaloneServer }) => {
  const [themeIndex, setThemeIndex] = useState<number>(defaultValue.themeIndex)
  const [components, setComponents] = useState<ComponentInterfaceFull[]>(defaultValue.components)
  const [categories, setCategories] = useState<string[]>(defaultValue.categories)
  const [resolver, _setResolver] = useState<object>(defaultValue.resolver)

  const themeNames = themes.map((t) => t.name)

  useEffect(() => {
    updateIndex(0)
  }, [])

  const updateIndex = async (index: number) => {
    setThemeIndex(index)

    // set components
    const folder = themes[index].folder
    const url = getThemeUrl(standaloneServer, folder)
    const data = await fetch(url).then((r) => r.json())
    const _components = data.map((c: ComponentInterfaceFull) => ({
      displayName: c.folder.replace(/(\d)/, ' $1'),
      category: c.folder.replace(/\d/g, ''),
      source: c.source,
      themeFolder: folder,
      blockFolder: c.folder,
    })) as ComponentInterfaceFull[]

    // sort components
    const _coponentsSorted = _components.sort((a, b) => {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    })
    setComponents(_coponentsSorted)

    // set categories
    const _categories = _components.map((c: ComponentInterfaceFull) => c.category)
    setCategories([...new Set(_categories)] as string[])
  }

  const value = {
    components,
    categories,
    resolver,
    themeNames,
    themeIndex,
    updateIndex,
    standaloneServer,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
