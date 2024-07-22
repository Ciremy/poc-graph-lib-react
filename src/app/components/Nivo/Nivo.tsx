import { ResponsiveNetwork } from '@nivo/network'
import data from '../../../const/nivo.json'

// Define the InputNode type
interface InputNode {
    color: string;
    size: number;
    data:any,
}

// Define the NodeTooltipProps type
interface NodeTooltipProps<T extends InputNode> {
    node: T;
}

const CustomNodeTooltipComponent = ({ node }: NodeTooltipProps<InputNode>) => {
    console.log("node :: ", node)
    return(
    <div
        style={{
            background: node.color,
            color: '#000000',
            padding: '9px 12px',
            borderRadius: '2px',
            boxShadow: '0 3px 9px rgba(0, 0, 0, .35)',
        }}
    >
        <br />
        size: {node.size}
        useful_data : {node.data?.useful_data}
    </div>
)}
export const Nivo = (props:{widthClass:string, heightClass:string}) => 

(
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
        nodeTooltip={CustomNodeTooltipComponent} 
        onMouseEnter={(node)=>{console.log("This node is :: ", node)}}
    />
    </div>
)