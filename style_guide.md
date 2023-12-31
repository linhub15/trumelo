# Developer Style Guide

Follow these conventions for consistency.

- use `undefined` over `null` https://github.com/supabase/supabase-js/issues/244
- avoid premature abstraction unless there is explicit need
- pass arguments as objects (exception: only 1 argument)
- pass optional arguments as `options` object as second parameter
- files names are `snake_case` lowercase and use underscores
- all variable names are `pascalCased`
  - exception: database table columns are `snake_case`
  - exception: search parameters use `snake_case`

### Hooks

- hooks are `camelCased`
- hooks are prefixed with `use`
- hooks are passsed `args`

### Components

- functional components are `PascalCased`
- functional components are passed `props` with a type `Prop` that is not
  exported
