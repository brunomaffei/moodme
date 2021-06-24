import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

// import neural network model:
import NN from '../contrib/WebARRocksFace/neuralNets/NN_FULLMAKEUP_2.json'

// import Shape2D helper:
import shape2DHelper from '../contrib/WebARRocksFace/helpers/WebARRocksFaceShape2DHelper.js'

// ASSETS:
//FLAGS
import brazilFlag from '../../assets/flags/brazil.png'
import franceFlag from '../../assets/flags/france.png'
import belgiumFlag from '../../assets/flags/belgium.png'
import portugalFlag from '../../assets/flags/portugal.png'

const compute_sizing = () => {
  // compute  size of the canvas:
  const height = window.innerHeight
  const wWidth = window.innerWidth
  const width = Math.min(wWidth, height)

  // compute position of the canvas:
  const top = 0
  const left = (wWidth - width) / 2
  return { width, height, top, left }
}


const MakeupSport = (props) => {
  const [sizing, setSizing] = useState(compute_sizing())
  const [isInitialized, setInitialize] = useState(false)

  const canvasVideoRef = useRef()
  const canvasARRef = useRef()

  let _timerResize = null


  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize)
    }
    _timerResize = setTimeout(do_resize, 200)
  }


  const do_resize = () => {
    _timerResize = null
    const newSizing = compute_sizing()
    setSizing(newSizing)
  }


  useEffect(() => {
    if (!_timerResize) {
      shape2DHelper.resize()
    }
  })

  // useEffect to initialize 
  useEffect(() => {
    setTimeout(() => {
      setInitialize(true)
    }, 200)
  }, [props.countries])


  useEffect(() => {
    // init WEBARROCKSFACE through the helper:
    if (isInitialized) {
      shape2DHelper.init({
        NN,
        canvasVideo: canvasVideoRef.current,
        canvasAR: canvasARRef.current,
        shapes: props.countries || []
      }).then(() => {
        // handle resizing / orientation change:
        window.addEventListener('resize', handle_resize)
        window.addEventListener('orientationchange', handle_resize)

        console.log('READY')
      }).catch((err) => {
        throw new Error(err)
      })

      return shape2DHelper.destroy
    }
  }, [isInitialized])

  const history = useHistory()

  return isInitialized ? (
      <div className="imgDiv">
  
          <div onClick={() => {
            if (window.location.pathname !== '/brazil') { 
              setInitialize(false)
              history.push('/brazil')
            }
          }}>
            <img className="brazil" src={brazilFlag} />
          </div>

          <div onClick={() => {
            if (window.location.pathname !== '/france') {
            setInitialize(false)
            history.push('/france')
            }
          }}>
            <img className="france" src={franceFlag} />
          </div>

          <div onClick={() => {
            if (window.location.pathname !== '/belgium') {
            setInitialize(false)
            history.push('/belgium')
            }
          }}>
            <img className="belgium" src={belgiumFlag} />
          </div>
          <div onClick={() => {
            if (window.location.pathname !== '/portugal') {
            setInitialize(false)
            history.push('/portugal')
            }
          }}>
            <img className="portugal" src={portugalFlag} />
      </div>
      <canvas ref={canvasARRef} id='WebARRocksFaceCanvasAR' />
      <canvas ref={canvasVideoRef} id='WebARRocksFaceCanvasVideo' />
    </div >
  ) : null
}

export default MakeupSport
