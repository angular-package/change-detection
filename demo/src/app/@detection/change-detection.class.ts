// ChangeDetectorRef
import { ChangeDetectorRef } from '@angular/core';

// Property.
// import { Property } from '../../../../../property/src/lib';
import { Property } from '@angular-package/property';

// Type.
// import { SetterCallback } from '../../../../../property/src/type';
import { SetterCallback } from '@angular-package/property';
import { DetectionProperties } from './type/detection-properties.type';

/**
 * 
 */
export class ChangeDetection<Cmp extends object | Function> {
  /**
   * Deactivated properties.
   */
  public get deactivated(): Set<keyof Cmp> {
    return this.#deactivated;
  }

  /**
   * The `get` accessor returns the list of detectable property names if set.
   * @returns The return value is the `Set` object containing the list of detectable properties.
   * @angularpackage
   */
  public get detectable(): Set<keyof Cmp> {
    return this.#property.wrapped as any;
  }

  /**
   * The property indicates the detection state of the component given in the constructor. When set to `true` all the properties indicated
   * as detectable perform `detectChanges()` of `detector` on set.
   */
  public get detection() {
    return this.#detection;
  }

  /**
   * 
   */
  public get properties() {
    return this.#properties;
  }

  /**
   * 
   */
  #changeDetectorRef!: ChangeDetectorRef;

  /**
   * Deactivated properties.
   */
  #deactivated: Set<keyof Cmp> = new Set();

  /**
   * Component detection status.
   */
  #detection = false;

  /**
   * Private property of `Property` handles inject detection to specified properties.
   */
  #property!: Property<Cmp, keyof Cmp>;

  /**
   * Detection properties.
   */
  #properties: DetectionProperties<Cmp> = {};

  /**
   *
   * @param component
   * @param keys
   * @param callbackFn
   * @angularpackage
   */
  constructor(
    changeDetectorRefKey: keyof Cmp, // ChangeDetector<Cmp>,
    component: Cmp,
    keys: (keyof Cmp)[],
    callbackFn?: SetterCallback<Cmp, keyof Cmp>
  ) {
    keys.forEach(property => Object.assign(this.#properties, { [property]: true }));

    // Set the detector to use.
    this.#changeDetectorRef = component[changeDetectorRefKey] as unknown as ChangeDetectorRef;

    // Set detection to specified keys on initialize with the given optional `callbackFn`.
    this.#property = Property.wrap(
      component,
      keys,
      undefined,
      this.#defineDetectionCallback(callbackFn)
    );
  }

  /**
   * Activates detection in the component of the given deactivated properties, which means perform `detectChanges` on set if detection is
   * enabled.
   * @param keys
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public activate(...keys: (keyof Cmp)[]): this {
    Array.isArray(keys) && keys.forEach((key) => this.#deactivated.delete(key));
    return this;
  }

  /**
   * Deactivates detection in the component of the given properties, which means detectable properties don't perform `detectChanges` on set
   * if detection is enabled.
   * @param keys
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public deactivate(...keys: (keyof Cmp)[]): this {
    Array.isArray(keys) && keys.forEach(key => this.#deactivated.add(key));
    return this;
  }

  /**
   * Disables detection in the component, which means detectable properties don't  perform `detectChanges` on set.
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public disable(): this {
    this.#detection = false;
    return this;
  }

  /**
   * Enables detection in the component, which means detectable(not deactivated) properties perform `detectChanges` on set.
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public enable(): this {
    this.#detection = true;
    return this;
  }

  /**
   * Checks whether the component property of the given `key` is detectable.
   * @param key The property name of component to check.
   * @returns The return value is a `boolean` type indicating whether the component property of the given `key` is detectable.
   * @angularpackage
   */
  public has(key: keyof Cmp): boolean {
    return this.#property?.wrapped.has(key) || false;
  }

  /**
   * Checks whether the component property of the given `key` is deactivated from detection.
   * @param key The property name of `keyof Cmp` to check.
   * @returns The return value is a `boolean` type indicating whether the property is deactivated from the detection.
   * @angularpackage
   */
  public isDeactivated(key: keyof Cmp): boolean {
    return this.#deactivated.has(key);
  }

  /**
   * Removes properties given in the `keys` from the detectable, which means they don't perform `detectChanges()` on set.
   * @param keys An array of `keyof Cmp` to remove from the detectable.
   * @returns The return value is an instance of `ChangeDetector` for the chaining purpose.
   * @angularpackage
   */
  public remove(...keys: (keyof Cmp)[]): this {
    this.#property?.unwrap(...keys);
    return this;
  }

  /**
   * Sets detection on `set` to the component properties of the given `keys` making them detectable, which means each performs
   * `detectChanges()` on set.
   * @param keys The component keys of an `Array` to set detection.
   * @param callbackFn Optional callback function to inject with detection.
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public set<Keys extends keyof Cmp>(
    keys: Keys[],
    callbackFn?: SetterCallback<Cmp, Keys>
  ): this {
    this.#property?.wrap(
      keys,
      undefined,
      this.#defineDetectionCallback(callbackFn)
    );
    return this;
  }

  /**
   * Defines function with detection and optional callback function to inject to property setter.
   * @param callbackFn Callback function of generic type `SetterCallback` to inject along with detection.
   * @returns The return value is the function to detect changes on set in the specified property with optional callback function.
   * @angularpackage
   */
  #defineDetectionCallback<Key extends keyof Cmp>(
    callbackFn?: SetterCallback<Cmp, Key>
  ): SetterCallback<Cmp, Key> {
    return (value: Cmp[Key], oldValue: Cmp[Key], key: Key, instance: Cmp) => {
      typeof callbackFn === 'function' &&
        callbackFn(value, oldValue, key, instance);
      this.detection === true &&
        this.deactivated.has(key) === false &&
        this.#changeDetectorRef?.detectChanges();
    };
  }
}
