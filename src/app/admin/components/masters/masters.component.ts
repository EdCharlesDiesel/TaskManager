import { Component, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentLoaderDirective } from '../../../directives/component-loader.directive'
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { TabObjectModel } from 'src/app/models/tabModel';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent {
  masterMenuItems = [
    { itemName: "Countries", displayName: "Countries", component: CountriesComponent },
    { itemName: "ClientLocations", displayName: "Client Locations", component: ClientLocationsComponent },
    { itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent },
    { itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent },
  ];

  activeItem = '';
  tabs: TabObjectModel[] = [];

  @ViewChildren(ComponentLoaderDirective) componentLoaders: QueryList<ComponentLoaderDirective> | any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainterRef: ViewContainerRef) {
  }


  menuItemClick(clickedMasterMenuItem: any): void {
    //console.log(clickedMasterMenuItem);

    this.activeItem = clickedMasterMenuItem.itemName;

    const matchingTabs = this.tabs.filter((tab: any) => {
      return tab.itemName == clickedMasterMenuItem.itemName
    });

    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });

      setTimeout(() => {
        const componentLoadersArray = this.componentLoaders.toArray();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);

        const viewContainterRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;

        const componentRef = viewContainterRef.createComponent(componentFactory);

        this.tabs[this.tabs.length - 1].viewContainerRef = this.viewContainterRef;

        if (clickedMasterMenuItem.component.name == "CountriesComponent")

          componentRef.instance as CountriesComponent;
        // componentInstance.message = "Hello to Countries";

      }, 100);
    }
  }

  onCloseClick(clickedTab: any): void {
    clickedTab.viewContainerRef.remove();
    this.tabs.splice(this.tabs.indexOf(clickedTab), 1);
    if (this.tabs.length > 0) {
      this.activeItem = this.tabs[0].itemName;
    }
  }
}

