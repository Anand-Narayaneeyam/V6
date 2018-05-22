import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges, DoCheck, OnInit, ElementRef } from '@angular/core';


@Component({
    selector: 'node',
    templateUrl: 'app/Framework/Views/FileExplorer/fileexplorer.component.html',
    directives: [NodeComponent]
})

export class NodeComponent {
    @Input() node: TreeNode;
    @Input() index: number;
    @Output() clicked: EventEmitter<TreeNode>;
    @Output() folderexpand: EventEmitter<TreeNode>;
    /*expandIcon: string = "Content/Images/arrows_down.png";
    hideIcon: string = "Content/Images/ arrows_up.png";*/
    expandIcon: string = "Content/Images/folder-close.png";
    hideIcon: string = "Content/Images/folder-close.png";
    downarrowIcon: string = "Content/Images/arrows_down.png";
    uparrowIcon: string = "Content/Images/arrows_right.png";
    noIcon: string = "Content/Icons/no_expanD.png";

    constructor() {
        this.clicked = new EventEmitter<TreeNode>();
        this.folderexpand = new EventEmitter<TreeNode>();
    }

    isExpandable(): boolean {

        let isDirectory: boolean;
        if (this.node && ((this.node.children && this.node.children.length > 0) || this.node.HasChild))
            return true;
        else
            return false;

    }

    isExpanded(): boolean {
        if (this.node.Isexpanded && this.node.children && this.node.children.length > 0)
            return true;
        else
            return false;
    }

    expandFolder(node: TreeNode): void {
        if (this.node.Isexpanded) {
            this.node.Isexpanded = false;
        } else {
            this.node.Isexpanded = true;
            this.folderexpand.emit(node);
        }
    }

    clickItem(node: TreeNode) {
        this.clicked.emit(node)
    }

    propagate(node: TreeNode) {
        this.clicked.emit(node)
    }
    propagateexpand(node: TreeNode)
    {
        this.folderexpand.emit(node);
    }
}

export interface TreeNode {
    
    children?: Array<TreeNode>
    fieldname: string
    id: string,
    label: string,
    levelno: string,
    Isexpanded?: boolean;
    parentLabel: string[],
    parentFieldName: string[]
    HasChild?: boolean;
}