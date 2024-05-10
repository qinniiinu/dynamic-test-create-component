import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  standalone: true,
  imports: [],
  template: '<p>1</p>',
})
export class MyComponent2 {}

@Component({
  selector: 'app-my',
  standalone: true,
  imports: [],
  template: '<p>2</p>',
})
export class MyComponent1 {}
