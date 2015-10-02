# Task Libraries
## array
### merge
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | array | Yes | |
## collection
### map
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | No | |
|  task   | object | Yes |  |
|  key   | string | No | key |
|  value   | string | No | value |
## date
### formatDate
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | date | No | |
|  format   | string | No |  |
### parseDate
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | string | No | |
|  format   | alternatives | No |  |
## flow
### domain
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  name   | string | No |  |
|  task   | alternatives | Yes |  |
|  params   | object | No |  |
### fork
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | alternatives | Yes |  |
### output
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  value   | any | No |  |
### run
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  name   | string | No |  |
|  task   | alternatives | Yes |  |
|  params   | object | No |  |
### sequence
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | alternatives | Yes |  |
## hogan
### render
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | object | No | |
|  template   | string | Yes |  |
## jsonPointer
### copy
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  to   | string | No |  |
### copyUnless
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |
### copyWhen
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |
### get
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  path   | string | Yes |  |
### set
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  path   | string | Yes |  |
|  value   | any | No |  |
### transform
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
### transformUnless
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
### transformWhen
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
## logic
### always
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      |  | Yes | |
### and
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | array | Yes |  |
### choose
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  options   | array | Yes |  |
### contains
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | array | Yes | |
|  value   | any | Yes |  |
### eq
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  value   | any | Yes |  |
### falsey
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      |  | Yes | |
### not
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  task   | object | Yes |  |
### or
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | array | Yes |  |
### otherwise
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  task   | object | Yes |  |
### truthy
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      |  | Yes | |
### unless
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  task   | object | Yes |  |
### when
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  task   | object | Yes |  |
## numeric
### parseFloat
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | number | No | |
### parseInteger
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | number | No | |
|  radix   | number | No | 10 |
## property
### copy
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  to   | string | No |  |
### copyUnless
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |
### copyWhen
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |
### debug
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  path   | string | No |  |
|  template   | string | No | %s |
### get
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  path   | string | Yes |  |
### set
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  path   | string | Yes |  |
|  value   | any | No |  |
### transform
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
### transformUnless
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
### transformWhen
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |
## string
### format
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | array | No | |
|  template   | string | Yes |  |
### lowercase
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | string | No | |
### str
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
### uppercase
|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | string | No | |
