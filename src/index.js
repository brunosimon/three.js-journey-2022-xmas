import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 50,
                position: [ 10, 0, 0 ]
            } }
        >
            <Experience />
        </Canvas>
        <Leva collapsed />
    </>
)