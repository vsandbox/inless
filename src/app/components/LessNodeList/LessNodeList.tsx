import * as React from 'react';
import {Observable, Subscription} from 'rxjs';
import {ILessNode} from '../../../interfaces/ILessNode';
import {ILessRenderer} from '../../../interfaces/ILessRenderer';
import {ILessMap} from '../../../interfaces/types';

export interface ILessNodeListProps {
    nodes$: Observable<Array<ILessNode>>;
    renderers: ILessMap<ILessRenderer>;
}

export interface ILessNodeListState {
    nodes: Array<ILessNode>;
}

export class LessNodeList extends React.Component<ILessNodeListProps, ILessNodeListState> {
    // subscription to stream of nodes
    private nodesSubscription: Subscription;

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
        const {renderers} = this.props;
        
        const elements = nodes.map(node => {
            const renderer = renderers[node.type];
            if (!renderer) throw new Error(`'${node.type}' renderer not found`);
            if (typeof renderer !== 'function') throw new Error(`'${node.type}' renderer is not a function`);
            
            const element = renderer(node);
            if (!React.isValidElement(element)) throw new Error(`${node.type} renderer returns invalid element`);
            if (!element.key) throw new Error(`${node.type} renderer returns element without key`);

            return element;
        });

        return (
            <div>{elements}</div>
        );
    }

    private update(diff: any) {
        this.setState(Object.assign({}, this.state, diff));
    }
}
