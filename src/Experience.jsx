import { Environment, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Debug, Physics } from '@react-three/rapier'
import Fog from './Fog.jsx'
import { useControls } from 'leva'
import Balls from './Balls.jsx'
import Texts from './Texts.jsx'

export default function Experience()
{
    const options = useControls({
        debug: { value: false },
        environmentPreset: {
            value: 'sunset',
            options: [ 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby' ]
        }
    })
    
    return <>

        { options.debug && <Perf position="top-left" /> }

        {/* <OrbitControls
            makeDefault
            maxPolarAngle={ Math.PI * 0.49 }
            enablePan={ false }
            minDistance={ 1 }
            maxDistance={ 30 }
        /> */}

        {/* <Effects /> */}
        
        {/* Fog */}
        <Fog />

        <Environment preset={ options.environmentPreset } />

        <Physics gravity={ [ 0, 0, 0 ] }>

            {/* <Debug /> */}
            <Texts />
            <Balls />

        </Physics>

    </>
}