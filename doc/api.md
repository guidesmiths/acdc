# Task Libraries
## array
### merge
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | array |  |
## collection
### map
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives | optional |
|  task  | any |  |
## date
### formatDate
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | date | optional |
|  format  | any |  |
### parseDate
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | string | optional |
|  format  | any |  |
## flow
### domain
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  name  | any |  |
|  task  | any |  |
|  params  | any |  |
### fork
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  tasks  | any |  |
### output
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  value  | any |  |
### run
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  name  | any |  |
|  task  | any |  |
|  params  | any |  |
### sequence
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  tasks  | any |  |
## hogan
### render
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | object | optional |
|  template  | any |  |
## jsonPointer
### copy
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  from  | any |  |
|  to  | any |  |
### copyUnless
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  to  | any |  |
### copyWhen
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  to  | any |  |
### get
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  path  | any |  |
### set
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  path  | any |  |
|  value  | any |  |
### transform
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
### transformUnless
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
### transformWhen
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
## logic
### always
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any |  |
### and
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  tasks  | any |  |
### choose
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  options  | any |  |
### contains
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | array |  |
|  value  | any |  |
### eq
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  value  | any |  |
### falsey
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any |  |
### not
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  task  | any |  |
### or
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  tasks  | any |  |
### otherwise
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  task  | any |  |
### truthy
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any |  |
### unless
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  task  | any |  |
### when
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  task  | any |  |
## numeric
### parseFloat
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | number | optional |
### parseInteger
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | number | optional |
|  radix  | any |  |
## property
### copy
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  from  | any |  |
|  to  | any |  |
### copyUnless
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  to  | any |  |
### copyWhen
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  to  | any |  |
### debug
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  path  | any |  |
|  template  | any |  |
### get
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  path  | any |  |
### set
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  path  | any |  |
|  value  | any |  |
### transform
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | alternatives |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
### transformUnless
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
### transformWhen
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
|  condition  | any |  |
|  from  | any |  |
|  transformer  | any |  |
|  to  | any |  |
## string
### format
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | array | optional |
|  template  | any |  |
### lowercase
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | string | optional |
### str
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | any | optional |
### uppercase
|  Paramter  |  Type  |  Attributes  |
|------------|--------|--------------|
|  input     | string | optional |
