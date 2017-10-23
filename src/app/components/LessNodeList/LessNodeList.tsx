import * as React from 'react';
import {Observable, Subject, Subscription} from 'rxjs';
import {ILessNode} from '../../../interfaces/ILessNode';
import {ILessRenderer, ILessSetSocket} from '../../../interfaces/ILessRenderer';
import {ILessMap, ILessVector} from '../../../interfaces/types';

export interface ILessNodeListProps {
    nodes$: Observable<Array<ILessNode>>;
    sockets$: Subject<ILessMap<ILessVector>>;
    renderers: ILessMap<ILessRenderer>;
}

export interface ILessNodeListState {
    nodes: Array<ILessNode>;
}

export class LessNodeList extends React.Component<ILessNodeListProps, ILessNodeListState> {
    // subscription to stream of nodes
    private nodesSubscription: Subscription;
    // temp sockets map. collect sockets to update after render
    private tempSockets: ILessMap<ILessVector> = {};

    public constructor(props: ILessNodeListProps) {
        super(props);
        this.state = {
            nodes: []
        };
    }

    public componentDidMount() {
        this.nodesSubscription = this.props.nodes$.subscribe(nodes => this.update({nodes}));        
    }

    public componentWillUnmount() {
        this.nodesSubscription.unsubscribe();
    }

    public render() {
        const {nodes} = this.state;
        const {renderers, sockets$} = this.props;
        const tempSockets = this.tempSockets;
        const setSocket: ILessSetSocket = (id, position) => this.tempSockets[id] = position; 
        
        const elements = nodes.map(node => {
            const renderer = renderers[node.type];
            if (!renderer) throw new Error(`'${node.type}' renderer not found`);
            if (typeof renderer !== 'function') throw new Error(`'${node.type}' renderer is not a function`);
            
            const element = renderer(node, setSocket);
            if (!React.isValidElement(element)) throw new Error(`${node.type} renderer returns invalid element`);
            if (!element.key) throw new Error(`${node.type} renderer returns element without key`);

            return element;
        });

        return (
            <div>{elements}</div>
        );
    }

    public componentDidUpdate() {
        this.props.sockets$.next(this.tempSockets);
        this.tempSockets = {};
    }

    private update(diff: any) {
        this.setState(Object.assign({}, this.state, diff));
    }
}
