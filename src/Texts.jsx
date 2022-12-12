import { Center, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { MeshBasicMaterial } from 'three'

const material = new MeshBasicMaterial({
    color: [ 1.15, 1.15, 1.15 ],
    toneMapped: false
})

export default function Texts()
{
    const { size: { width, height } } = useThree()
    const ratio = width / height
    const scale = Math.min(1, ratio)
    
    return <group
        position-y={ 1.5 }
        scale={ [ scale, scale, scale ] }
    >
        <Text
            font="./fonts/GreycliffCF-Heavy.woff"
            fontSize={ 1 }
            rotation-y={ Math.PI * 0.5 }
            text={'Merry Christmas!'}
            textAlign="center"
            material={ material }
        />

        <Text
            font="./fonts/GreycliffCF-Heavy.woff"
            fontSize={ 0.5 }
            rotation-y={ Math.PI * 0.5 }
            position-y={ - 1.5 }
            text={'Three.js Journey is 30% off\nwith the discount code'}
            textAlign="center"
            material={ material }
        />

        <Text
            font="./fonts/GreycliffCF-Heavy.woff"
            fontSize={ 1 }
            rotation-y={ Math.PI * 0.5 }
            position-y={ - 3 }
            text={'2022XMAS'}
            textAlign="center"
            material={ material }
            onClick={ () => { window.open('https://threejs-journey.com/join/2022XMAS', '_blank') } }
            onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
            onPointerLeave={ () => { document.body.style.cursor = 'default' } }
        />
    </group>
}