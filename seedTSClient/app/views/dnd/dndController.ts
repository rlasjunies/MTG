module app.views.dnd {
    "use strict";

    interface IDndScope extends ng.IScope {
    }

    export class DndController {
        private ElSource: ng.IAugmentedJQuery;
        private ElTarget: ng.IAugmentedJQuery;

        static $inject = [
            "$log",
            "$mdSidenav",
            "$scope",
            "$animate",
            "$compile"
        ];
        constructor(private $log: ng.ILogService,
            private $mdSidenav: any,
            private $scope: IDndScope,
            private $animate: ng.IAnimateService,
            private $compile:ng.ICompileService
            ) {
            this.$log.debug("dndController: Constructor");
        }

        //Events fired on the draggable target (the source element):
        //ondragstart - fires when the user starts to drag an element
        //ondrag - fires when an element is being dragged
        //ondragend - fires when the user has finished dragging the element

        //Events fired on the drop target:
        //ondragenter - fires when the dragged element enters the drop target
        //ondragover - fires when the dragged element is over the drop target
        //ondragleave - fires when the dragged element leaves the drop target
        //ondrop - fires when the dragged element is dropped on the drop target

        onDragStart = (evt: DragEvent) => {
            var target: any = evt.target;
            evt.dataTransfer.setData("text", target.id);

            this.ElSource = this.find(target.id);

            console.log("Drag started: sourceId:" + target.id);
        }

        onDragEnd = (evt: DragEvent) => {
            this.ElSource = null;
        }

        onDrop = (evt: DragEvent) => {
            evt.preventDefault();
            var sourceId = evt.dataTransfer.getData("text");

            var target: any = evt.target;
            var targetId = target.id;

            console.log("Drop: sourceId = " + sourceId);
            console.log("Drop: targetId =" + targetId);

            //var sourceEl = this.find(sourceId);
            var targetEl = this.find(targetId);
            //this.$animate.move(sourceEl, targetEl, null);
            this.$animate.move(this.ElSource, targetEl,null);
        }

        find = (id: string): ng.IAugmentedJQuery => {
            return angular.element(document.querySelector("#" + id));
        }

        allowDrop = (evt: DragEvent) => {
            evt.preventDefault();
            console.log("allowDrop");
        }

    }

    angular
        .module("app")
        .controller("app.views.dnd.DndController", app.views.dnd.DndController);
}
