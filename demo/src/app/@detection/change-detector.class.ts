// ChangeDetectorRef
import { ChangeDetectorRef } from '@angular/core';

// Class.
import { ChangeDetection } from './change-detection.class';

// Type.
import { SetterCallback } from '@angular-package/property';

/**
 * 
 */
export class ChangeDetector<Cmp extends object | Function> {
  /**
   * Indicates `detached` state of the component given in the constructor.
   */
  public get detached() {
    return this.#detached;
  }

  /**
   * The property contains the change detector instance of the component given in the constructor.
   */
  public get detector() {
    return this.#detector;
  }

  /**
   * 
   */
  public get detection() {
    return this.#detection;
  }

  /**
   * 
   */
  #detector!: ChangeDetectorRef;

  /**
   * Private property string-type of the found change detector in the component given in the constructor.
   */
  #changeDetectorRefKey!: keyof Cmp;

  /**
   * Component detached status.
   */
  #detached = false;

  /**
   * Component detection.
   */
  #detection!: ChangeDetection<Cmp>;

  /**
   *
   * @param component
   * @param keys
   * @param callbackFn
   * @angularpackage
   */
  constructor(
    component: Cmp,
    keys: (keyof Cmp)[],
    callbackFn?: SetterCallback<Cmp, keyof Cmp>
  ) {
    // Set picked key of the change detector.
    if (typeof this.#setDetectorKey(component) === 'string') {
      // Set the detector to use.
      this.#detector = component[this.#changeDetectorRefKey] as any;

      // Detection.
      this.#detection = new ChangeDetection(
        this.#changeDetectorRefKey,
        component,
        keys,
        callbackFn
      );

      // Detach component on initialize to use `detectChanges()`.
      this.detach();
    }
  }

  /**
   * Detaches the component from the change detector tree and sets property `detached` to `true`.
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public detach(): this {
    (setTimeout(() => this.#detector && this.#detector.detach(), 0), this.#detached = true);
    return this;
  }

  /**
   * 
   * @returns 
   */
  public detect(key?: keyof Cmp): this {
    setTimeout(() => this.#detector && this.#detection.detect(key), 0);
    return this;
  }

  /**
   * Detaches the component from the change detector tree and sets property `detached` to `true`.
   * @returns The return value is an instance of `ChangeDetector`.
   * @angularpackage
   */
  public reattach(): this {
    (setTimeout(() => this.#detector && this.#detector.reattach()), this.#detached = false);
    return this;
  }

  /**
   * The method returns the property name of found change detector in the specified component.
   * @param component Component to find change detector instance.
   * @returns The return value is a string-type property name of the given `component` under which the change detector is stored.
   * @angularpackage
   */
  #setDetectorKey(component: Cmp): keyof Cmp {
    let prop;
    if (this.#changeDetectorRefKey === undefined) {
      if (typeof component === 'object') {
        Object
          .keys(component)
          .forEach(property => (
            (prop = component[property as keyof typeof component]),
            typeof prop === 'object' && prop !== null && 'detectChanges' in prop &&
              'reattach' in prop &&
              'detach' in prop &&
              (this.#changeDetectorRefKey = property as keyof Cmp),
            false
          )
        );
      }
      if (this.#changeDetectorRefKey === undefined) {
        throw new Error(`
          Problem: ChangeDetectorClass: couldn't find ChangeDetectorRef instance.
          Quick fix: Add to constructor "public changeDetectorRef: ChangeDetectorRef".
        `);
      }
    }
    return this.#changeDetectorRefKey;
  }
}
