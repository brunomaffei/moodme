import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './styles/index.scss'

import Home from './js/pages/Home'

render(
  <AppContainer>
    <Home/>
  </AppContainer>,
  document.querySelector('#root')
);