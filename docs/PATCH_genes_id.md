# Journal Resources

    PATCH genes/:id

## Description
Update the genes parameter specified by its id and body.

***

## Parameters

** requires one or more params in body

- **end** -
- **chr** -
- **strand** -
- **cellline** -
- **condition** -
- **sequence** -
- **symbol** -
- **ensg** -
- **log2fc** -
- **rc_initial** -
- **rc_final** -
- **effect** -
- **cas** -
- **screentype** -
- **pubmed_journal** - Publication pubmed id.
- **created_at** -
- **updated_at** -
- **updated_at** -


***

## Authorization
**headers**

authorization: ["token"]

***

## Return format
An array of objects with the following keys and values:

- **end** -
- **chr** -
- **strand** -
- **cellline** -
- **condition** -
- **sequence** -
- **symbol** -
- **ensg** -
- **log2fc** -
- **rc_initial** -
- **rc_final** -
- **effect** -
- **cas** -
- **screentype** -
- **pubmed_journal** - Publication pubmed id.
- **created_at** -
- **updated_at** -
- **updated_at** -

***

## Errors

500

***

## Example
**Request**

   PATCH genes/:id

**Return** __shortened for example purpose__
``` json
  [
    1503
]
```