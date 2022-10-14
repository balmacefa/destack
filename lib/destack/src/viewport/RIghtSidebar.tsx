import React, { useState } from 'react'

import { useEditor } from '@craftjs/core'
import { Layers } from '@craftjs/layers'

import styled from 'styled-components'

import { SidebarItem } from './SidebarItem'
import { Toolbar } from '../toolbar/index'

import LayerIcon from '@material-ui/icons/Layers'
import CustomizeIcon from '@material-ui/icons/Edit'

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: 280px;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: #fff;
  margin-right: ${(props) => (props.enabled ? 0 : -280)}px;
`

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true)
  const [toolbarVisible, setToolbarVisible] = useState(true)
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <SidebarDiv enabled={enabled} className="sidebar transition bg-white w-2">
      <div className="flex flex-col h-full">
        <SidebarItem
          icon={CustomizeIcon}
          title="Customize"
          height={!layersVisible ? 'full' : '55%'}
          visible={toolbarVisible}
          onChange={(v) => setToolbarVisible(v)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title="Layers"
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(v) => setLayerVisible(v)}
        >
          <div>
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>
      </div>
    </SidebarDiv>
  )
}