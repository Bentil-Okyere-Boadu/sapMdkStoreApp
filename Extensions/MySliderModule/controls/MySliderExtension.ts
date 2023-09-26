import { IControl } from 'mdk-core/controls/IControl';
	import { Label } from '@nativescript/core/ui/label';
	import { Color } from '@nativescript/core/color';
	import { BaseObservable } from 'mdk-core/observables/BaseObservable';
	
	export class MySliderClass extends IControl {
	
	  protected _label: Label = new Label();
	  private _observable: BaseObservable;
	
	  public view(): any {
		if (!this._label) {
		  this._label = new Label();
		  this._label.text = 'TESTING EXTENSIONS';
		  this._label.backgroundColor = new Color('red');
		} else {
		  this._label.text = 'TESTING EXTENSIONS';
		  this._label.backgroundColor = new Color('red');
		}
		return this._label;
	  }
	
	  public observable() {
		if (!this._observable) {
		  this._observable = new BaseObservable(this, this.definition(), this.page());
		}
		return this._observable;
	  }
	
	  public setContainer(container: IControl) {
		// do nothing
	  }
	
	  public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
		// do nothing
		return Promise.resolve();
	  }
	}