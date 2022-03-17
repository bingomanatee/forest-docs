import { Leaf } from '@wonderlandlabs/forest'

export function makeField(title, type, validator) {
  return new Leaf({
      title,
      value: '',
      type,
      touched: false
    },
    {

      actions: {
        reset(leaf){
          leaf.next({value: '', touched: false});
        },
        update(leaf, value) {
          leaf.do.setValue(value)
          leaf.do.setTouched(true)
        },
        isValid(leaf) {
          return !leaf.do.errors()
        },
        isEmpty(leaf) {
          return !leaf.value.value
        },
        errors(leaf) {
          if (leaf.do.isEmpty()) {
            return 'must have a value'
          }
          return validator(leaf.value.value)
        }
      }
    })
}
