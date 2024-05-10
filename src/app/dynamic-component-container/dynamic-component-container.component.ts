import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  importProvidersFrom,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-component-container',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-container #container></ng-container>',
})
export class DynamicComponentContainerComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  components: ComponentRef<any>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(component: any) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.container.createComponent(component);
    this.components.push(componentRef);
  }

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.components[index];
      this.components[index] = this.components[index - 1];
      this.components[index - 1] = temp;
      this.renderComponents();
    }
  }

  moveDown(index: number) {
    if (index < this.components.length - 1) {
      const temp = this.components[index];
      this.components[index] = this.components[index + 1];
      this.components[index + 1] = temp;
      this.renderComponents();
    }
  }

  private renderComponents() {
    this.container.clear();
    this.components.forEach((component) =>
      this.container.insert(component.hostView)
    );
  }
}
