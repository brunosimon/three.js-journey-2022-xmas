export default function Lights()
{
    return <>
        <directionalLight castShadow position={ [ 2, 0, 3 ] } intensity={ 10 } />
        {/* <ambientLight intensity={ 0.5 } /> */}
    </>
}