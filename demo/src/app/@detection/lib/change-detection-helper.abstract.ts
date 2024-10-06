// Angular.
import { ChangeDetectorRef } from '@angular/core';

// Class.
import { ChangeDetector } from '../change-detector.class';

// Type.
import { DetectionProperties } from '../type/detection-properties.type';

/**
 * Helper class for component.
 */
export abstract class ChangeDetectionHelper<Cmp extends Object | Function, Value> {
  public changeDetector?: ChangeDetector<Cmp>;
  public detach?: () => Cmp;
  public detached?: boolean;
  public detect?: (key?: keyof Cmp) => Cmp;
  public detection?: boolean;
  public readonly properties?: DetectionProperties<Cmp>;
  public reattach?: () => Cmp;

  /**
   * 
   * @param changeDetectorRef 
   */
  constructor(public changeDetectorRef: ChangeDetectorRef) {}
}
