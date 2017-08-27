# Journal Resources

    POST genes

## Description
Retrieves the genes from the gene database.

***

## Parameters

- **start** -
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

**none**

***

## Return format
An array of objects with the following keys and values:

- **id**

***

## Errors
422 : Missing required parameter [requiredParameter]

***

## Example
**Request**

   POST genes

**Return** __shortened for example purpose__
``` json
  {
    "id": 1531
}
```