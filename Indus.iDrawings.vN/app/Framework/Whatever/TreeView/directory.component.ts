export class Directory {
    Id: any;
    root: string;
    directories: Array<Directory>;
    children: Array<file>;
    treetype: boolean;
    expanded: boolean;
    checked: boolean;
    level: any;
    constructor(dataKey,name, directories, files,type,level) {
        this.Id = dataKey;   
        this.root = name;
        this.children = files;
        this.directories = directories; 
        this.treetype = type;
        this.expanded = true;
        this.checked = false;
        this.level = level;
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    check() {
        if (this.treetype == true) {
            let newState = !this.checked;
            this.checked = newState;
            this.checkRecursive(newState);
        }
    }
    checkRecursive(state) {
        if (this.treetype == true) {
            this.directories.forEach(d => {
                d.checked = state;
                d.checkRecursive(state);
            })
        }
    }
}

export interface file {
    Id: number;
    Value: string;
}