import { ViewContainerRef } from '@angular/core';
export interface TabObjectModel{
  tabIndex: number
  itemName: string,
  displayName: string,
  viewContainerRef?: ViewContainerRef
}
