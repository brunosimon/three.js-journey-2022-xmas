import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Logo()
{
    const model = useGLTF('models/logo.glb')
    const body = useRef()

    const options = useControls(
        'model',
        {
            color: { value: '#a270ff' },
            intensity: { value: 3.8, min: 1, max: 10 },
            restitution: { value: 1, min: 0, max: 1 }
        }
    )

    const color = new THREE.Color(options.color)

    return <>
        {/* <group rotation={ [ 0, 0.7, 0 ] } position={ [ - 1, 2.5, 6 ] }>
            <mesh geometry={ model.nodes.logo.geometry } rotation={ [ Math.PI * 0.5, 0, 0 ] }>
                <meshBasicMaterial color={ [ color.r * options.intensity, color.g * options.intensity, color.b * options.intensity ] } toneMapped={ false }/>
            </mesh>
            <pointLight color={ color } />
        </group> */}
        <RigidBody ref={ body } colliders="hull" position={ [ 1, 4, 2 ] } restitution={ options.restitution }>
            <mesh geometry={ model.nodes.logo.geometry } rotation-x={ - Math.PI * 0.5 }>
                <meshBasicMaterial color={ [ color.r * options.intensity, color.g * options.intensity, color.b * options.intensity ] } toneMapped={ false }/>
            </mesh>
            <pointLight color={ color } />
        </RigidBody>
    </>
}