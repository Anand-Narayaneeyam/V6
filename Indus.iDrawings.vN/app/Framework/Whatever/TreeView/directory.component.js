var Directory = (function () {
    function Directory(dataKey, name, directories, files, type, level) {
        this.Id = dataKey;
        this.root = name;
        this.children = files;
        this.directories = directories;
        this.treetype = type;
        this.expanded = true;
        this.checked = false;
        this.level = level;
    }
    Directory.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    Directory.prototype.check = function () {
        if (this.treetype == true) {
            var newState = !this.checked;
            this.checked = newState;
            this.checkRecursive(newState);
        }
    };
    Directory.prototype.checkRecursive = function (state) {
        if (this.treetype == true) {
            this.directories.forEach(function (d) {
                d.checked = state;
                d.checkRecursive(state);
            });
        }
    };
    return Directory;
}());
exports.Directory = Directory;
//# sourceMappingURL=directory.component.js.map