import { useControls } from 'leva'

export default function Fog()
{
    const options = useControls(
        'fog',
        {
            backgroundColor: { value: '#ffbf91' },
            range: { value: [ 10, 25 ], min: 0, max: 100 }
        }
    )

    return <>
        <color args={ [ options.backgroundColor ] } attach="background" />
        <fog attach="fog" color={ options.backgroundColor } near={ options.range[0] } far={ options.range[1] } />
    </>
}