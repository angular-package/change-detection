// Angular.
import { ChangeDetectorRef } from '@angular/core';

// Type.
import { DetectionProperties } from '../type/detection-properties.type';

/**
 * Helper class for component.
 */
export abstract class ChangeDetectionHelper<Cmp extends Object | Function, Value> {
  public detached?: boolean;
  public detection?: boolean;
  public readonly properties?: DetectionProperties<Cmp>;

  /**
   * 
   * @param changeDetectorRef 
   */
  constructor(public changeDetectorRef: ChangeDetectorRef) {}
}
