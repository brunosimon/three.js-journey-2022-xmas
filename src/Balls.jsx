import { useRef, useMemo, useState } from 'react'
import { BallCollider, InstancedRigidBodies, RigidBody } from '@react-three/rapier'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useControls } from 'leva'
import { useGLTF } from '@react-three/drei'

export default function Balls()
{
    const bodies = useRef()
    const pusher = useRef()
    const intersectionPlane = useRef()
    const { size: { width, height } } = useThree()
    const ratio = width / height
    const [ target ] = useState(() => new Vector3())

    const options = useControls(
        'balls',
        {
            restitution: { value: 0.5, min: 0, max: 1 },
            friction: { value: 0.5, min: 0, max: 1 },
            force: { value: 0.2, min: 0, max: 2 },
            roughness: { value: 0.15, min: 0, max: 1 },
            metalness: { value: 1, min: 0, max: 1 },
            damping: { value: 1, min: 0, max: 1 },
            envMapIntensity: { value: 2.5, min: 0, max: 5 },
        }
    )

    const count = 120
    const transforms = useMemo(() =>
    {
        const positions = []
        const rotations = []
        const scales = []

        for(let i = 0; i < count; i++)
        {
            positions.push([
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            ])
            rotations.push([
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            ])

            scales.push([ 0.6, 0.6, 0.6 ])
        }

        return { positions, rotations, scales }
    }, [])

    useFrame((state) =>
    {
        intersectionPlane.current.lookAt(state.camera.position)

        pusher.current.setNextKinematicTranslation(target)

        bodies.current.forEach((body) =>
        {
            const bodyPosition = body.translation()
            const force = new Vector3()
            force
                .sub(bodyPosition)
                .normalize()
                .multiplyScalar(options.force)
            body.applyImpulse(force)
        })
    })

    const pointerMove = (event) =>
    {
        target.copy(event.point)
    }

    const ball = useGLTF('models/ball.glb')

    return <>
        <mesh
            ref={ intersectionPlane }
            scale={ [ 8.3 * ratio, 8.3, 1 ] }
            onPointerMove={ pointerMove }
            visible={ false }
        >
            <planeGeometry />
            <meshBasicMaterial wireframe />
        </mesh>
        <RigidBody
            ref={ pusher }
            type="kinematicPosition"
            colliders={ false }
            restitution={ 0 }
        >
            <BallCollider args={ [ 2 ] } />
        </RigidBody>
        <InstancedRigidBodies
            ref={ bodies }
            colliders={ false }
            positions={ transforms.positions }
            rotations={ transforms.rotations }
            scales={ transforms.scales }
            restitution={ options.restitution }
            friction={ options.friction }
            linearDamping={ options.damping }
            angularDamping={ options.damping }
        >
            <instancedMesh
                castShadow
                receiveShadow
                args={ [ null, null, count ] }
                geometry={ ball.nodes.ball.geometry }
            >
                <meshStandardMaterial
                    vertexColors
                    roughness={ options.roughness }
                    metalness={ options.metalness }
                    envMapIntensity={ options.envMapIntensity }
                />
            </instancedMesh>
            <BallCollider args={ [ 1 ] } />
        </InstancedRigidBodies>
    </>
}