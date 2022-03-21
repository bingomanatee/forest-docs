import { Leaf } from '@wonderlandlabs/forest'

export function makeField(title, type, validator) {
  return new Leaf({
      title,
      value: '',
      type,
      touched: false
    },
    {
      setters: true,
      selectors: {
        isValid({ value , touched}) {
          return touched && (!validator(value));
        },
        isEmpty({ value }) {
          return !value
        },
        errors({ touched, value }) {
          if (!touched) return '';
          if (!value) {
            return 'must have a value'
          }
          return validator(value)
        }
      },
      actions: {
        reset(leaf){
          leaf.do.setValue('');
          leaf.do.setTouched(false);
        },
        update(leaf, value) {
          leaf.do.setValue(value)
          leaf.do.setTouched(true)
        },
      }
    })
}
