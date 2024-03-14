import { ResponsiveNetwork } from '@nivo/network'
import data from '../../const/nivo.json'

export const Nivo = (props:{widthClass:string, heightClass:string}) => (
    <div className={`${props.widthClass} ${props.heightClass} bg-primary`}>
    <ResponsiveNetwork
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance={e=>e.distance}
        centeringStrength={0.3}
        repulsivity={6}
        nodeSize={n=>n.size}
        activeNodeSize={n=>1.5*n.size}
        nodeColor={e=>e.color}
        nodeBorderWidth={1}
        nodeBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.8
                ]
            ]
        }}
        linkThickness={n=>2+2*n.target.data.height}
        linkBlendMode="multiply"
        motionConfig="wobbly"
    />
    </div>
)