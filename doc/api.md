# Task Libraries
## array
### compact
Compacts arrays of objects


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | array | Yes | |

```
compact([{ name: "fred" }, { age: 41 }, { gender: "Male" }])
```
### merge
Merges arrays of objects. Compacts null values.


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | array | Yes | |

```
merge([{ name: "fred" }, { age: 41 }, { gender: "Male" }])
```
## collection
### map
Iterates over the input, mapping each item to the supplied task.


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | No | |
|  task   | object | Yes |  |
|  key   | string | No | key |
|  value   | string | No | value |

```
map([1, 2, 3], double())
```
## date
### formatDate
Converts a date into a string


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | date | No | |
|  format   | string | No |  |
|  timezone   | string | No |  |

```
format()
```
### parseDate
Parses a string into a date


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | string | No | |
|  format   | alternatives | No |  |
|  timezone   | string | No |  |

```
parseDate()
```
## flow
### domain
Runs a task within a domain


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  name   | string | No |  |
|  task   | alternatives | Yes |  |
|  params   | object | No |  |

```
domain()
```
### fork
Forks the input


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | alternatives | Yes |  |

```
fork({ uc: uppercase(), lc: lowercase(), cc: camelcase() })
```
### output
Sets the input document for subsequent tasks


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  value   | any | No |  |

```
output("New input document")
```
### run
Runs a task


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  name   | string | No |  |
|  task   | alternatives | Yes |  |
|  params   | object | No |  |

```
run(sequence([...]))
```
### sequence
Composes a sequence of tasks


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  tasks   | alternatives | Yes |  |

```
sequence([task1(), task2(), task3()])
```
## hogan
### render
Renders the input document using a hogan template


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | object | No | |
|  template   | string | Yes |  |

```
render("Hello {{firstName}}")
```
## jsonPointer
### copy
Copiess a from one document to another


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  to   | string | No |  |

```
copy("/customer/contact/name", "/name")
```
### copyUnless
Copies a property into a new document unless a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |

```
copyUnless(eq("not applicable"), "/customer/contact/name", "/name"))
```
### copyWhen
Copies a property into a new document when a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  to   | string | No |  |

```
copyWhen(truthy(), "/customer/contact/name", "/name"))
```
### get
Gets a property from a document using a json pointer


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  path   | string | Yes |  |

```
get("/customer/contact/name")
```
### set
Sets a property in a new document using a json pointer


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  path   | string | Yes |  |
|  value   | any | No |  |

```
set("/customer/contact/name")
```
### setUnless
Sets a property in a new document using a json pointer unless a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  path   | string | No |  |
|  value   | any | No |  |

```
setUnless(falsey(), "/customer/contact/name")
```
### setWhen
Sets a property in a new document using a json pointer when a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  path   | string | No |  |

```
setWhen(truthy(), "/customer/contact/name")
```
### transform
Passes the input document through an asynchronous transformation


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |

```
transform("/customer/contact/email", lookup(), "/customer/username")
```
### transformUnless
Passes the input document through an asynchronous transformation unless a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |

```
transformUnless(falsey(), "/customer/contact/email", lookup(), "/customer/username")
```
### transformWhen
Passes the input document through an asynchronous transformation when a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  from   | string | Yes |  |
|  transformer   | object | Yes |  |
|  to   | string | No |  |

```
transformWhen(matches(/.+@.+/, "/customer/contact/email", lookup(), "/customer/username")
```
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
Gets a property from a document using a property path


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | alternatives | Yes | |
|  path   | string | Yes |  |

```
get("customer.contact.name")
```
### set
Sets a property in a new document using a property path


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  path   | string | Yes |  |
|  value   | any | No |  |

```
set(truthy(), "customer.contact.name")
```
### setUnless
Sets a property in a new document using a property path unless a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  path   | string | No |  |
|  value   | any | No |  |

```
setUnless(falsey(), "customer.contact.name")
```
### setWhen
Sets a property in a new document using a property path when a condition is met


|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | any | No | |
|  condition   | object | Yes |  |
|  path   | string | No |  |
|  value   | any | No |  |

```
setWhen(truthy(), "customer.contact.name")
```
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

### isEmpty



|  Parameter  |  Type  |  Mandatory   |  Default  |
|-------------|--------|--------------|-----------|
|  input      | string | No | |

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

