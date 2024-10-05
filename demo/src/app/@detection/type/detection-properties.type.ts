/**
 * 
 */
export type DetectionProperties<Cmp extends Object | Function> = Partial<Omit<{
  [Key in keyof Cmp]: boolean;
},
  'changeDetector' |
  'changeDetectorRef' |
  'detached' |
  'detection' |
  'properties'
>>;
