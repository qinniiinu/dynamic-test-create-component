import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "zone.js";
import { DynamicComponentContainerComponent } from "./app/dynamic-component-container/dynamic-component-container.component";
import { MyComponent1, MyComponent2 } from "./app/my/my.component";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <button (click)="loadComponent(MyComponent1)">Load Component 1</button>
    <button (click)="loadComponent(MyComponent2)">Load Component 2</button>
    <div>
      <app-dynamic-component-container></app-dynamic-component-container>
      @if(dynamicComponentContainer){ @for( component of
      dynamicComponentContainer.components; track component;let index = $index){
      <div>
        <button (click)="dynamicComponentContainer.moveUp(index)">
          Move Up
        </button>
        <button (click)="dynamicComponentContainer.moveDown(index)">
          Move Down
        </button>
      </div>
      } }
    </div>
  `,
  styles: `.flex{
    display:flex;
  }`,
  imports: [DynamicComponentContainerComponent, MyComponent2, MyComponent1],
})
export class App {
  @ViewChild(DynamicComponentContainerComponent, {
    read: DynamicComponentContainerComponent,
    static: false,
  })
  dynamicComponentContainer!: DynamicComponentContainerComponent;

  name = "Angular";
  MyComponent1 = MyComponent1;
  MyComponent2 = MyComponent2;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(component: any) {
    console.log(this.dynamicComponentContainer);
    this.dynamicComponentContainer.loadComponent(component);
  }
}

bootstrapApplication(App);
